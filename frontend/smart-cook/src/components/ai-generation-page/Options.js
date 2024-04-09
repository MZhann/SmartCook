import React, { useEffect } from "react";
import { useState } from "react";
import Dropdown from "./Dropdown";
import magic from "../../../public/images/magic.png";
import Image from "next/image";
import { config } from "../../../config";
import CreatingReceipt from "../modal/CreatingReceipt";
import { OpenAI } from "openai";
import Link from "next/link";
import MiniGames from "../modal/MiniGames";



import { getTokenCount, decrementTokenCount } from "../../utils/token";

const Options = ({ ingredients }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageURL, setImageURL] = useState(null);
    const [selectedDish, setSelectedDish] = useState(null);
    const [selectedCook, setSelectedCook] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [selectedWorld, setSelectedWorld] = useState(null);
    const [extraIngredients, setExtraIngredients] = useState("");
    const [banIngredients, setBanIngredients] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [responseText, setResponseText] = useState("");
    const [recipeId, setRecipeId] = useState();
    let urlOfImage = "";
    const [isMiniGamesOpen, setIsMiniGamesOpen] = useState(false);
    const [tokenCount, setTokenCount] = useState(0); //TOKEN


    //TOKEN LOGIC
    
    
    useEffect(() => {
        const initialCount = getTokenCount();
        setTokenCount(initialCount);
    }, []);

    const handleGenerateReceipt = () => {
        // Check if tokens are available
        if (tokenCount > 0) {
            handleSubmit();
            // Call API to generate receipt
            // Assuming an API call here to generate receipt
            // After successful generation, decrement token count
            decrementTokenCount();
            setTokenCount((prevCount) => prevCount - 1);
        } else {
            alert(
                "You have no tokens left. Please wait for the next day. Or play games gain them"
            );
            setIsMiniGamesOpen(true);
        }
    };
    //TOKEN LOGIC END

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const apiUrl = process.env.APIURL;
    const apikey = process.env.APIKEY;

    const handleExtraIngredientsChange = (event) => {
        setExtraIngredients(event.target.value);
    };

    const handleBanIngredientsChange = (event) => {
        setBanIngredients(event.target.value);
    };

    // Image generation Started

    const generateImage = async (promptTextForImage) => {
        const options = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apikey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: promptTextForImage,
                n: 1,
                size: "512x512",
            }),
        };

        try {
            const response = await fetch(
                "https://api.openai.com/v1/images/generations",
                options
            );
            const data = await response.json();
            console.log("data of generatedImage is below: ");
            console.log(data);
            urlOfImage = data.data[0].url;

            console.log("urlOfImage " + urlOfImage);
            setImageURL(urlOfImage);

            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const extractImagePrompt = (recipeText) => {
        let startIndex = recipeText.indexOf("Description:");
        const endIndex = recipeText.indexOf("Ingredients:");
        let directionsStartIndex = recipeText.indexOf("Directions:");

        if (directionsStartIndex === -1) {
            directionsStartIndex = recipeText.indexOf("directions");
            console.log("Directions not found in the text");
        }

        if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
            startIndex = recipeText.indexOf("description");
            // endIndex = recipeText.indexOf("ingredients")
            // return "Directions and description not found.";
        }
        const directions = recipeText
            .substring(directionsStartIndex + "Directions:".length)
            .trim();
        const description = recipeText
            .substring(startIndex + "Description:".length, endIndex)
            .trim();

        const firstWords = "GENERATE A PHOTO OF A DISH with these Ingredients: "
        
        const text = firstWords + directions + ". " + description;
        return text;
    };

    // Image generation Ended

    const [recipe, setRecipe] = useState({});

    const parseRecipe = (text, imageUrl) => {
        const lines = text.split("\n");
        console.log("IN parseRecipe method");
        let parsedRecipe = {
            title: "",
            serves: 0,
            cook_time: 0,
            world_cuisine: "",
            dish_type: "",
            description: "",
            ingredients: [],
            steps: [],
            image: "",
        };

        let currentSection = "";
        parsedRecipe.image = urlOfImage;
        parsedRecipe.world_cuisine = selectedWorld;
        parsedRecipe.dish_type = selectedDish;
        console.log("IN parseRecipe: assigned imageURL");
        console.log(parsedRecipe.image);

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
            } else if (
                lowerLine.includes("directions") ||
                lowerLine.includes("direction")
            ) {
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
                    });
                }
            }
        }

        setRecipe(parsedRecipe);
        console.log("parsedRecipe is below");
        console.log(parsedRecipe);
        console.log("recipe", recipe);
        postReceipt(parsedRecipe);
    };

    const postReceipt = async (parsedReceipt) => {
        console.log("posting this recipe:");
        console.log(parsedReceipt);
        try {
            const response = await fetch(
                `${config.baseUrl}/api/v1/recipes/ai/`,
                {
                    method: "POST",
                    headers: {
                        Authorization:
                            `Bearer ` + localStorage.getItem("accessToken"),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(parsedReceipt),
                }
            );

            if (response.ok) {
                const data = await response.json();
                console.log("Recipe posted successfully:", data);
                console.log("data id: " + data.id);
                setRecipeId(data.id);
            } else {
                console.error("Failed to post recipe:", response.statusText);
            }
        } catch (error) {
            console.error("Error posting recipe:", error);
        }
    }
     

    const handleSubmit = async () => {
        openModal();
        setIsLoading(true);
        console.log("isLoading now: " + isLoading);

        const ingredientsString =
            "ingredients are: " + ingredients.map((obj) => obj.name).join(", ");

        console.log(ingredientsString);
        let prompt = `You are an experienced Nutritionist who can make recipes according to requests, taking into account all requirements. Given a list of ingredients, create me recipe for ${selectedDish}. I am ${selectedCook} cook, dish should be ${selectedType}, selected world cuisine is ${selectedWorld}, ${ingredientsString}, extra ingredients are ${extraIngredients}, banned ingredients are ${banIngredients}. Generate at first 1) "title:", then 2) "number:" of serves, then 3) "cook time:", then short 4) "description:" of dish in 20-30 words, then 5) "ingredients:" with quantity, then 6) "direction:"/steps of cooking. Put every article of response on a new line, and number each article. Start title, serves, cooktime, description, ingredients, directions parts WITH IT'A PART'S NAME, like "title: name of receipt", "serves: 3" and so on, put "-" before each ingredient and direction`;

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
            const text = data.choices[0].text;
            console.log(text);
            setResponseText(text);

            const promptTextForImage = extractImagePrompt(text);
            console.log("GENERATION IMAGE PROMT: ");
            console.log(promptTextForImage);

            await generateImage(promptTextForImage);

            // setTimeout(() => {
            //     parseRecipe(text, imageURL);
            //     console.log("Waited for 5 seconds!");
            // }, 2000);

            parseRecipe(text, imageURL);
        } catch (error) {
            console.error(error.response?.data ?? error.toJSON?.() ?? error);
            console.error("API error", error);
        }

        // postReceipt();
    };

    return (
        <div className="flex flex-col items-center">
            <CreatingReceipt
                recipeId={recipeId && recipeId}
                isLoading={isLoading}
                isModalOpen={isModalOpen}
                onClose={closeModal}
                closeModal={closeModal}
            />

            {isMiniGamesOpen && (
                <div
                    className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50`}
                >
                    <MiniGames setIsMiniGamesOpen={setIsMiniGamesOpen}/>
                </div>
            )}
            <div className="w-full h-[328px] rounded-3xl bg-white mt-20 p-4">
                <div>
                    <div className="font-bold text-3xl">Options</div>
                    <div>You can use these options and filter the result</div>
                    <div className="flex flex-wrap justify-between mt-14">
                        <div>
                            <div>What dish you want to cook?</div>
                            <Dropdown
                                options={[
                                    "Breakfast",
                                    "Lunch",
                                    "Dinner",
                                    "Snack",
                                    "Dessert",
                                    "Salad",
                                ]}
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
                onClick={handleGenerateReceipt}
            >
                <Image
                    src={magic}
                    alt="magic"
                    className="w-[35px] ml-[-20px] mr-3 "
                />
                Create
            </button>

            <div className="text-white mt-4 underline">
                {" "}
                You have{" "}
                <span className="text-green-500 text-2xl">
                    {tokenCount}
                </span>{" "}
                tokens remaining
            </div>
            <div className="text-white text-xs">win the minigame to gain one generation <span className="text-green-500">token for free</span></div>
        </div>
    );
};

export default Options;
