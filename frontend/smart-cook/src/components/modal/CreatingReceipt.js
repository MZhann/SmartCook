import React, { useEffect } from "react";
import close from "../../../public/images/Close.svg";
import Image from "next/image";
import loading from "../../../public/loading.gif";
import { useState } from "react";
import MiniGames from "./MiniGames";
import Link from "next/link";

const CreatingReceipt = ({ isLoading, isModalOpen, onClose, closeModal, recipeId }) => {
    const [isHidden, setIsHidden] = useState(false);
    const [isGamesHidden, setIsGamesHidden] = useState(true);

    const handleClick = () => {
        setIsHidden(true);
        setIsGamesHidden(false);
    };

    const handleClose = () => {
        onClose();
        setIsHidden(true);
        closeModal();
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${
                isModalOpen ? "" : "hidden"
            }`}
        >
            {!isHidden && (
                <div className="w-[500px] h-[428px] bg-white rounded-xl mt-6 relative flex flex-col items-center">
                    <Image
                        src={close}
                        onClick={handleClose}
                        alt="close"
                        className="cursor-pointer absolute right-5 top-5"
                    />
                    {isLoading ? (
                        <div className="flex flex-col items-center">
                            <Image
                                src={loading}
                                alt="loading"
                                className="w-[100px] h-[100px] mt-20"
                            />
                            <div className="text-xl font-bold tracking-[0.5px] mt-10">
                                Creating a recipe...
                            </div>
                            <div className="text-center text-sm leading-5 mt-5">
                                It can take some time. But usually this happens
                                quite quickly.<br></br> Sit back and prepare to
                                be amazed!
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col justify-center items-center h-[280px]">
                            <div className="text-3xl font-bold text-[#AAE06E]">
                                Your Receipt is Created
                            </div>
                            <Link href={`/recipes-ai/[recipeAi]`} as={`/recipes-ai/${recipeId && recipeId}`} passHref className="mt-4 w-[250px] h-[35px] bg-[#AAE06E] flex justify-center items-center text-white rounded-2xl hover:bg-green-500">
                                See Result
                            </Link>
                        </div>
                    )}

                    <div className="flex w-full justify-between px-7 mt-14 items-center">
                        <div className="text-sm">
                            You can play our exciting games!
                        </div>
                        <button
                            onClick={handleClick}
                            className="text-white w-[120px] h-[30px] rounded-2xl bg-[#AAE06E] hover:bg-green-600"
                        >
                            Play
                        </button>
                    </div>
                </div>
            )}
            {!isGamesHidden && <MiniGames setIsHidden={setIsHidden} isGamesHidden={isGamesHidden}  setIsGamesHidden={setIsGamesHidden}/>}
        </div>
    );
};
export default CreatingReceipt;
