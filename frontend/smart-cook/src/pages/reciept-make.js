import MainContainer from "@/components/MainContainer";
import Navbar from "@/components/Navbar";
import instax from "@/../public/images/instax.jpg";
import trash from "@/../public/images/trash.jpg";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { config } from "../../config";
import Footer from "@/components/Footer";

const RecipeMake = () => {
    const [steps, setSteps] = useState([{ step_text: "", image: null }]);
    const [previewImage, setPreviewImage] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [title, setTitle] = useState("");
    const [serves, setServes] = useState(0);
    const [cookTime, setCookTime] = useState(0);
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState([{ name: "" }]);
    const [mainImage, setMainImage] = useState(null);
    const ingredientObjects = [];

    const handleIngredientChange = (index, event) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index].name = event.target.value;
        setIngredients(updatedIngredients);
    };

    const handleAddStep = () => {
        setSteps([...steps, { step_text: "", image: null }]);
        console.log(steps);
    };
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };
    const handleAddIngredient = () => {
        setIngredients([...ingredients, { name: "" }]);
        console.log(ingredients);
    };

    const handleCookTimeChange = (event) => {
        setCookTime(event.target.value);
    };
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
        console.log(title);
    };
    const handleServesChange = (event) => {
        setServes(event.target.value);
    };
    const handleMainImageChange = (event) => {
        setMainImage(event.target.files[0]);
    };
    const handleMainImageRemove = () => {
        setMainImage(null);
    };
    const handleRemoveIngredient = (index) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients.splice(index, 1);
        setIngredients(updatedIngredients);
    };

    const handleRemoveStep = (index) => {
        const updatedSteps = [...steps];
        updatedSteps.splice(index, 1);
        setSteps(updatedSteps);
    };

    const handleStepTextChange = (index, event) => {
        const updatedSteps = [...steps];
        updatedSteps[index].step_text = event.target.value;
        setSteps(updatedSteps);
    };

    const handleStepImageChange = (index, file) => {
        const updatedSteps = [...steps];
        updatedSteps[index].image = file; // Directly set the file object as image
        setSteps(updatedSteps);
    };
    const Upload = async (publishForm) => {
        console.log("posting this recipe:");
        try {
            const response = await fetch(`${config.baseUrl}/api/v1/recipes/`, {
                method: "POST",
                headers: {
                    Authorization:
                        `Bearer ` + localStorage.getItem("accessToken"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(publishForm),
            });

            if (response.ok) {
                const data = await response.json();
            } else {
                console.error("Failed to post recipe:", response.statusText);
            }
        } catch (error) {
            console.error("Error posting recipe:", error);
        }
    };
    const handlePublish = async () => {

        const formData = new FormData();
        formData.append("image", mainImage)

        let publishForm = {
            title: "",
            serves: 0,
            cook_time: 0,
            description: "",
            image: formData,
            likes_count: "",
            ingredients: [
                {
                    name: "string",
                },
            ],
            steps: [
                {
                    step_text: "string",
                    image: null,
                },
            ],
        };

        publishForm.title = title;
        publishForm.serves = serves;
        publishForm.cook_time = cookTime;
        publishForm.description = description;
        publishForm.image = mainImage;
        (publishForm.ingredients = ingredients.map((ingredient) => ({
            name: ingredient.name,
        }))),
            (publishForm.steps = steps.map((step) => ({
                step_text: step.step_text,
                image: step.image,
            })));

        console.log("checking publishForm: ", publishForm);
        Upload(publishForm);

        console.log("checking formData: ", formData);

        try {
            const response = await fetch(
                "https://web-production-ad96.up.railway.app/api/v1/recipes/",
                {
                    method: "POST",
                    body: formData,
                }
            );

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
        <MainContainer>
            <div className="w-full max-w-[1195px] h-2000vh relative flex flex-col">
                <Navbar />
                <div className={"flex w-full justify-center"}>
                    <div className="flex justify-center items-center flex-col w-[750px]">
                        <div className="text-center font-montserrat mt-[60px] text-white">
                            <h1
                                className={
                                    "text-[40px] mb-[20px] font-[500] leading-tight"
                                }
                            >
                                Publish a recipe
                            </h1>
                            <p className={"text-[20px] font-[500] leading-6"}>
                                On this page you can publish your recipe with
                                detailed information and steps to create the
                                dish
                            </p>
                        </div>
                        <div className="w-[750px] mt-[50px] h-[400px] bg-white flex justify-center items-center rounded-lg">
                            <input
                                type="file"
                                onChange={handleMainImageChange}
                            />
                            {mainImage ? (
                                <Image
                                    src={URL.createObjectURL(mainImage)}
                                    alt="Main Image"
                                    width={250}
                                    height={250}
                                />
                            ) : (
                                <div>
                                    <Image
                                        className="ml-[18px]"
                                        src={instax}
                                        alt="instax"
                                        width={250}
                                        height={250}
                                    />
                                    <h1 className="mt-5 text-[24px]">
                                        Upload finished food photo
                                    </h1>
                                </div>
                            )}
                        </div>
                        <div className="w-[750px] mt-[30px] p-[24px]  bg-white flex flex-col rounded-lg ">
                            <h1 className={"text-[24px]"}>Dish details</h1>
                            <div className="">
                                <div className={"flex flex-col"}>
                                    <div>
                                        <p className="text-[16px] mt-5 ">
                                            Title
                                        </p>
                                        <div
                                            className={
                                                "w-full justify-between flex-row flex items-center"
                                            }
                                        >
                                            <input
                                                id="ingredient"
                                                className={`w-full rounded-3xl border-2 h-10 shadow-gray-500 text-xs p-3 mt-2`}
                                                placeholder="Enter text here"
                                                type="text"
                                                value={title}
                                                onChange={handleTitleChange}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className={`flex flex-row w-full gap-7`}
                                    >
                                        <div className={`w-1/2`}>
                                            <p className="text-[16px] mt-5 ">
                                                Serves
                                            </p>
                                            <div
                                                className={
                                                    "w-full justify-between flex-row flex items-center"
                                                }
                                            >
                                                <input
                                                    id="ingredient"
                                                    className={`w-full rounded-3xl border-2 h-10 shadow-gray-500 text-xs p-3 mt-2`}
                                                    placeholder="Enter text here"
                                                    type="text"
                                                    onChange={
                                                        handleServesChange
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className={`w-1/2`}>
                                            <p className="text-[16px] mt-5 ">
                                                Cook time
                                            </p>
                                            <div
                                                className={
                                                    "w-full justify-between flex-row flex items-center"
                                                }
                                            >
                                                <input
                                                    id="cookTime"
                                                    className="w-full rounded-3xl border-2 h-10 shadow-gray-500 text-xs p-3 mt-2"
                                                    placeholder="Enter cook time here"
                                                    type="text"
                                                    value={cookTime} // Set the value of the input field to the cookTime state
                                                    onChange={
                                                        handleCookTimeChange
                                                    } // Call handleCookTimeChange function when input changes
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[16px] mt-5 ">
                                            Description
                                        </p>
                                        <div
                                            className={
                                                "w-full justify-between flex-row flex items-center"
                                            }
                                        >
                                            <textarea
                                                id="description"
                                                className="w-full min-h-[151px] rounded-3xl border-2 shadow-gray-500 text-xs p-3 mt-2"
                                                placeholder="Enter description here"
                                                value={description} // Set the value of the textarea to the description state
                                                onChange={
                                                    handleDescriptionChange
                                                } // Call handleDescriptionChange function when textarea changes
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[750px] mt-[30px] p-[24px] bg-white flex flex-col rounded-lg ">
                            <h1 className={"text-[24px]"}>Ingredients</h1>
                            <div className="">
                                <div className={"flex flex-col"}>
                                    {ingredients.map((ingredient, index) => (
                                        <div key={index}>
                                            <p className="text-[16px] mt-5 ">
                                                Ingredient {index + 1}
                                            </p>
                                            <div
                                                className={
                                                    "w-full justify-between flex-row flex items-center"
                                                }
                                            >
                                                <input
                                                    value={ingredient.name}
                                                    onChange={(event) =>
                                                        handleIngredientChange(
                                                            index,
                                                            event
                                                        )
                                                    }
                                                    className={`w-[650px] rounded-3xl border-2 h-10 shadow-gray-500 text-xs p-3 mt-2`}
                                                    placeholder="Enter text here"
                                                    type="text"
                                                />
                                                <Image
                                                    src={trash}
                                                    height={24}
                                                    width={24}
                                                    alt={"trash"}
                                                    onClick={() =>
                                                        handleRemoveIngredient(
                                                            index
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        onClick={handleAddIngredient}
                                        className={
                                            "self-center mt-5 items-center flex gap-3 text-white justify-center w-[220px] h-[42px] rounded-[30px] bg-[#AAE06E]"
                                        }
                                    >
                                        <span
                                            className={
                                                "text-[24px] items-center -mt-1"
                                            }
                                        >
                                            +
                                        </span>{" "}
                                        Ingredient
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Steps section */}
                        <div className="w-[750px] mt-[30px] p-[24px] bg-white flex flex-col rounded-lg ">
                            <h1 className={"text-[24px]"}>Steps</h1>
                            <div className="">
                                <div className={"flex flex-col"}>
                                    {steps.map((step, index) => (
                                        <div key={index}>
                                            <p className="text-[16px] mt-5 ">
                                                Step {index + 1}
                                            </p>
                                            <div
                                                className={
                                                    "w-full justify-between flex-row flex items-center"
                                                }
                                            >
                                                <input
                                                    value={step.step_text}
                                                    onChange={(event) =>
                                                        handleStepTextChange(
                                                            index,
                                                            event
                                                        )
                                                    }
                                                    className={`w-[650px] rounded-3xl border-2 h-10 shadow-gray-500 text-xs p-3 mt-2`}
                                                    placeholder="Enter text here"
                                                    type="text"
                                                />

                                                <Image
                                                    src={trash}
                                                    height={24}
                                                    width={24}
                                                    alt={"trash"}
                                                    onClick={() =>
                                                        handleRemoveStep(index)
                                                    }
                                                />
                                            </div>
                                            <div className={""}>
                                                <input
                                                    type="file"
                                                    onChange={(event) =>
                                                        handleStepImageChange(
                                                            index,
                                                            event.target
                                                                .files[0]
                                                        )
                                                    }
                                                />
                                                {fileList.length < 1 && (
                                                    <div>
                                                        <Image
                                                            src={instax}
                                                            alt="instax"
                                                            width={250}
                                                            height={250}
                                                        />
                                                        <h1 className="mt-5 text-[24px]">
                                                            Upload finished food
                                                            photo
                                                        </h1>
                                                    </div>
                                                )}
                                                {!previewImage && (
                                                    <div>
                                                        <Image
                                                            src={instax}
                                                            alt="instax"
                                                            width={250}
                                                            height={250}
                                                        />
                                                        <h1 className="mt-5 text-[24px]">
                                                            Upload finished food
                                                            photo
                                                        </h1>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        onClick={handleAddStep}
                                        className={
                                            "self-center mt-5 items-center flex gap-3 text-white justify-center w-[220px] h-[42px] rounded-[30px] bg-[#AAE06E]"
                                        }
                                    >
                                        <span
                                            className={
                                                "text-[24px] items-center -mt-1"
                                            }
                                        >
                                            +
                                        </span>{" "}
                                        Step
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handlePublish}
                            className={
                                "mb-[100px] self-center mt-7 items-center flex gap-3 text-white text-[28px] justify-center w-[450px] h-[60px] rounded-[30px] bg-[#AAE06E]"
                            }
                        >
                            Publish
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        </MainContainer>
    );
};

export default RecipeMake;
