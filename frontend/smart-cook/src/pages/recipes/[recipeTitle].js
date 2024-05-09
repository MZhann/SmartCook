import MainContainer from "@/components/MainContainer";
import Navbar from "@/components/Navbar";
import defaultFood from "../../../public/images/defaultFood.png"
import Image from "next/image";
import clock from "../../../public/images/clock.svg"
import people from "../../../public/images/profile-2user.svg"
import avatar from "../../../public/images/avatarka.png"
import fav from "../../../public/images/favorite.png"
import Like from "@/components/Like";
import {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import StepCard from "@/components/StepCard";
import Modal from '../../components/modal/Modal';
import UserInfo from "../../components/modal/UserInfo";
import {config} from "../../../config";
import saved from "../../../public/images/bluesaved.png";

const RecipeTitle = () => {
    const [recipe, setRecipe] = useState(null);
    const {query} = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [favorites, setFavorites] = useState();
    const [isFavorite, setIsFavorite] = useState(false);

    const showProfileModal = () => {
        setShowModal(!showModal)
    }

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`https://web-production-d3136.up.railway.app/api/v1/recipes/${query.recipeTitle}`, query.recipeTitle);
                setRecipe(response.data);
                console.log(response);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };
        fetchRecipe().catch(err => console.error(err));
    }, [query.recipeTitle]);

    useEffect(() => {
        const fetchUserFavorites = () => {
            axios.get(`${config.baseUrl}/api/v1/user/favorites/`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken"),
                }
            }).then(r => setFavorites(r.data)).catch(err => console.error(err));
        }
        fetchUserFavorites();
    }, []);



    useEffect(() => {
        const favoriteRecipes = favorites || [];
        const found = favoriteRecipes.some(favRecipe => favRecipe.id === recipe?.id);
        setIsFavorite(found);
    }, [favorites, recipe?.id]);

    const handleFavClick = async (event) => {
        event.preventDefault();
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            };
            const response = await axios.post(
                `https://web-production-d3136.up.railway.app/api/v1/recipes/${recipe.id}/add_to_favorites/`, recipe.id, config
            );

            if (response.status === 200) {
                const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
                if (!favoriteRecipes.some(favRecipe => favRecipe.id === recipe.id)) {
                    favoriteRecipes.push(recipe);
                    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
                    setIsFavorite(true);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleRemoveFromFavClick = async (event) => {
        event.preventDefault();
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            };
            const url = `https://web-production-d3136.up.railway.app/api/v1/recipes/${recipe.id}/remove_from_favorites/`;

            const response = await axios.delete(url, config);

            if (response.status === 200) {
                const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
                const updatedFavoriteRecipes = favoriteRecipes.filter(favRecipe => favRecipe.id !== recipe.id);
                localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavoriteRecipes));
                setIsFavorite(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <MainContainer>
            <div className="px-4 md:px-0 w-full max-w-[1195px] relative flex flex-col ">
                <Navbar/>
                <div className={`gap-4 mt-5 flex flex-col items-center justify-center text-center text-white`}>
                    <h1 className={`flex self-center text-[40px]`}>Recipe</h1>
                    <p className={'text-[20px] font-[400]'}>You can see the full recipe and preparation of the dish</p>
                </div>
                <div
                    className={'mt-8 text-white flex flex-col sm:flex-col md:flex-row px-0 sm:px-4 w-full items-center md:items-start'}>
                    <div className={`flex flex-col items-center md:items-start gap-3 w-full md:w-[500px]`}>
                        {recipe && recipe.image ?
                            (
                                <Image
                                    className={'rounded-tl-[8px] rounded-tr-[8px]'} width={400} height={285}
                                    src={recipe.image}
                                    alt="Food"/>) :
                            <Image className={`rounded-[20px]`} src={defaultFood} alt={'food'} width={400}
                                   height={285}/>}
                        <div className={`flex flex-row items-center text-[20px]  gap-7 font-[300]`}>
                            <div className={`ml-3 flex flex-row items-center gap-3`}><Image width={32} height={32}
                                                                                            src={clock} alt={'clock'}/>
                                <p>{recipe && recipe.cook_time} minutes</p>
                            </div>
                            <div className={`flex flex-row items-center gap-3`}><Image width={32} height={32}
                                                                                       src={people} alt={'people'}/>
                                <p>for {recipe && recipe.serves} people</p>
                            </div>
                        </div>
                    </div>
                    <div className={`flex flex-col w-full md:w-2/3 sm:pl-4`}>
                        <div className={`w-full flex flex-row items-center `}>
                            <div className={`w-full flex flex-row items-center gap-4 mt-10 md:mt-0 cursor-pointer`}
                                 onClick={showProfileModal}>
                                {showModal && (
                                    <Modal onClose={showProfileModal}>
                                        <UserInfo id={recipe?.user.id}/>
                                    </Modal>
                                )}
                                {recipe && recipe?.user.photo ?
                                    <Image width={60} height={60} src={recipe?.user.photo} alt={"avatar"}
                                           className={'object-cover w-[60px] h-[60px] rounded-full'}
                                    /> :
                                    <Image width={60} height={60} src={avatar} alt={"avatar"}
                                           className={'object-contain rounded-full'}
                                    />
                                }
                                <h1 className={'flex flex-row'}>{recipe?.user.first_name} {recipe?.user.last_name}</h1>
                            </div>
                            <div className={` flex flex-row gap-4 items-center md:mt-0 mt-10`}>
                                {recipe && (
                                    <Like id={recipe.id} count={recipe.likes_count}/>
                                )}
                                <div
                                    className={'items-center bg-white w-[65px] h-[35px] rounded-3xl flex-row justify-evenly flex'}>
                                    <>
                                        {!isFavorite ?
                                            <button onClick={(event) => handleFavClick(event)}>
                                                <svg width="35" height="35" viewBox="0 0 35 35" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <rect width="35" height="35" rx="17.5" fill="white" fillOpacity="0.8"/>
                                                    <path
                                                        d="M21.5166 8.75H13.4833C11.7083 8.75 10.2666 10.2725 10.2666 12.1275V24.4563C10.2666 26.0313 11.3416 26.6962 12.6583 25.935L16.7249 23.5638C17.1583 23.31 17.8583 23.31 18.2833 23.5638L22.3499 25.935C23.6666 26.705 24.7416 26.04 24.7416 24.4563V12.1275C24.7333 10.2725 23.2916 8.75 21.5166 8.75Z"
                                                        stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </button>
                                            :
                                            <svg onClick={(event) => handleRemoveFromFavClick(event)} width="23px" height="23px" viewBox="0 0 64 64" fill="#426AB2" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M30.051 45.6071L17.851 54.7401C17.2728 55.1729 16.5856 55.4363 15.8662 55.5008C15.1468 55.5652 14.4237 55.4282 13.7778 55.1049C13.1319 54.7817 12.5887 54.2851 12.209 53.6707C11.8293 53.0563 11.6281 52.3483 11.628 51.626V15.306C11.628 13.2423 12.4477 11.2631 13.9069 9.8037C15.3661 8.34432 17.3452 7.52431 19.409 7.52405H45.35C47.4137 7.52431 49.3929 8.34432 50.8521 9.8037C52.3112 11.2631 53.131 13.2423 53.131 15.306V51.625C53.1309 52.3473 52.9297 53.0553 52.55 53.6697C52.1703 54.2841 51.6271 54.7807 50.9812 55.1039C50.3353 55.4272 49.6122 55.5642 48.8928 55.4998C48.1734 55.4353 47.4862 55.1719 46.908 54.739L34.715 45.6071C34.0419 45.1031 33.2238 44.8308 32.383 44.8308C31.5422 44.8308 30.724 45.1031 30.051 45.6071V45.6071Z" stroke="#426AB2" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        }
                                    </>

                                </div>
                            </div>
                        </div>
                        <div className={`mt-4 leading-tight`}>
                            <h1 className={`w-full text-2xl lg:leading-snug lg:text-[40px] mb-4`}>{recipe && recipe.title}</h1>
                            <p className={`w-[92%] text-left text-lg lg:text-[24px] leading-[36px]`}>{recipe && recipe.description}</p>
                        </div>
                    </div>
                </div>
                <div className={`flex flex-col w-full  mt-16 sm:px-8 md:px-6 `}>
                    <h1 className={`text-[#AAE06E] text-[28px]`}>Ingredients</h1>
                    <ul className={`flex flex-col text-white text-[24px] gap-1 font-[400] mt-8`}>
                        {recipe && recipe.ingredients.map((item, index) => (
                            <li key={index}>{index + 1}. {item.name}</li>
                        ))}
                    </ul>
                </div>
                <div className={`flex w-full  flex-wrap sm:mt-8 sm:px-8 md:px-0`}>
                    <h1 className={`text-[#AAE06E] w-full mt-8 sm:mt-0 sm:px-6 text-[28px]`}>Direction</h1>
                    <div
                        className={`flex flex-wrap w-full mt-5 gap-x-5 gap-y-16 justify-center lg:justify-between  pl-5 pr-5`}>
                        {recipe && recipe.steps.map((item, index) => (
                            <div key={index}>
                                <StepCard item={item} index={index}/>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="h-40"></div>
            </div>
        </MainContainer>
    )
        ;
};

export default RecipeTitle;