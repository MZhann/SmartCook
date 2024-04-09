import React, { useEffect } from "react";
import close from "../../../public/images/Close.svg";
import Image from "next/image";
import loading from "../../../public/loading.gif";
import { useState } from "react";
import MiniGames from "./MiniGames";
import Link from "next/link";
import DynamicQuiz from "@/components/DynamicQuiz";


const DoYouWannaPlay = ({ isQuizOpen, closeQuiz, setIsQuizOpen }) => {

    const [isQuizStarted, setIsQuizStarted] = useState(false);
    const [timeStarted, setTimeStarted] = useState(true);

    const handleClick = () => {
        setIsHidden(true);
        setIsGamesHidden(false);
    };

    const handleAccept = () => {
        closeQuiz()
        setIsQuizStarted(true);

    }

    const handleDecline = () => {
        closeQuiz();
    }

    if(timeStarted){
        setTimeout(() => {
            console.log("This code executes after 10 seconds");
            setIsQuizOpen(true);
        }, 5000);
        setTimeStarted(false)
    }
    

    const handleClose = () => {
        // onClose();
        closeQuiz();
        
    };

    return (
        isQuizStarted ? 
        <div
            className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
        >
            <DynamicQuiz setIsQuizStarted={setIsQuizStarted} isQuizStarted={isQuizStarted} />
        </div>
         : (<div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${
                isQuizOpen ? "" : "hidden"
            }`}
        >
            <div className="w-[500px] h-[428px] bg-white  rounded-xl mt-6 relative flex flex-col items-center">
                <Image
                    src={close}
                    onClick={handleClose}
                    alt="close"
                    className="cursor-pointer absolute right-5 top-5"
                />

               

                <div className="flex flex-col justify-center items-center h-[280px]">
                    <div className="text-2xl font-bold text-center">
                        Do you want to get 3 free<br></br> generations? 
                    </div>
                    <div className="text-xl text-center mt-5">Attempt Quiz and get 5/5</div>

                </div>

                <div className="flex w-full justify-center space-x-10 px-7 mt-14 items-center text-white">
                   <button  onClick = {handleAccept} className="py-3 px-5 bg-green-400 rounded-2xl text-xl font-bold hover:bg-green-600 transition-all duration-200">Accept</button>
                   <button onClick = {handleDecline} className="py-3 px-5 bg-red-400 rounded-2xl text-xl font-bold hover:bg-red-600 transition-all duration-200">Decline</button>
                </div>
            </div>
        </div>)
    );
};
export default DoYouWannaPlay;
