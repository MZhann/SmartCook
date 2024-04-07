import { useEffect, useState } from "react";
import YouWon from "@/components/modal/YouWon";
import Data from "./data";
import Card from "./Card";
import Image from "next/image";
import lossImage from "../../public/images/over.jpg";

function MemoryGame() {
    const [cardsArray, setCardsArray] = useState([]);
    const [moves, setMoves] = useState(0);
    const [firstCard, setFirstCard] = useState(null);
    const [secondCard, setSecondCard] = useState(null);
    const [stopFlip, setStopFlip] = useState(false);
    const [won, setWon] = useState(false);
    const [loss, setLoss] = useState(false);
    const [seconds, setSeconds] = useState(260);

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
                        return unit.name === firstCard.name ? { ...unit, matched: true } : unit;
                    });
                    const isGameWon = updatedArray.every((unit) => unit.matched);
                    if (isGameWon) {
                        setWon(true);
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
                setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [won, loss]);

    return (
        <div className="container">
            {won ? (
                <YouWon />
            ) : loss ? (
                <div className="flex flex-col gap-5 w-full h-[350px] justify-center items-center text-center">
                    <Image className="flex justify-center" src={lossImage} width={150} height={150} alt="loss" />
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
                        <button className="px-[23px] py-[6px] text-white rounded-3xl bg-[#AAE06E] font-Montserrat" onClick={startNewGame}>
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
                                toggled={item === firstCard || item === secondCard || item.matched === true}
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
