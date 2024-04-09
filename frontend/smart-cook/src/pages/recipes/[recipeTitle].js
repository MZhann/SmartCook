import MainContainer from "@/components/MainContainer";
import Navbar from "@/components/Navbar";
import defaultFood from "../../../public/images/defaultFood.png"
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
    const [favButtonClicked, setFavButtonClicked] = useState(false);
    console.log(query.recipeTitle);
    const handleFavBtnClick = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            };
            const response = await axios.post(
                `https://web-production-ad96.up.railway.app/api/v1/recipes/${query.recipeTitle}/add_to_favorites/`, recipe.id, config
            );

            if (response.status === 201) {
                console.log(response.data);
                setFavButtonClicked(true);
            }
        } catch (error) {
            console.error(error);
        }
    };
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
                            (<Image
                                    className={'rounded-tl-[8px] rounded-tr-[8px]'} width={400} height={285} src={recipe.image}
                                    alt="Food"/>) :
                            <Image className={`rounded-[20px]`} src={defaultFood} alt={'food'} width={400} height={285}/>}
                        <div className={`flex flex-row items-center text-[20px] gap-7 font-[300]`}>
                            <div className={`ml-3 flex flex-row items-center gap-3`}><Image width={32} height={32} src={clock} alt={'clock'}/>
                                <p>{recipe && recipe.cook_time} minutes</p>
                            </div>
                            <div className={`flex flex-row items-center gap-3`}><Image width={32} height={32} src={people} alt={'people'}/>
                                <p>for {recipe && recipe.serves} people</p>
                            </div>
                        </div>
                    </div>
                    <div className={`flex flex-col w-2/3`}>
                        <div className={`w-3/5 flex flex-row items-center`}>
                            <div className={`w-full flex flex-row items-center gap-4`}>
                                <Image width={60} height={60} src={avatar} alt={"avatar"}
                                       className={'object-contain rounded-[534px]'}
                                />
                                <h1 className={'flex flex-row'}>{recipe?.user.first_name} {recipe?.user.last_name}</h1>
                            </div>
                            <div className={` flex flex-row gap-4 items-center`}>
                                {recipe && (
                                    <Like id={query.recipeTitle} count={recipe.likes_count} />
                                )}
                                <div
                                    className={'items-center bg-white w-[65px] h-[35px] rounded-3xl flex-row justify-evenly flex'}>
                                    <Image onClick={handleFavBtnClick} src={fav} alt={'fav'} width={16} height={16}/></div>
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
                        {recipe && recipe.ingredients.map((item, index) => (
                            <li key={index}>{index+1}. {item.name}</li>
                        ))}
                    </ul>
                </div>
                <div className={`flex flex-col w-full mt-8`}>
                    <h1 className={`text-[#AAE06E] text-[28px]`}>Direction</h1>
                    <div className={`flex flex-wrap gap-[47px] mt-5`}>
                        {recipe && recipe.steps.map((item, index) => (
                                <div key={index}>
                                    <StepCard item={item} index={index}/>
                                </div>
                        ))}
                    </div>
                </div>
            </div>
        </MainContainer>
    );
};

export default RecipeTitle;