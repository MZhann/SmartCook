import Image from "next/image";
import love from "../../public/images/love.png";
import { useRouter } from "next/router";
import axios from "axios";
import { config } from "../../config";
import {useEffect, useState} from "react";

const Like = ({ count, id }) => {
    const router = useRouter();
    const [like, setLike] = useState(count);
    const [likes, setLikes] = useState();
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        const likedRecipes = likes || [];
        const found = likedRecipes.some(likeRecipe => likeRecipe.id === id || router.query.recipeTitle);
        setIsLiked(found);
        console.log(found)
    }, [likes, id]);

    console.log(router.query.recipeTitle);

    useEffect(() => {
        const fetchUserLikes = () => {
            axios.get(`${config.baseUrl}/api/v1/recipes/user/likes/`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken"),
                }
            }).then(r => {
                setLikes(r.data)
                console.log(likes)
            }).catch(err => console.error(err));
        }

        fetchUserLikes();
    }, []);

    const handleLike = async (event) => {
        event.preventDefault();
        try {
            await axios.post(
                `${config.baseUrl}/api/v1/recipes/${id}/like/`,
                {},
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("accessToken"),
                    },
                }
            );
            setLike(like + 1);
            setIsLiked(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleRemoveLike = async (event) => {
        event.preventDefault();
        try {
            await axios.delete(
                `${config.baseUrl}/api/v1/recipes/${id}/like/`,
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("accessToken"),
                    },
                }
            );
            setLike(like - 1);
            setIsLiked(false);
        } catch (error) {
            console.error(error);
        }
        try {
            await axios.delete(
                `${config.baseUrl}/api/v1/recipes/${id}/like/`,
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("accessToken"),
                    },
                }
            );

        } catch (error) {
            console.error(error);
        } finally {
            setLike(like - 1);
            setIsLiked(false);
        }
    };

    return (
        <div className={`cursor-pointer ${router.pathname === "/ai-receipts" && 'hidden'} items-center bg-white w-[65px] h-[35px] rounded-3xl py-2 px-2 text-black flex-row justify-evenly flex`}>
            {!isLiked ? (
                <svg onClick={handleLike} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M13.8931 3.07333C13.5526 2.73267 13.1483 2.46243 12.7033 2.27805C12.2584 2.09368 11.7814 1.99878 11.2998 1.99878C10.8181 1.99878 10.3412 2.09368 9.89618 2.27805C9.45121 2.46243 9.04693 2.73267 8.70642 3.07333L7.99975 3.78L7.29309 3.07333C6.60529 2.38554 5.67244 1.99914 4.69975 1.99914C3.72707 1.99914 2.79422 2.38554 2.10642 3.07333C1.41863 3.76112 1.03223 4.69397 1.03223 5.66666C1.03223 6.63935 1.41863 7.5722 2.10642 8.26L2.81309 8.96666L7.99975 14.1533L13.1864 8.96666L13.8931 8.26C14.2338 7.91949 14.504 7.51521 14.6884 7.07023C14.8727 6.62526 14.9676 6.14832 14.9676 5.66666C14.9676 5.185 14.8727 4.70807 14.6884 4.26309C14.504 3.81812 14.2338 3.41383 13.8931 3.07333Z"
                        stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            ) : (
                <Image
                    onClick={handleRemoveLike}
                    className={`hover:size-5`}
                    src={love}
                    alt={"like"}
                    width={16}
                    height={16}
                />
            )}
            <p>{like}</p>
        </div>
    );
};

export default Like;
