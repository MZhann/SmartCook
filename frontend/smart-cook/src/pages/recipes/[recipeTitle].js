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

const RecipeTitle = () => {
    const [recipe, setRecipe] = useState(null);
    const {query} = useRouter();
    const [favButtonClicked, setFavButtonClicked] = useState(false);
    console.log(query.recipeTitle);
    const [showModal, setShowModal] = useState(false);

    const showProfileModal = () => {
        setShowModal(!showModal)
    }

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
            <div className="px-4 md:px-0 w-full max-w-[1195px] relative flex flex-col ">
                <Navbar/>
                <div className={`gap-4 mt-5 flex flex-col items-center justify-center text-center text-white`}>
                    <h1 className={`flex self-center text-[40px]`}>Recipe</h1>
                    <p className={'text-[20px] font-[400]'}>You can see the full recipe and preparation of the dish</p>
                </div>
                <div className={'mt-8 text-white flex flex-col sm:flex-col md:flex-row px-0 sm:px-4 w-full items-center md:items-start'}>
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
                            <div className={`ml-3 flex flex-row items-center gap-3`}><Image width={32} height={32} src={clock} alt={'clock'}/>
                                <p>{recipe && recipe.cook_time} minutes</p>
                            </div>
                            <div className={`flex flex-row items-center gap-3`}><Image width={32} height={32} src={people} alt={'people'}/>
                                <p>for {recipe && recipe.serves} people</p>
                            </div>
                        </div>
                    </div>
                    <div className={`flex flex-col w-full md:w-2/3 sm:pl-4`}>
                        <div className={`w-full flex flex-row items-center `}>
                            <div className={`w-full flex flex-row items-center gap-4 mt-10 md:mt-0 cursor-pointer`} onClick={showProfileModal}>
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
                                    <Like id={query.recipeTitle} count={recipe.likes_count}/>
                                )}
                                <div
                                    className={'items-center bg-white w-[65px] h-[35px] rounded-3xl flex-row justify-evenly flex'}>
                                    <Image onClick={handleFavBtnClick} src={fav} alt={'fav'} width={16} height={16}/>
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
                    <div className={`flex flex-wrap w-full mt-5 gap-x-5 gap-y-16 justify-center lg:justify-between  pl-5 pr-5`}>
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