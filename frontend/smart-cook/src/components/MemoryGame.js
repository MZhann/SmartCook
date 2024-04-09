import { useEffect, useState } from "react";
import YouWon from "@/components/modal/YouWon";
import Data from "./Data";
import Card from "./Card";
import Image from "next/image";
import lossImage from "../../public/images/over.jpg";
import { incrementTokenCount } from "../utils/token";


function MemoryGame({ setIsHidden, setWhatGame, setIsMiniGamesHidden }) {
    const [cardsArray, setCardsArray] = useState([]);
    const [moves, setMoves] = useState(0);
    const [firstCard, setFirstCard] = useState(null);
    const [secondCard, setSecondCard] = useState(null);
    const [stopFlip, setStopFlip] = useState(false);
    const [won, setWon] = useState(false);
    const [loss, setLoss] = useState(false);
    const [seconds, setSeconds] = useState(260);
    const [isMemoryGameHidden, setIsMemoryGameHidden] = useState(false);

    const [isClient, setIsClient] = useState(false);
    const [isWin, setIsWin] = useState(false);
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        console.log("closing");
        setWhatGame("choice");
        // setIsGamesHidden(false);
        // console.log("isGamesHidden: " + isGamesHidden);
        // setIsOpen(false);
        setIsMemoryGameHidden(true);
        // console.log("isHidden before:" + isHidden)
        if (setIsHidden !== undefined && setIsHidden !== null && setIsHidden !== '') {
            setIsHidden(true);            
        }
    };

    useEffect(() => {
        setIsClient(true);
    }, []);

    function handleSelectedCards(item) {
        if (firstCard !== null && firstCard.id !== item.id) {
            setSecondCard(item);
        } else {
            setFirstCard(item);
        }
    }

    function removeSelection() {
        setFirstCard(null);
        setSecondCard(null);
        setStopFlip(false);
        setMoves((prevMoves) => prevMoves + 1);
    }

    useEffect(() => {
        if (firstCard && secondCard) {
            setStopFlip(true);
            if (firstCard.name === secondCard.name) {
                setCardsArray((prevArray) => {
                    const updatedArray = prevArray.map((unit) => {
                        return unit.name === firstCard.name
                            ? { ...unit, matched: true }
                            : unit;
                    });
                    const isGameWon = updatedArray.every(
                        (unit) => unit.matched
                    );
                    if (isGameWon) {
                        setWon(true);
                        incrementTokenCount();
                    }
                    return updatedArray;
                });
                removeSelection();
            } else {
                setTimeout(() => {
                    removeSelection();
                }, 1000);
            }
        }
    }, [firstCard, secondCard]);

    useEffect(() => {
        if (seconds === 0) {
            setLoss(true);
        }
    }, [seconds]);

    function startNewGame() {
        const randomOrderArray = Data.sort(() => 0.5 - Math.random());
        setCardsArray(randomOrderArray);
        setMoves(0);
        setFirstCard(null);
        setSecondCard(null);
        setWon(false);
        setLoss(false);
        setSeconds(260); // Reset timer
    }

    useEffect(() => {
        if (!won && !loss) {
            const timer = setInterval(() => {
                setSeconds((prevSeconds) =>
                    prevSeconds > 0 ? prevSeconds - 1 : 0
                );
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [won, loss]);
    console.log(
        "before return (), isMemoryGameHidden equal to: " + isMemoryGameHidden
    );
    return (
        <div
            className={` ${
                isMemoryGameHidden
                    ? "hidden"
                    : "block container  justify-center relative items-center"
            }`}
        >
            <div className={"absolute top-4 right-2 w-[40px] h-[40px]"} onClick={handleClose}>
                <svg
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
            {won ? (
                <YouWon
                    setIsMemoryGameHidden={setIsMemoryGameHidden}
                    setIsMiniGamesHidden={setIsMiniGamesHidden}
                />
            ) : loss ? (
                <div className="flex flex-col gap-5 w-full h-[350px] justify-center items-center text-center">
                    <Image
                        className="flex justify-center"
                        src={lossImage}
                        width={150}
                        height={150}
                        alt="loss"
                    />
                    <p className="text-2xl">{moves} moves</p>
                    <p>Try again for an additional attempt!</p>
                    <button
                        className="flex justify-center items-center mt-10 px-4 py-2 bg-[#AAE06E] cursor-pointer rounded-full text-white hover:bg-green-400"
                        onClick={startNewGame}
                    >
                        Start Again
                    </button>
                </div>
            ) : (
                <>
                    <div className="flex flex-row">
                        <button
                            className="px-[23px] py-[6px] text-white rounded-3xl bg-[#AAE06E] font-Montserrat"
                            onClick={startNewGame}
                        >
                            Start
                        </button>
                        <div className="flex-col ml-2">
                            <div>{moves} moves</div>
                            <div>Time: {seconds} sec</div>
                        </div>
                    </div>
                    <div className="board">
                        {cardsArray.map((item) => (
                            <Card
                                key={item.id}
                                item={item}
                                handleSelectedCards={handleSelectedCards}
                                toggled={
                                    item === firstCard ||
                                    item === secondCard ||
                                    item.matched === true
                                }
                                stopflip={stopFlip}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default MemoryGame;
