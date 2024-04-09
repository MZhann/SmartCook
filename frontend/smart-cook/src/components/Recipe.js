import React, {useState} from "react";
import Image from "next/image";
import defaultFood from "../../public/images/defaultFood.png";
import person from "../../public/images/person1.png";
import Like from "@/components/Like";
import axios from "axios";
import {config} from "../../config";
import aiLogo from "../../public/images/ai-logo.png";
import {useRouter} from "next/router";
import Link from "next/link";

const Recipe = ({recipe}) => {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);
    const [favButtonClicked, setFavButtonClicked] = useState(false);


    const handleFavClick = async () => {
        const url = `${config.baseUrl}/api/v1/recipes/${recipe.id}/add_to_favorites/`;

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            };
            const response = await axios.post(
                `https://web-production-ad96.up.railway.app/api/v1/recipes/${recipe.id}/add_to_favorites/`, recipe.id, config
            );

            if (response.status === 201) {
                console.log(response.data);
                setFavButtonClicked(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-[280px] h-[340px] bg-white rounded-lg my-5">
            <div className="w-full h-[210px] relative">
                {recipe.world_cuisine && recipe.dish_type &&
                    <div className={'top-[12px] text-[8px] text-center items-center left-[12px] flex absolute flex-row gap-[8px]'}>
                        <div className={'w-[60px] h-[16px] bg-[#DAE8FF] rounded-3xl pt-[3px] text-[#203878]'}>{recipe?.world_cuisine}</div>
                        <div className={'w-[60px] h-[16px] bg-[#FFE3F3] rounded-3xl pt-[3px] text-[#872D51]'}>{recipe?.dish_type}</div>
                    </div>
                }
                <div className="absolute right-2 top-2 hover:cursor-pointer"
                     onMouseEnter={() => setIsHovered(true)}
                     onMouseLeave={() => setIsHovered(false)}
                 onClick={handleFavClick}
            >
                <svg
                    className={`hover:cursor-pointer ${!favButtonClicked ? "fill-none" : 'fill-[#4c9fed]'}`}
                    width="35"
                    height="35"
                    viewBox="0 0 35 35"

                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect width="35" height="35" rx="17.5" fill={!favButtonClicked ? "white" : '#4c9fed'}
                          fillOpacity="0.8"/>
                    <path
                        d="M21.5166 8.75H13.4833C11.7083 8.75 10.2666 10.2725 10.2666 12.1275V24.4563C10.2666 26.0313 11.3416 26.6962 12.6583 25.935L16.7249 23.5638C17.1583 23.31 17.8583 23.31 18.2833 23.5638L22.3499 25.935C23.6666 26.705 24.7416 26.04 24.7416 24.4563V12.1275C24.7333 10.2725 23.2916 8.75 21.5166 8.75Z"
                        className={`stroke-black stroke-2 ${isHovered ? 'stroke-blue-400' : ''}`}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{transition: 'stroke 0.3s ease'}}
                    />
                </svg>
            </div>
            {recipe && recipe.image ?
                (<Image width={280} height={211}
                        className={'w-[px] h-[211px] rounded-tl-[8px] rounded-tr-[8px]'} src={recipe.image}
                        alt="Food"/>
                ) :
                (<Image className="w-[280xp] h-[211px] object-cover" src={defaultFood}  alt="Food"/>)
            }
        </div>
    <div className="relative w-full h-[107px] rounded-b-lg p-4">
        <div className="flex items-center">
            {recipe && router.pathname !== '/ai-receipts' ?
                            (<>
                                <Image src={person} className="mr-2 rounded-5xl" alt="profile avatar"/>
                                <div className="text-xs">{recipe.user.first_name} {recipe.user.last_name}</div>
                            </>) :
                            (<>
                                <Image width={20} height={20} src={aiLogo} className="mr-2 rounded-5xl"
                                       alt="profile avatar"/>
                                <div className="text-xs">SmartCook</div>
                            </>)
                        }
                    </div>
                    {recipe &&
                        <>
                            <div className=" mt-1 text-sm">{recipe.title}</div>
                            <Like id={recipe.id} count={recipe.likes_count}/>
                        </>
                    }
                </div>
            </div>
    )
}

export default Recipe;