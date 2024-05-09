import Image from "next/image";
import photo from "../../../../../public/images/defaultFood.png";
import avatar from "../../../../../public/images/edit-profile.png";
import trophy from "../../../../../public/images/winTrophy.png";
import drawHands from "../../../../../public/images/handshake.png";
import Like from "@/components/Like";
import Link from "next/link";
import Modal from '../../Modal';
import UserInfo from "../../UserInfo";
import { useState } from "react";

const BattleReceiptCard = ({ draw, win, user, recipe, doNotShow }) => {

    const TruncateString = (str) => {
        if (str.length > 22) {
            return `${str.slice(0, 22)}...`;
        }
        return str;
    };
     
    const [showModal, setShowModal] = useState(false);

    const showProfileModal = () => {
        setShowModal(!showModal)
    }


    return (
        <Link href="/recipes/[recipeTitle]" as={`/recipes/${recipe?.id}`} passHref>
            <div className=" sm:w-[230px] w-72 sm:h-[275px] rounded-xl bg-white">
                {win ? (
                    <div className={`relative`}>
                        <div
                            className="w-[288px] h-[173px] sm:w-[230px] sm:h-[173px] bg-black absolute rounded-t-xl opacity-70 flex justify-center items-center">
                        </div>
                        <Image
                            src={trophy}
                            alt="win"
                            className="w-[150px] z-50 absolute left-[70px] sm:left-[45px] top-[20px] opacity-100 h-[150px]"
                        />
                    </div>
                ) : draw ? (
                    <div className={`relative`}>
                        <div
                            className="w-[288px] h-[173px] sm:w-[230px] sm:h-[173px] bg-black absolute rounded-t-xl opacity-70 flex justify-center items-center">

                        </div>
                        <Image
                            src={drawHands}
                            alt="win"
                            className="w-[150px] z-50 absolute left-[70px] sm:left-[40px] top-[20px] opacity-100 h-[150px]"
                        />
                    </div>
                ) : (
                    <>
                    </>
                )}
                {recipe && recipe?.image ? (
                    <Image
                        src={recipe?.image}
                        width={230}
                        height={173}
                        alt="receipt photo"
                        className="rounded-t-xl w-[100%] h-[173px] sm:w-[230px] sm:h-[173px] object-cover"
                    />
                ) : (
                    <Image
                        width={230}
                        height={173}
                        src={photo}
                        alt="receipt photo"
                        className="rounded-t-xl w-[100%] h-[173px] sm:w-[230px] sm:h-[173px] object-cover"
                    />
                )}
               
                <div className="flex items-center m-3 z-50" onClick={showProfileModal}>
                {showModal && (
                        <Modal onClose={showProfileModal}>
                            <UserInfo id={user.id}/>
                        </Modal>
                    )}  
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
                    {!recipe?.title ? 'No recipe yet' : TruncateString(recipe?.title)}
                </div>
                {!doNotShow ? <div className="flex z-50 justify-center ">
                    <Like id={recipe?.id} count={recipe?.likes_count}/>
                </div> : <div className="h-10"></div> }
                
            </div>
        </Link>
    );
};

export default BattleReceiptCard;
