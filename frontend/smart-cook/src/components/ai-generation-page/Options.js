import React from "react";
import { useState } from "react";
import Dropdown from "./Dropdown";

const Options = () => {
    const dishOptions = [
        "Breakfast",
        "Lunch",
        "Dinner",
        "Snack",
        "Dessert",
        "Salad",
    ];

    const [selectedDish, setSelectedDish] = useState(null);
    const [extraIngredients, setExtraIngredients] = useState("");
    const [banIngredients, setBanIngredients] = useState("");

    const handleExtraIngredientsChange = (event) => {
        setExtraIngredients(event.target.value);
    };

    const handleBanIngredientsChange = (event) => {
        setBanIngredients(event.target.value);
    };

    const handleSubmit = () => {
        const options = {
            selectedDish,
            extraIngredients,
            banIngredients,
        };
        console.log(options); // Send this object to backend
    };

    return (
        <div className="flex flex-col items-center">
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
                                options={["Yes", "No"]}
                                placeholder="Select an option"
                                onSelect={(option) =>
                                    console.log("Cook?", option)
                                }
                            />
                        </div>
                        <div>
                            <div>Type of dish</div>
                            <Dropdown
                                options={[
                                    "Salmon",
                                    "Tuna",
                                    "Cod",
                                    "Trout",
                                    "Sardine",
                                ]}
                                placeholder="Select a fish"
                                onSelect={(option) =>
                                    console.log("Dish?", option)
                                }
                            />
                        </div>

                        <div className="mt-5">
                            <div>World cuisine</div>
                            <Dropdown
                                options={[
                                    "China",
                                    "American",
                                    "Mexican",
                                    "Trout",
                                    "Sardine",
                                ]}
                                placeholder="Select a cuisine"
                                onSelect={(option) =>
                                    console.log("Cuisine?", option)
                                }
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
                        {/* <div className="mt-5"></div> */}
                    </div>
                </div>
            </div>
            <button
                className="mt-10 px-4 py-2 bg-[#AAE06E] w-[450px] h-[60px] rounded-full text-white hover:bg-gray-600"
                onClick={handleSubmit}
            >
                Create
            </button>
        </div>
    );
};

export default Options;
