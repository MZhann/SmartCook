import MainContainer from "@/components/MainContainer";
import Navbar from "@/components/Navbar";
import food from "../../../public/images/food.jpg"
import Image from "next/image";
import clock from "../../../public/images/clock.svg"
import people from "../../../public/images/profile-2user.svg"
import avatar from "../../../public/images/avatar.jpg"
import fav from "../../../public/images/favorite.png"
import potato from "../../../public/images/potato.jpg"
import Like from "@/components/Like";
import {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import StepCard from "@/components/StepCard";

const RecipeTitle = () => {
    const [recipe, setRecipe] = useState(null);
    const {query} = useRouter();
    console.log(query.recipeTitle);
    const apiUrl = `https://web-production-ad96.up.railway.app/api/v1/recipes/${query.recipeTitle}`;
    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`https://web-production-ad96.up.railway.app/api/v1/recipes/${query.recipeTitle}`, query.recipeTitle);
                setRecipe(response.data);
                console.log(response);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };
        fetchRecipe();
    }, [query.recipeTitle]);

    return (
        <MainContainer>
            <div className=" w-full max-w-[1195px] relative flex flex-col ">
                <Navbar/>
                <div className={`gap-4 mt-5 flex flex-col items-center justify-center text-center text-white`}>
                    <h1 className={`flex self-center text-[40px]`}>Recipe</h1>
                    <p className={'text-[20px] font-[400]'}>You can see the full recipe and preparation of the dish</p>
                </div>
                <div className={'mt-8 text-white flex flex-row w-full'}>
                    <div className={`flex flex-col gap-3 w-[500px]`}>
                        {recipe && recipe.image ?
                            (<Image width={280} height={211}
                                    className={'w-[400px] h-[285px] rounded-tl-[8px] rounded-tr-[8px]'} src={recipe.image}
                                    alt="Food"/>) :
                            <Image className={`rounded-[20px]`} src={food} alt={'food'} width={400} height={285}/>}
                        <div className={`flex flex-row items-center text-[20px] gap-7 font-[300]`}>
                            <div className={`ml-3 flex flex-row items-center gap-3`}><Image src={clock} alt={'clock'}/>
                                <p>{recipe && recipe.cook_time}</p></div>
                            <div className={`flex flex-row items-center gap-3`}><Image src={people} alt={'people'}/>
                                <p>for {recipe && recipe.serves} people</p></div>
                        </div>
                    </div>
                    <div className={`flex flex-col w-2/3`}>
                        <div className={`w-3/5 flex flex-row items-center`}>
                            <div className={`w-full flex flex-row items-center gap-4`}>
                                <Image width={60} height={60} src={avatar} alt={"avatar"}
                                       className={'object-contain rounded-[534px]'}
                                />
                                <h1 className={'flex flex-row'}>Aigul Sarsenova</h1>
                            </div>
                            <div className={`flex flex-row gap-4 items-center`}>
                                <Like count={3}/>
                                <div
                                    className={'items-center bg-white w-[65px] h-[35px] rounded-3xl flex-row justify-evenly flex'}>
                                    <Image src={fav} alt={'fav'} width={16} height={16}/></div>
                            </div>
                        </div>
                        <div className={`mt-4 leading-tight`}>
                            <h1 className={`w-[520px] text-[40px] mb-4`}>{recipe && recipe.title}</h1>
                            <p className={`w-[92%] text-left text-[24px] leading-[36px]`}>{recipe && recipe.description}</p>
                        </div>
                    </div>
                </div>
                <div className={`flex flex-col w-[500px] mt-16`}>
                    <h1 className={`text-[#AAE06E] text-[28px]`}>Ingredients</h1>
                    <ul className={`flex flex-col text-white text-[24px] gap-1 font-[400] mt-8`}>
                        {recipe && recipe.ingredients.map((item) => (
                            <li>{item.name}</li>
                        ))}
                    </ul>
                </div>
                <div className={`flex flex-col w-full mt-8`}>
                    <h1 className={`text-[#AAE06E] text-[28px]`}>Direction</h1>
                    <div className={`flex flex-wrap gap-[47px] mt-5`}>
                        <div className={`bg-white flex flex-col w-[574px] h-[564px] rounded-3xl`}>
                            {recipe && recipe.steps.map((item, index) => (
                                <StepCard item={item} index={index}/>
                            ))}
                        </div>
                        <div className={`bg-white flex flex-col w-[574px] h-[564px] rounded-3xl`}>
                            <Image className={`object-contain rounded-t-3xl`} src={potato} alt={'potato'} width={574}
                                   height={382}/>
                            <div className={`p-4`}>
                                <h1 className={`text-[24px] mb-3`}>Step 1/5</h1>
                                <p className={`text-[16px]`}>Boil the potatoes in their skins until almost done, then,
                                    without peeling them, cut them crosswise into circles.</p>
                            </div>
                        </div>
                        <div className={`bg-white flex flex-col w-[574px] h-[564px] rounded-3xl`}>
                            <Image className={`object-contain rounded-t-3xl`} src={potato} alt={'potato'} width={574}
                                   height={382}/>
                            <div className={`p-4`}>
                                <h1 className={`text-[24px] mb-3`}>Step 1/5</h1>
                                <p className={`text-[16px]`}>Boil the potatoes in their skins until almost done, then,
                                    without peeling them, cut them crosswise into circles.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainContainer>
    );
};

export default RecipeTitle;