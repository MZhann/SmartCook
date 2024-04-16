import MainContainer from "@/components/MainContainer";
import Navbar from "@/components/Navbar";
import instax from "@/../public/images/instax.jpg";
import trash from "@/../public/images/trash.jpg";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import axios from "axios";
import Footer from "@/components/Footer";

const apiUrl = "https://web-production-ad96.up.railway.app/api/v1/clashes/initiator/create/";

const ClashRecipeMake = () => {
        const [steps, setSteps] = useState([{step_text: "", image: null}]);
        const [title, setTitle] = useState("");
        const [serves, setServes] = useState(0);
        const [cookTime, setCookTime] = useState(0);
        const [description, setDescription] = useState("");
        const [ingredients, setIngredients] = useState([{name: ""}]);
        const [mainImage, setMainImage] = useState(null);

        const [isLoading, setIsLoading] = useState(false);

        const handleIngredientChange = (index, event) => {
            const updatedIngredients = [...ingredients];
            updatedIngredients[index].name = event.target.value;
            setIngredients(updatedIngredients);
        };
        const handleAddIngredient = () => {
            setIngredients([...ingredients, {"name": ""}]);

        };
        const handleRemoveIngredient = (index) => {
            const updatedIngredients = [...ingredients];
            updatedIngredients.splice(index, 1);
            setIngredients(updatedIngredients);

        };
        const handleTitleChange = (event) => {
            setTitle(event.target.value);

        };
        const handleServesChange = (event) => {
            setServes(event.target.value);

        };
        const handleCookTimeChange = (event) => {
            setCookTime(event.target.value);

        };
        const handleDescriptionChange = (event) => {
            setDescription(event.target.value);

        };
        const handleMainImageChange = (event) => {
            setMainImage(event.target.files[0]);
        };
        const handleMainImageRemove = () => {
            setMainImage(null);
        };
        const handleAddStep = () => {
            setSteps([...steps, {"step_text": "", image: null}]);
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
        const handleStepImageChange = (index, event) => {
            const updatedSteps = [...steps];
            updatedSteps[index].image = event.target.files[0];
            setSteps(updatedSteps);
        };
        const handlePublish = async () => {

            setIsLoading(true);
            const formData = new FormData();
            formData.append('title', title);
            formData.append('serves', serves);
            formData.append('cook_time', cookTime);
            formData.append('description', description);
            mainImage && formData.append('image', mainImage);

            const config = {
                headers: {
                    "Authorization": 'Bearer ' + localStorage.getItem('accessToken'),
                },
            };
            const accessToken = 'Bearer ' + localStorage.getItem('accessToken');

            axios.post(apiUrl, formData, config).then((response) => {
                ingredients.forEach((item) => {
                    axios.post(apiUrl + `${response.data.id}/ingredients/`, item, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": accessToken,
                        },
                    }).then((r) => {
                        console.log(r.data);
                    }).catch((error) => {
                        console.log(error);
                    })
                });

                steps.forEach((item, index) => {
                    const stepFormData = new FormData();
                    stepFormData.append('step_text', item.step_text);
                    stepFormData.append('image', item.image);
                    axios.post(apiUrl + `${response.data.id}/steps/`, stepFormData, config).then((r) => {
                        console.log(r.data);
                        if (index === steps.length - 1) {
                            setIsLoading(false);
                            window.location.replace(`/recipes/${response.data.id}`);
                        }
                    }).catch((error) => {
                        setIsLoading(false);
                        console.log(error);
                    });
                });

                console.log("Recipe posted successfully:", response.data);
            }).catch((error) => {
                console.log("ERROR", error.response?.data)
                console.log("ERROR", error)
            });


        };

        return (
            <MainContainer>
                <div className="w-full max-w-[1195px] h-2000vh relative flex flex-col">
                    <Navbar/>
                    <div className={"flex w-full justify-center"}>
                        <div className="flex justify-center items-center flex-col w-[750px]">
                            <div className="text-center font-montserrat mt-[60px] text-white">
                                <h1
                                    className={
                                        "text-[40px] mb-[20px] font-[500] leading-tight"
                                    }
                                >
                                    Publish a recipe for battle
                                </h1>
                                <p className={"text-[20px] font-[500] leading-6"}>
                                    On this page you can publish your recipe with
                                    detailed information and steps to create the
                                    dish
                                </p>
                            </div>
                            <div
                                className="w-[750px] relative mt-[50px] h-[400px] bg-white flex justify-center items-center rounded-lg">
                                <input
                                    className={'absolute h-[250px] w-[250px] cursor-pointer bg-opacity-0 opacity-0'}
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
                                        <h1 className="mt-5 text-black text-[24px]">
                                            Upload finished food photo
                                        </h1>
                                    </div>
                                )}
                            </div>
                            <div className="w-[750px] mt-[30px] p-[24px]  bg-white flex flex-col rounded-lg ">
                                <h1 className={"text-[24px] text-[#2A293B]"}>Dish details</h1>
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
                                                        placeholder="Enter amount of serves"
                                                        type="number"
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
                                                        type="number"
                                                        value={cookTime}
                                                        onChange={
                                                            handleCookTimeChange
                                                        }
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
                                                value={description}
                                                onChange={
                                                    handleDescriptionChange
                                                }
                                            />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[750px] mt-[30px] p-[24px] bg-white flex flex-col rounded-lg ">
                                <h1 className={"text-[24px] text-[#2A293B]"}>Ingredients</h1>
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
                                <h1 className={"text-[24px] text-[#2A293B]"}>Steps</h1>
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
                                                                event
                                                            )
                                                        }
                                                    />
                                                    {step.image && (
                                                        <Image
                                                            src={URL.createObjectURL(step.image)}
                                                            alt="Main Image"
                                                            width={250}
                                                            height={250}
                                                        />
                                                    )
                                                    }
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
                            {
                                (title && serves && cookTime && description) ?
                                    <>
                                        {
                                            !isLoading ?
                                                <button
                                                    onClick={handlePublish}
                                                    className={
                                                        "mb-[100px] self-center mt-7 items-center flex gap-3 text-white text-[28px] justify-center w-[450px] h-[60px] rounded-[30px] bg-[#AAE06E]"
                                                    }
                                                >
                                                    Publish
                                                </button> :
                                                <button
                                                    onClick={handlePublish}
                                                    className={
                                                        "mb-[100px] self-center mt-7 items-center flex gap-3 text-white text-[28px] justify-center w-[450px] h-[60px] rounded-[30px] bg-[#AAE06E]"
                                                    }
                                                >
                                                    Publishing....
                                                </button>
                                        }
                                    </> : <div className={'text-lg text-[#AAE06E] mt-5'}>For publishing recipe enter title, description, serves and cook time</div>
                            }
                        </div>
                    </div>
                    <Footer/>
                </div>
            </MainContainer>
        );
    }
;

export default ClashRecipeMake;
