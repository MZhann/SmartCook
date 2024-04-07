import {useEffect, useState} from "react";
import YouWon from "@/components/modal/YouWon";
import Data from "./data";
import Card from "./Card";
import Image from "next/image";
import loss from "../../public/images/over.jpg";

function MemoryGame() {
    const [cardsArray, setCardsArray] = useState([]);
    const [moves, setMoves] = useState(0);
    const [firstCard, setFirstCard] = useState(null);
    const [secondCard, setSecondCard] = useState(null);
    const [stopFlip, setStopFlip] = useState(false);
    const [won, setWon] = useState(0);
    const [loss, setLoss] = useState(false); // State variable to track loss
    function handleSelectedCards(item) {
        console.log(typeof item);
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
        setMoves((prevValue) => prevValue + 1);
    }

    function NewGame() {
        setSeconds(260);
        setLoss(false); // Reset loss to false at the start of a new game



        const timer = setInterval(() => {
            setSeconds(prevSeconds => {
                if (prevSeconds === 0) {
                    clearInterval(timer);
                    setLoss(true); // Set loss to true when timer reaches 0
                    return 0;
                }
                return prevSeconds - 1;
            });
        }, 1000);

        setTimeout(() => {
            const randomOrderArray = Data.sort(() => 0.5 - Math.random());
            setCardsArray(randomOrderArray);
            setMoves(0);
            setFirstCard(null);
            setSecondCard(null);
            setWon(0);
        }, 1200);

        return () => clearInterval(timer);
    }


    const [seconds, setSeconds] = useState(260);
    return (
        <div className="container">
            {won !== 6 ? (
                <>
                    <div className={'flex flex-row'}>
                        <button className="px-[23px] py-[6px] text-white rounded-3xl bg-[#AAE06E] font-Montserrat"
                                onClick={NewGame}>
                            Start
                        </button>
                        <div className={'flex-col ml-2'}>
                            <div className="">{moves} moves</div>
                            <div>Time: {seconds} sec</div>
                        </div>
                    </div>
                    <div className="board">
                        {
                            cardsArray.map((item) => (
                                <Card
                                    item={item}
                                    key={item.id}
                                    handleSelectedCards={handleSelectedCards}
                                    toggled={
                                        item === firstCard ||
                                        item === secondCard ||
                                        item.matched === true
                                    }
                                    stopflip={stopFlip}
                                />
                            ))
                        }
                    </div>
                </>
            ) : loss ? (
                <div className={'flex flex-col gap-5 w-full h-[350px] justify-center items-center text-center'}>
                    <Image className={'flex justify-center'} src={loss} width={150} height={150} alt={'loss'}/>
                    <h1 className={'text-2xl'}>{moves} moves</h1>
                    <p>Try again for an additional attempt!</p>
                    <button
                        className="flex justify-center items-center mt-10 px-4 py-2 bg-[#AAE06E] cursor-pointer rounded-full text-white hover:bg-green-400"
                        onClick={NewGame} // Change to reset the game
                    >
                        Start Again
                    </button>
                </div>
            ) : (
                <YouWon/>
            )}
        </div>
    );

}

export default MemoryGame