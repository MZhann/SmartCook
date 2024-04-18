import Image from "next/image";
import photo from "../../../../../public/images/defaultFood.png";
import avatar from "../../../../../public/images/edit-profile.png";
import unlike from "../../../../../public/images/unlike.svg";
import trophy from "../../../../../public/images/winTrophy.png";
import Like from "@/components/Like";

const BattleReceiptCard = ({ image, win, user, recipe }) => {
    return (
        <div className="w-[230px] h-[275px] rounded-xl bg-white">
            {win ? (
                <div className="w-[230px] h-[173px] bg-black absolute rounded-t-xl opacity-70 flex justify-center items-center">
                    <Image
                        src={trophy}
                        alt="win"
                        className="w-[150px] h-[150px]"
                    />
                </div>
            ) : (
                <></>
            )}
            {recipe && recipe?.image ? (
                <Image
                    src={recipe?.image}
                    width={230}
                    height={173}
                    alt="receipt photo"
                    className="rounded-t-xl w-[230px] h-[173px] object-cover"
                />
            ) : (
                <Image
                    src={photo}
                    alt="receipt photo"
                    className="rounded-t-xl w-[230px] h-[173px] object-cover"
                />
            )}
            <div className="flex items-center m-3">
                {user && user?.photo ? (
                    <Image
                        width={20}
                        height={20}
                        className="rounded-full w-[20px] h-[20px]"
                        src={user?.photo}
                    />
                ) : (
                    <Image
                        className="rounded-full w-[20px] h-[20px]"
                        src={avatar}
                    />
                )}
                <div className="text-black ml-2 text-[10px] ">
                    {user && user.first_name} {user && user.last_name}
                </div>
            </div>
            <div className="text-black text-sm ml-3 tracking-wider">
                {recipe?.title || 'No recipe yet'}
            </div>
            <div className="flex justify-center ">
                <Like count={recipe?.likes_count}/>
            </div>
        </div>
    );
};

export default BattleReceiptCard;
