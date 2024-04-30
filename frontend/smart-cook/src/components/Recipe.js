import React, {useEffect, useState} from "react";
import Image from "next/image";
import defaultFood from "@/../public/images/defaultFood.png";
import Like from "@/components/Like";
import axios from "axios";
import aiLogo from "@/../public/images/ai-logo.png";
import {useRouter} from "next/router";
import Link from "next/link";
import saved from "@/../public/images/bluesaved.png"
import {config} from "../../config";
import Modal from './modal/Modal';
import UserInfo from "./modal/UserInfo";

const Recipe = ({recipe}) => {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [favorites, setFavorites] = useState();
    const [showModal, setShowModal] = useState(false);
    
    


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
        const found = favoriteRecipes.some(favRecipe => favRecipe.id === recipe.id);
        setIsFavorite(found);
    }, [favorites, recipe.id]);

    const TruncateString = (str) => {
        if (str.length > 38) {
            return `${str.slice(0, 37)}...`.toLowerCase();
        }
        return str.toLowerCase();
    };

    const handleFavClick = async (event) => {
        event.preventDefault();
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            };
            const response = await axios.post(
                `https://web-production-ad96.up.railway.app/api/v1/recipes/${recipe.id}/add_to_favorites/`, recipe.id, config
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
            const url = `https://web-production-ad96.up.railway.app/api/v1/recipes/${recipe.id}/remove_from_favorites/`;

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

    const showProfileModal = () => {
        setShowModal(true)
    }

    const unshowProfileModal = (e) => {
        e.preventDefault();
        setShowModal(false)
    }

    return (
        <div className={`w-[280px] h-[340px] ${router.pathname === "/profile" ? 'bg-[#2A293B]' : 'bg-white'}  rounded-lg my-5 `}>
            <div className="w-full h-[210px] relative">
                {recipe.world_cuisine && recipe.dish_type &&
                    <div
                        className={'top-[12px] text-[8px] text-center items-center left-[12px] flex absolute flex-row gap-[8px]'}>
                        <div
                            className={'w-[60px] h-[16px] bg-[#DAE8FF] rounded-3xl pt-[3px] text-[#203878]'}>{recipe?.world_cuisine}</div>
                        <div
                            className={'w-[60px] h-[16px] bg-[#FFE3F3] rounded-3xl pt-[3px] text-[#872D51]'}>{recipe?.dish_type}</div>
                    </div>
                }
                <div className="absolute right-2 top-2 z-0 hover:cursor-pointer"
                     onMouseEnter={() => setIsHovered(true)}
                     onMouseLeave={() => setIsHovered(false)}
                     onClick={(event) => {
                         event.stopPropagation();
                         handleFavClick().catch(err => console.error(err));
                     }}
                >
                    {recipe && router.pathname !== '/ai-receipts' &&
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
                                <button onClick={(event) => handleRemoveFromFavClick(event)}>
                                    <Image src={saved} alt={'saved'}
                                           className={`size-[35px]`}/>
                                </button>
                            }
                        </>
                    }
                </div>
                {router.pathname === "/ai-receipts" ? 
                <Link href="/recipes-ai/[recipeAi]" as={`/recipes-ai/${recipe.id}`} passHref>
                {recipe && recipe.image ?
                    (<Image width={280} height={211}
                            className={'w-[px] z-0 h-[211px] rounded-tl-[8px] rounded-tr-[8px]'} src={recipe.image}
                            alt="Food"/>
                    ) :
                    (<Image className="w-[280xp] h-[211px] object-cover" src={defaultFood} alt="Food"/>)
                }
            </Link> :  <Link href="/recipes/[recipeTitle]" as={`/recipes/${recipe.id}`} passHref>
                    {recipe && recipe.image ?
                        (<Image width={280} height={211}
                                className={'w-[px] z-0 h-[211px] rounded-tl-[8px] rounded-tr-[8px]'} src={recipe.image}
                                alt="Food"/>
                        ) :
                        (<Image className="w-[280xp] h-[211px] object-cover" src={defaultFood} alt="Food"/>)
                    }
                </Link>                   

                }
               
            </div>
            <div className="relative w-full h-[107px] rounded-b-lg p-4">
                <div className="flex items-center" onMouseEnter={showProfileModal} onMouseLeave={unshowProfileModal}>
                    {recipe && router.pathname !== '/ai-receipts' ?
                        (<>
                            {recipe.user.photo ?
                                <Image src={recipe?.user.photo} height={40} width={40}
                                       className="mr-2 rounded-full w-[30px] h-[30px] object-cover rounded-5xl" alt="profile avatar"/> :
                                <Image src={defaultFood} alt={'avatar'} className={'object-contain w-[30px] h-[30px]'}/>
                            }
                            <div  className={`text-xs ${router.pathname === "/profile" ? 'text-white' : 'text-black'}`}>{recipe.user.first_name} {recipe.user.last_name}</div>
                        </>) :
                        (<>
                            <Image width={30} height={30} src={aiLogo} className="mr-2 rounded-full object-cover w-[30px] h-[30px]"
                                   alt="profile avatar"/>
                            <div className="text-xs">SmartCook</div>
                        </>)
                    }
                    {showModal && (
                        <Modal onClose={(e) => unshowProfileModal(e)}>
                            <UserInfo id={recipe.user.id}/>
                        </Modal>
                    )} 
                </div>
                {recipe &&
                    <>
                        <div className={`mt-1 mb-1 text-sm ${router.pathname === "/profile" ? 'text-white' : 'text-black'}`}>{TruncateString(recipe.title)}</div>
                        <Like id={recipe.id} count={recipe?.likes_count} />
                    </>
                }
            </div>
        </div>
    )
}

export default Recipe;