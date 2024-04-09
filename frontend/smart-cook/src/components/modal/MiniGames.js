import puzzle from "@/../public/images/puzzle.png";
import Image from "next/image";
import game from "@/../public/images/eightPuzzle.jpg";
import { useState, useEffect } from "react";
import "../App.css";
import EightPuzzle from "@/components/EightPuzzle";
import MemoryGame from "@/components/MemoryGame";
import DynamicQuiz from "@/components/DynamicQuiz";

const MiniGames = ({setIsMiniGamesOpen, setIsHidden, setIsGamesHidden, isGamesHidden }) => {
    const [whatGame, setWhatGame] = useState("choice");
    const [isMiniGamesHidden, setIsMiniGamesHidden] = useState(isGamesHidden);
    // const [isMiniHidden, setIsMiniHidden] = useState(false);  это и есть setIsGamesHidden
    // console.log("check:" + isGamesHidden);


    const handleMemoryGame = () => {
        setWhatGame("memory");
    };

    const handleClose = () => {
        if (setIsMiniGamesOpen !== undefined && setIsMiniGamesOpen !== null && setIsMiniGamesOpen !== '') {
            setIsMiniGamesOpen(false)          
        }
        setIsMiniGamesHidden(false);
        
        if (setIsGamesHidden !== undefined && setIsGamesHidden !== null && setIsGamesHidden !== '') {
            setIsGamesHidden(true);            
        }
        if (setIsHidden !== undefined && setIsHidden !== null && setIsHidden !== '') {
            setIsHidden(false);            
        }
    };

    const handlePuzzle = () => {
        setWhatGame("puzzle");
    };

    return (
        <>
            {!isMiniGamesHidden && (
                <div className="z-50">
                    {
                        {
                            choice: (
                                <>
                                    <div
                                        className={
                                            "w-[500px] h-[221px] p-[24px] rounded-lg bg-white"
                                        }
                                    >
                                        <div
                                            className={
                                                "flex justify-between w-full"
                                            }
                                        >
                                            <h1 className={"text-[24px]"}>
                                                Mini games
                                            </h1>
                                            <svg
                                                onClick={handleClose}
                                                className="cursor-pointer"
                                                width="25"
                                                height="25"
                                                viewBox="0 0 25 25"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M19.7806 18.7194C19.8502 18.7891 19.9055 18.8718 19.9432 18.9629C19.9809 19.0539 20.0003 19.1515 20.0003 19.2501C20.0003 19.3486 19.9809 19.4462 19.9432 19.5372C19.9055 19.6283 19.8502 19.711 19.7806 19.7807C19.7109 19.8504 19.6281 19.9056 19.5371 19.9433C19.4461 19.9811 19.3485 20.0005 19.2499 20.0005C19.1514 20.0005 19.0538 19.9811 18.9628 19.9433C18.8717 19.9056 18.789 19.8504 18.7193 19.7807L12.4999 13.5604L6.28055 19.7807C6.13982 19.9214 5.94895 20.0005 5.74993 20.0005C5.55091 20.0005 5.36003 19.9214 5.2193 19.7807C5.07857 19.6399 4.99951 19.4491 4.99951 19.2501C4.99951 19.051 5.07857 18.8602 5.2193 18.7194L11.4396 12.5001L5.2193 6.28068C5.07857 6.13995 4.99951 5.94907 4.99951 5.75005C4.99951 5.55103 5.07857 5.36016 5.2193 5.21943C5.36003 5.0787 5.55091 4.99963 5.74993 4.99963C5.94895 4.99963 6.13982 5.0787 6.28055 5.21943L12.4999 11.4397L18.7193 5.21943C18.86 5.0787 19.0509 4.99963 19.2499 4.99963C19.449 4.99963 19.6398 5.0787 19.7806 5.21943C19.9213 5.36016 20.0003 5.55103 20.0003 5.75005C20.0003 5.94907 19.9213 6.13995 19.7806 6.28068L13.5602 12.5001L19.7806 18.7194Z"
                                                    fill="#222222"
                                                />
                                            </svg>
                                        </div>
                                        <div
                                            className={
                                                "w-full flex flex-row justify-evenly"
                                            }
                                        >
                                            <div
                                                className={
                                                    "mt-4 flex flex-col text-center cursor-pointer"
                                                }
                                                onClick={handleMemoryGame}
                                            >
                                                <Image
                                                    className={
                                                        "flex justify-center ml-3"
                                                    }
                                                    width={85}
                                                    height={85}
                                                    src={puzzle}
                                                    alt={"puzzle"}
                                                />
                                                <p>Memory game</p>
                                            </div>
                                            <div
                                                onClick={handlePuzzle}
                                                className={
                                                    "mt-4 flex flex-col text-center cursor-pointer"
                                                }
                                            >
                                                <Image
                                                    className={
                                                        "flex justify-center ml-3"
                                                    }
                                                    width={85}
                                                    height={85}
                                                    src={game}
                                                    alt={"puzzle"}
                                                />
                                                <p>8 puzzle game</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ),
                            memory: (
                                <MemoryGame
                                    setIsHidden={setIsHidden}
                                    setWhatGame={setWhatGame}
                                    setIsMiniGamesHidden={setIsMiniGamesHidden}
                                />
                            ),
                            puzzle: (
                                <EightPuzzle
                                    setIsHidden={setIsHidden}
                                    setWhatGame={setWhatGame}
                                />
                            ),
                        }[whatGame]
                    }
                </div>
            )}
        </>
    );
};

export default MiniGames;
