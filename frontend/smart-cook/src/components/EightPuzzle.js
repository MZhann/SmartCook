import React, {useEffect, useState} from 'react';

const EightPuzzle = () => {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])


    const initialTiles = [
        1, 2, 3,
        4, 5, 6,
        7, 8, 0
    ];

    const [tiles, setTiles] = useState(initialTiles);

    function shuffle(array) {
        let currentIndex = array.length;

        while (currentIndex !== 0) {

            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
    }

    shuffle(initialTiles);

    const handleTileClick = (index) => {
        const emptyIndex = tiles.indexOf(0);
        if (isValidMove(index, emptyIndex)) {
            const newTiles = [...tiles];
            [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
            setTiles(newTiles);
        }
    };

    const resetPuzzle = () => {
        setTiles(initialTiles);
    };


    const isValidMove = (tileIndex, emptyIndex) => {
        const rowDiff = Math.abs(Math.floor(tileIndex / 3) - Math.floor(emptyIndex / 3));
        const colDiff = Math.abs((tileIndex % 3) - (emptyIndex % 3));
        return (rowDiff === 0 && colDiff === 1) || (colDiff === 0 && rowDiff === 1);
    };

    const renderTile = (value, index) => {
        return (
            <>
                {
                    isClient ?
                        (<div
                            key={index}
                            className={`tile ${value === 0 ? "bg-black text-gray-500" : "border-4 border-black hover:bg-opacity-25 text-black"} w-16 h-16  text-2xl flex items-center justify-center cursor-pointer`}
                            onClick={() => handleTileClick(index)}
                        >
                            {value}
                        </div>) : (<h1>Prerendered</h1>)
                }</>
        );
    };

    // Render the puzzle board
    return (
        <div className="flex flex-col items-center">
            <div className="grid grid-cols-3 gap-1 w-48">
                {tiles.map((value, index) => renderTile(value, index))}
            </div>
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={resetPuzzle}>
                Reset
            </button>
        </div>
    );
};

export default EightPuzzle;
