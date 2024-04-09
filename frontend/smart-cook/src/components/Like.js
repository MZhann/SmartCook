import Image from "next/image";
import love from "../../public/images/love.png";
import {useRouter} from "next/router";
import axios from "axios";
import {config} from "../../config";
import {useState} from "react";

const Like = ({count, id}) => {
    const router = useRouter()
    const [like, setLike] = useState(count)
    console.log(router)
    const handleLike = async () => {
        try {
            await axios.post(`${config.baseUrl}/api/v1/recipes/${id}/like/`, id,{
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                }
            })
            setLike(like + 1);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div
            onClick={handleLike}
            className={`cursor-pointer ${router.route !== "/recipes/[recipeTitle]" && "absolute"} ${router.pathname !== "/all-receipts" || router.pathname !== "/ai-receipts" ? 'top-20' : 'top-18' } items-center bg-white w-[65px] h-[35px] rounded-3xl py-2 px-2 text-black flex-row justify-evenly flex`}>
            <Image className={`hover:size-5`} src={love} alt={'like'} width={16} height={16}/><p>{like}</p></div>
    )
}

export default Like;