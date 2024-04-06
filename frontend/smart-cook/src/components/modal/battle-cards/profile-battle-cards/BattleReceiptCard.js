import Image from "next/image";
import photo from "../../../../../public/images/battleReceiptImage.png";
import avatar from "../../../../../public/images/avatar.jpg";
import unlike from "../../../../../public/images/unlike.svg";
import trophy from "../../../../../public/images/winTrophy.png"; 

const BattleReceiptCard = ({ image, win }) => {
    return (
        <div className="w-[230px] h-[275px] rounded-xl bg-white">
            {win ? 
                <div className="w-[230px] h-[173px] bg-black absolute rounded-t-xl opacity-70 flex justify-center items-center">
                    <Image src={trophy} alt="win" className="w-[150px] h-[150px]" />
                </div> 
                : <></>}
            <Image
                src={image ? image : photo}
                alt="receipt photo"
                className="rounded-t-xl w-[230px] h-[173px] object-cover"
            />
            <div className="flex items-center m-3">
                <Image
                    className="rounded-full w-[20px] h-[20px]"
                    src={avatar}
                />
                <div className="text-black ml-2 text-[10px] ">Mariya Kim</div>
            </div>
            <div className="text-black text-sm ml-3 tracking-wider">
                Salad with Chile and Lime
            </div>
            <div className="flex justify-center mt-2">
                <Image src={unlike} alt="like" className="h-[16px] w-[16px]" />
            </div>
        </div>
    );
};

export default BattleReceiptCard;
