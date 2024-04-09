import MainContainer from "@/components/MainContainer";
import Navbar from "@/components/Navbar";
import defaultFood from "../../../public/images/defaultFood.png";
import Image from "next/image";
import clock from "../../../public/images/clock.svg";
import people from "../../../public/images/profile-2user.svg";
import {useRouter} from "next/router";
import axios from "axios";
import {useEffect, useState} from "react";
import Link from 'next/link'

const RecipeAi = () => {
    const [recipe, setRecipe] = useState(null);
    const {query} = useRouter();
    const [isLoading, setIsLoading] = useState('');

    const deleteRecipe = () => {
        try {
            setIsLoading('loading');
            axios.delete(`https://web-production-ad96.up.railway.app/api/v1/recipes/ai/${query.recipeAi}/`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            window.location.hash = '/';
            setIsLoading('done');
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`https://web-production-ad96.up.railway.app/api/v1/recipes/ai/${query.recipeAi}`, query.recipeAi);
                setRecipe(response.data);
                console.log(response);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };
        fetchRecipe();
    }, [query.recipeAi]);
    console.log(query.recipeAi);
    return (

        <MainContainer>
            <div className=" w-full max-w-[1195px] relative flex flex-col ">
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
                <div className={"mt-8 text-white flex flex-row w-full"}>
                    <div className={`flex flex-col gap-3 w-[500px]`}>
                        {recipe?.image ?
                            <Image
                                width={400}
                                height={400}
                                className={`rounded-[20px] object-cover`}
                                src={`${recipe?.image}`}
                                alt={"food"}
                            /> :
                            <Image
                                className={`rounded-[20px] w-[400px] h-[400px] object-cover`}
                                src={defaultFood}
                                alt={"food"}
                            />
                        }
                        <div
                            className={`flex flex-row items-center text-[20px] gap-7 font-[300]`}
                        >
                            <div
                                className={`ml-3 flex flex-row items-center gap-3`}
                            >
                                <Image src={clock} alt={"clocl"}/>
                                <p>{recipe?.cook_time} minutes</p>
                            </div>
                            <div className={`flex flex-row items-center gap-3`}>
                                <Image src={people} alt={"people"}/>
                                <p>for {recipe?.serve} people</p>
                            </div>
                        </div>
                    </div>
                    <div className={`flex flex-col w-2/3`}>
                        <div
                            className={`w-3/5 flex flex-row items-center space-x-4`}
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
                        <div className={`mt-4 leading-tight`}>
                            <h1
                                className={`w-[520px] text-[40px] mb-4 mt-5 tracking-wider`}
                            >
                                {recipe?.title}
                            </h1>
                            <p
                                className={`w-[92%] text-left text-2xl tracking-wider leading-[36px]`}
                            >
                                {recipe?.description}
                            </p>
                        </div>
                        <div className="flex space-x-5">
                            {isLoading === '' ?
                                <button onClick={deleteRecipe}
                                        className="w-[210px] h-[48px] text-white text-lg bg-[#FF5858] flex justify-center items-center rounded-full mt-10">
                                    Delete
                                </button> :
                                isLoading === 'loading' ?
                                    <button
                                        className="w-[210px] h-[48px] text-white text-lg bg-[#FF5858] flex justify-center items-center rounded-full mt-10">
                                        Being deleted, wait
                                    </button> :
                                    isLoading === 'done' && <button
                                        className="w-[210px] h-[48px] text-white text-lg bg-[#FF5858] flex justify-center items-center rounded-full mt-10">
                                        Deleted!
                                    </button>

                            }
                            <Link href="/ai-generation"
                                className="w-[210px] h-[48px] text-white text-lg bg-[#C3F48D] flex justify-center items-center rounded-full mt-10">
                                Save Recipe
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <div className={`flex flex-col w-[500px] mt-16`}>
                        <h1 className={`text-[#AAE06E] text-[28px]`}>
                            Ingredients
                        </h1>
                        <ul
                            className={`flex flex-col text-white text-[24px] gap-1 font-[400] mt-8`}
                        >
                            {recipe && recipe.ingredients.map((item, index) => (
                                <li key={index}>{index + 1}. {item.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className={`flex flex-col w-full mt-16 ml-24`}>
                        <h1 className={`text-[#AAE06E] text-[28px]`}>
                            Direction
                            <ol className="list-decimal text-white w-[630px] text-xl">
                                {recipe && recipe.steps.map((item, index) => (
                                    <li key={index}>{item.step_text}</li>
                                ))}
                            </ol>
                        </h1>
                    </div>
                </div>
                <div
                    className="w-[953px] h-[75px] border-2 border-[#AAE06E] rounded-2xl self-center mt-16 mb-16 text-center text-[#AAE06E] text-md flex justify-center items-center">NOTE:
                    This recipe is AI-generated and DishGen has not verified it for accuracy or safety. It may contain
                    errors. <br></br> Always use your best judgement when making AI-generated dishes.
                </div>

            </div>
        </MainContainer>
    );
};

export default RecipeAi;
