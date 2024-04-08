import Image from "next/image";
import win from "../../../public/images/win.jpg";
import { useState } from "react";

const YouWon = ({setIsMemoryGameHidden, setIsMiniGamesHidden}) => {
    const [isWinHidden, setIsWinHidden] = useState(false);
    const closeWin = () => {
        setIsWinHidden(true)
        setIsMemoryGameHidden(true)
        setIsMiniGamesHidden(false)
        console.log('Win window closed, and isMermoryGameHidden now equal to TRUE')
    }

    return (
        <div
            className={
               !isWinHidden ? `flex flex-col gap-5 w-[500px] h-[435px] bg-white rounded-2xl justify-center items-center text-center` : `hidden`
            }
        >
            
            <Image
                className={"flex justify-center"}
                src={win}
                width={150}
                height={150}
                alt={"win"}
            />
            <div className={"w-full flex justify-center items-center"}>
                <h1
                    className={
                        "text-2xl font-bold text-black justify-center flex"
                    }
                >
                    Congratulations!
                </h1>
            </div>
            <p>
                You have won <span className={"text-[#80CC2D]"}>+1 chance</span>{" "}
                for additional recipe<br></br> generation! Use it when
                you&apos;re ready.
            </p>
        </div>
    );
};

export default YouWon;
