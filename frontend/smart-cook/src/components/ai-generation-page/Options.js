import React, { useEffect } from "react";
import { useState } from "react";
import Dropdown from "./Dropdown";
import magic from "../../../public/images/magic.png";
import Image from "next/image";
import { config } from "../../../config";
import CreatingReceipt from "../modal/CreatingReceipt";

const Options = ({ ingredients }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const [isLoading, setIsLoading] = useState(false);
    const [responseText, setResponseText] = useState("");
    const apiUrl = process.env.APIURL;
    const apikey = process.env.APIKEY;
    const dishOptions = [
        "Breakfast",
        "Lunch",
        "Dinner",
        "Snack",
        "Dessert",
        "Salad",
    ];

    const [selectedDish, setSelectedDish] = useState(null);
    const [selectedCook, setSelectedCook] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [selectedWorld, setSelectedWorld] = useState(null);
    const [extraIngredients, setExtraIngredients] = useState("");
    const [banIngredients, setBanIngredients] = useState("");

    const handleExtraIngredientsChange = (event) => {
        setExtraIngredients(event.target.value);
    };

    const handleBanIngredientsChange = (event) => {
        setBanIngredients(event.target.value);
    };

    const [recipe, setRecipe] = useState({});

    const parseRecipe = (text) => {
        const lines = text.split("\n");

        let parsedRecipe = {
            title: "",
            serves: 0,
            cook_time: 0,
            world_cuisine: "",
            dish_type: "",
            description: "",
            ingredients: [],
            steps: [],
        };

        let currentSection = "";
        parsedRecipe.world_cuisine = selectedWorld;
        parsedRecipe.dish_type = selectedDish;
        for (let line of lines) {
            line = line.trim();
            if (line === "") continue;

            const lowerLine = line.toLowerCase();

            if (lowerLine.includes("title:")) {
                parsedRecipe.title =
                    "AI " + line.substring(line.indexOf(":") + 1).trim();
            } else if (
                lowerLine.includes("serves:") ||
                lowerLine.includes("number:")
            ) {
                parsedRecipe.serves = parseInt(
                    line.substring(line.indexOf(":") + 1).trim()
                );
            } else if (lowerLine.includes("cook time:")) {
                parsedRecipe.cook_time = parseInt(
                    line.substring(line.indexOf(":") + 1).trim()
                );
            } else if (lowerLine.includes("description:")) {
                parsedRecipe.description = line
                    .substring(line.indexOf(":") + 1)
                    .trim();
            } else if (lowerLine.includes("ingredients")) {
                currentSection = "ingredients";
            } else if (lowerLine.includes("directions")) {
                currentSection = "steps";
            } else if (lowerLine.startsWith("- ") || /^\d+\. /.test(line)) {
                if (currentSection === "ingredients") {
                    parsedRecipe.ingredients.push({
                        name: line
                            .replace(/^\d+\. /, "")
                            .replace("- ", "")
                            .trim(),
                    });
                } else if (currentSection === "steps") {
                    parsedRecipe.steps.push({
                        step_text: line
                            .replace(/^\d+\. /, "")
                            .replace("- ", "")
                            .trim(),
                        image: "",
                    });
                }
            }
        }

        setRecipe(parsedRecipe);
        console.log(parsedRecipe);
        console.log("recipe", recipe);
    };

    useEffect(() => {
        console.log("recipe", recipe); // This will log the updated state value
    }, [recipe]);

    const handleSubmit = async () => {
        openModal();
        setIsLoading(!isLoading);
        console.log("isLoading now: " + isLoading);
        const formData = {
            selectedDish,
            selectedCook,
            selectedType,
            selectedWorld,
            extraIngredients,
            banIngredients,
            ingredients,
        };

        const ingredientsString =
            "ingredients are: " + ingredients.map((obj) => obj.name).join(", ");

        console.log(ingredientsString);
        let prompt = `You are an experienced Nutritionist who can make recipes according to requests, taking into account all requirements. Given a list of ingredients, create me recipe for ${selectedDish}. I am ${selectedCook} cook, dish should be ${selectedType}, selected world cuisine is ${selectedWorld}, ${ingredientsString}, extra ingredients are ${extraIngredients}, banned ingredients are ${banIngredients}. Generate at first 1) "title:", then 2) "number:" of serves, then 3) "cook time:", then short 4) "description:" of dish in 20-30 words, then 5) "ingredients:" with quantity, then 6) "direction:"/steps of cooking. Put every article of response on a new line, and number each article. Start title, serves, cooktime, description, ingredients, directions with part's name, like "title: name of receipt", "serves: 3" and so on, put "-" before each ingredient and direction`;

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${apikey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: prompt,
                    max_tokens: 350,
                }),
            });

            const data = await response.json();
            console.log("API response:", data.choices[0]);
            const text = data.choices[0].text;
            setResponseText(text);
            console.log(responseText);
            console.log(text);
            parseRecipe(text);
            setIsLoading(false);
            console.log(isLoading);
        } catch (error) {
            console.error(error.response?.data ?? error.toJSON?.() ?? error);
            console.error("API error", error);
        }

        try {
            const response = await fetch(`${config.baseUrl}/api/v1/recipes/`, {
                method: "POST",
                headers: {
                    Authorization:
                        `Bearer ` + localStorage.getItem("accessToken"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(recipe),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Recipe posted successfully:", data);
            } else {
                console.error("Failed to post recipe:", response.statusText);
            }
        } catch (error) {
            console.error("Error posting recipe:", error);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <CreatingReceipt isLoading={isLoading} isModalOpen={isModalOpen}  onClose={closeModal} closeModal={closeModal}/>
            <div className="w-full h-[328px] rounded-3xl bg-white mt-20 p-4">
                <div>
                    <div className="font-bold text-3xl">Options</div>
                    <div>You can use these options and filter the result</div>
                    <div className="flex flex-wrap justify-between mt-14">
                        <div>
                            <div>What dish you want to cook?</div>
                            <Dropdown
                                options={dishOptions}
                                placeholder="Select a dish"
                                onSelect={setSelectedDish}
                            />
                        </div>
                        <div>
                            <div>Are you a good cook?</div>
                            <Dropdown
                                options={["Novice", "Intermediate", "Expert"]}
                                placeholder="Select an option"
                                onSelect={setSelectedCook}
                            />
                        </div>
                        <div>
                            <div>Type of dish</div>
                            {/* Type of dish: Vegetarian, Vegan, Healthy, Hearty, Low Carb */}
                            <Dropdown
                                options={[
                                    "Vegetarian",
                                    "Vegan",
                                    "Healthy",
                                    "Hearty",
                                    "Low Carb",
                                ]}
                                placeholder="Select type of dish"
                                onSelect={setSelectedType}
                            />
                        </div>

                        <div className="mt-5">
                            <div>World cuisine</div>
                            <Dropdown
                                options={[
                                    "Any region",
                                    "Asian",
                                    "American",
                                    "European",
                                    "African",
                                    "Australian",
                                    "Indian",
                                    "Middle Eastern",
                                    "Latin American",
                                ]}
                                placeholder="Select a cuisine"
                                onSelect={setSelectedWorld}
                            />
                        </div>
                        <div className="mt-5">
                            <div>Extra ingredients</div>
                            <input
                                type="text"
                                className="rounded-3xl border-2 border-gray-500 p-2 w-[344px] h-[42px]"
                                placeholder="Enter extra ingredients"
                                value={extraIngredients}
                                onChange={handleExtraIngredientsChange}
                            />
                        </div>
                        <div className="mt-5">
                            <div>Ban ingredients</div>
                            <input
                                type="text"
                                className="rounded-3xl border-2 border-gray-500 p-2 w-[344px] h-[42px]"
                                placeholder="Enter banned ingredients"
                                value={banIngredients}
                                onChange={handleBanIngredientsChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <button
                className="flex justify-center items-center mt-10 px-4 py-2 bg-[#AAE06E] w-[450px] h-[60px] rounded-full text-white hover:bg-green-400"
                onClick={handleSubmit}
            >
                <Image
                    src={magic}
                    alt="magic"
                    className="w-[35px] ml-[-20px] mr-3 "
                />
                Create
            </button>
        </div>
    );
};

export default Options;
