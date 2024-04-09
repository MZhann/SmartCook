import React, { useEffect, useState } from "react";
import Image from "next/image";
import win from "../../public/images/win.jpg";
import YouWon from "./modal/YouWon";
import { incrementTokenCount } from "../utils/token";


const EightPuzzle = ({setIsHidden, setWhatGame}) => {
    const [isClient, setIsClient] = useState(false);
    const [isWin, setIsWin] = useState(false);
    const [isOpen, setIsOpen] = useState(true);



    const handleClose = () => {
        console.log("closing");
        setWhatGame("choice")
        // setIsGamesHidden(false);
        // console.log("isGamesHidden: " + isGamesHidden);
        setIsOpen(false);
        // console.log("isHidden before:" + isHidden)
        if (setIsHidden !== undefined && setIsHidden !== null && setIsHidden !== '') {
            setIsHidden(true);
                       
        }
        
    };

    useEffect(() => {
        setIsClient(true);
    }, []);

    const initialTiles = [1, 2, 3, 4, 5, 6, 7, 8, 0];

    const [tiles, setTiles] = useState(initialTiles);

    function shuffle(array) {
        let currentIndex = array.length;

        while (currentIndex !== 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex],
            ];
        }
    }

    shuffle(initialTiles);

    const handleTileClick = (index) => {
        const emptyIndex = tiles.indexOf(0);
        if (isValidMove(index, emptyIndex)) {
            const newTiles = [...tiles];
            [newTiles[index], newTiles[emptyIndex]] = [
                newTiles[emptyIndex],
                newTiles[index],
            ];
            setTiles(newTiles);

            if (isPuzzleCompleted(newTiles)) {
                setIsWin(true);
                incrementTokenCount();
                console.log(isWin);
            }
        }
    };

    const resetPuzzle = () => {
        setTiles(initialTiles);
    };

    const isValidMove = (tileIndex, emptyIndex) => {
        const rowDiff = Math.abs(
            Math.floor(tileIndex / 3) - Math.floor(emptyIndex / 3)
        );
        const colDiff = Math.abs((tileIndex % 3) - (emptyIndex % 3));
        return (
            (rowDiff === 0 && colDiff === 1) || (colDiff === 0 && rowDiff === 1)
        );
    };

    const isPuzzleCompleted = (tiles) => {
        for (let i = 0; i < tiles.length - 1; i++) {
            if (tiles[i] !== i + 1) {
                return false;
            }
        }
        return true;
    };

    const renderTile = (value, index) => {
        return (
            <>
                {isClient ? (
                    <div
                        key={index}
                        className={`tile ${
                            value === 0
                                ? "bg-black text-gray-500"
                                : "border-4 border-black hover:bg-opacity-25 text-[#AAE06E]"
                        } w-[118px] h-[118px] text-[96px] flex items-center justify-center cursor-pointer`}
                        onClick={() => handleTileClick(index)}
                    >
                        {value}
                    </div>
                ) : (
                    <h1>Prerendered</h1>
                )}
            </>
        );
    };

    return (
        <div
            className={`w-[500px] flex-col p-4 mt-14 flex justify-around items-center bg-white rounded-3xl ${
                isOpen ? "block" : "hidden"
            }`}
        >
            <div className={"flex justify-center w-full relative"}>
                {!isWin && (
                    <h1 className={`flex justify-center text-xl mb-3`}>
                        8 Puzzle Game
                    </h1>
                )}
                <div className={"absolute top-0 right-2"} onClick={handleClose}>
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
            </div>
            {!isWin ? (
                <div className="flex flex-col items-center">
                    <div className="grid grid-cols-3 -mb-1 h-[350px] w-[340px]">
                        {tiles.map((value, index) => renderTile(value, index))}
                    </div>
                    <button
                        className="text-white bg-[#AAE06E] w-[136px] h-10 rounded-3xl mt-10"
                        onClick={resetPuzzle}
                    >
                        Reset
                    </button>
                </div>
            ) : (
                <YouWon />
            )}
        </div>
    );
};

export default EightPuzzle;
