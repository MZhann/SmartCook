import MainContainer from "@/components/MainContainer";
import Navbar from "@/components/Navbar";
import defaultFood from "../../public/images/defaultFood.png";
import Image from "next/image";
import clock from "../../public/images/clock.svg";
import people from "../../public/images/profile-2user.svg";
import {useEffect, useState} from "react";
import Link from "next/link";
import loading from "../../public/loading.gif";
import axios from "axios";
import {config} from "../../config";

const AiRecipe = () => {
    const [recipe, setRecipe] = useState({});
    const [isLoading, setIsLoading] = useState("");

    useEffect(() => {
        const storedRecipe = JSON.parse(localStorage.getItem("recipe"));
        if (storedRecipe) {
            setRecipe(storedRecipe);
            console.log('yes')
        } else {
            console.error('error')
        }
    }, []);

    const handleSave = () => {
        axios.post(`${config.baseUrl}/api/v1/recipes/ai/`, recipe, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
            }
        }).then(r =>
            window.location.href = `/recipes-ai/${r.data.id}`
        ).catch(err => console.error(err))
    }

    return (
        <MainContainer>
            <div className=" w-full max-w-[1195px] relative flex flex-col pl-4 pr-4">
                <Navbar/>
                <div
                    className={`gap-4 mt-5 flex flex-col items-center justify-center text-center text-white`}
                >
                    <h1
                        className={`flex self-center text-[40px] tracking-wider`}
                    >
                        AI Recipe Generation
                    </h1>
                    <p className={"text-xl font-[400] tracking-wider"}>
                        Your Custom AI-Generation Recipe is Ready - Bon Appetit
                    </p>
                </div>
                <div className={"mt-8 text-white flex flex-col items-center w-full lg:flex-row lg:items-start"}>
                    <div className={`flex flex-col gap-3 lg:w-[500px] w-full items-center justify-center`}>
                        {isLoading === "loading" ? (
                            <div
                                className="lg:h-[350px] lg:w-[350px] w-[300px] h-[300px] flex justify-center items-center">
                                <Image
                                    src={loading}
                                    width={100}
                                    height={100}
                                    className="rounded-[20px] object-cover"
                                    alt="food"
                                />
                            </div>
                        ) : (
                            <div className="flex justify-center lg:justify-start">
                                {recipe?.image ? (
                                    <Image
                                        width={400}
                                        height={400}
                                        className={`rounded-[20px] object-cover`}
                                        src={`${recipe?.image}`}
                                        alt={"food"}
                                    />
                                ) : (
                                    <Image
                                        className={`rounded-[20px] w-[400px] h-[400px] object-cover`}
                                        src={defaultFood}
                                        alt={"food"}
                                    />
                                )}
                            </div>
                        )}

                        <div
                            className={`flex flex-row items-center justify-center lg:justify-start text-[20px] gap-7 mb-10 mr-5 lg:mr-0 lg:mb-0`}
                        >
                            <div
                                className={`ml-3 flex flex-row items-center gap-3`}
                            >
                                <Image src={clock} alt={"clock"}/>
                                <p>{recipe?.cook_time} minutes</p>
                            </div>
                            <div className={`flex flex-row items-center gap-3`}>
                                <Image src={people} alt={"people"}/>
                                <p>for {recipe?.serves} people</p>
                            </div>
                        </div>
                    </div>
                    <div className={`flex flex-col lg:w-2/3 w-11/12`}>
                        <div
                            className={`lg:w-3/5 w-full flex flex-row items-center lg:p-0 pl-20 space-x-4`}
                        >
                            <div
                                className="w-[100[x] h-[36px] bg-[#DAE8FF] text-[#203878] text-lg flex justify-center items-center rounded-full p-4">
                                {recipe?.world_cuisine}
                            </div>
                            <div
                                className="w-[120px] h-[36px] bg-[#FFE3F3] text-[#872D51] text-lg flex justify-center items-center rounded-full p-4 ">
                                {recipe?.dish_type}
                            </div>
                        </div>
                        <div
                            className={`flex flex-col items-center  text-center lg:flex lg:items-start lg:text-start mt-4 leading-tight`}>
                            <h1
                                className={`w-full lg:w-[550px] text-3xl lg:text-[40px] mb-4 mt-5 lg:tracking-wider text-pretty leading-snug`}
                            >
                                {recipe?.title}
                            </h1>
                            <p
                                className={`w-full lg:w-[92%] lg:text-left text-2xl tracking-wider leading-[36px] text-justify`}
                            >
                                {recipe?.description}
                            </p>
                        </div>
                        <div className="flex space-x-5">
                            <button
                                onClick={() => {
                                    localStorage.removeItem("recipe");
                                }}
                                className="w-[210px] h-[48px] text-white text-lg bg-[#FF5858] flex justify-center items-center rounded-full mt-10"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => handleSave()}
                                className="w-[210px] h-[48px] text-white text-lg bg-[#C3F48D] flex justify-center items-center rounded-full mt-10"
                            >
                                Save Recipe
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center lg:items-start lg:flex-row">

                    <div className={`flex flex-col lg:w-[500px] w-[90%] mt-16 lg:ml-0`}>
                        <h1 className={`text-[#AAE06E] text-[28px]  `}>
                            Ingredients
                        </h1>
                        <ul
                            className={`flex flex-col text-white text-[24px] gap-1 font-[400] mt-8`}
                        >
                            {recipe &&
                                recipe?.ingredients?.map((item, index) => (
                                    <li key={index}>
                                        {index + 1}. {item.name}
                                    </li>
                                ))}
                        </ul>
                    </div>
                    <div className={`flex flex-col w-[85%] lg:w-full mt-16  ml-0 lg:ml-24`}>
                        <h1 className={`text-[#AAE06E] text-[28px]`}>
                            Direction
                            <ol className="list-decimal text-white lg:w-[630px] w-[90%] text-xl">
                                {recipe &&
                                    recipe?.steps?.map((item, index) => (
                                        <li key={index}>{item.step_text}</li>
                                    ))}
                            </ol>
                        </h1>
                    </div>
                </div>
                <div
                    className="lg:w-full w-[90%]  lg:h-[75px] h-auto p-2 border-2 border-[#AAE06E] rounded-2xl self-center mt-16 mb-16 text-center text-[#AAE06E] text-md flex justify-center items-center">
                    NOTE: This recipe is AI-generated and DishGen has not
                    verified it for accuracy or safety. It may contain errors.{" "}
                    <br></br> Always use your best judgement when making
                    AI-generated dishes.
                </div>
            </div>
            <div className="h-20"></div>
        </MainContainer>
    );
};

export default AiRecipe;
