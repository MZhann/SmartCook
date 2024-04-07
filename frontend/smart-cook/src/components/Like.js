import Image from "next/image";
import love from "../../public/images/love.png";

const Like = ({count}) => {
    return (
        <div
            className={'items-center bg-white w-[65px] h-[35px] rounded-3xl py-2 px-2 text-black flex-row justify-evenly flex'}>
            <Image src={love} alt={'like'} width={16} height={16}/><p>{count}</p></div>
    )
}

export default Like;