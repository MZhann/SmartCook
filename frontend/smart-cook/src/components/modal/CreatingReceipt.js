import React from "react";
import close from "../../../public/images/Close.svg";
import Image from "next/image";
import loading from "../../../public/loading.gif";
import { useState } from "react";
import MiniGames from "./MiniGames";

const CreatingReceipt = () => {
    const [isHidden, setIsHidden] = useState(false);
    const [isGamesHidden, setIsGamesHidden] = useState(false)

    const handleClick = () => {
        setIsHidden(!isHidden);
    };

    const handleGameClick = () => {
        setIsGamesHidden(!isGamesHidden);
        setIsHidden(!isHidden);
    };

    return (
        <div>
            {!isHidden && (
                <div className="w-[500px] h-[428px] bg-white rounded-xl mt-6 relative flex flex-col items-center">
                    <Image
                        src={close}
                        onClick={handleClick}
                        alt="close"
                        className="cursor-pointer absolute right-5 top-5"
                    />
                    <Image
                        src={loading}
                        alt="loading"
                        className="w-[100px] h-[100px] mt-20"
                    />
                    <div className="text-xl font-bold tracking-[0.5px] mt-10">
                        Creating a recipe...
                    </div>
                    <div className="text-center text-sm leading-5 mt-5">
                        It can take some time. But usually this happens quite
                        quickly.<br></br> Sit back and prepare to be amazed!
                    </div>
                    <div className="flex w-full justify-between px-7 mt-14 items-center">
                        <div className="text-sm">
                            You can play our eciting games!
                        </div>
                        <button onClick={handleGameClick} className="text-white w-[120px] h-[30px] rounded-2xl bg-[#AAE06E] hover:bg-green-600">
                            Play
                        </button>
                    </div>
                </div>
            )}
            {
                isGamesHidden && (
                    <MiniGames />
                )
            }
        </div>
    );
};
export default CreatingReceipt;
