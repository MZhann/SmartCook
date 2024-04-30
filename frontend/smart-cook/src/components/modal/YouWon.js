import Image from "next/image";
import win from "../../../public/images/win.jpg";
import { useState } from "react";

const YouWon = ({ setIsMiniGamesHidden, setIsMemoryGameHidden, setIsWin }) => {
    const [isWinHidden, setIsWinHidden] = useState(false);
    const closeWin = () => {
        // setIsWinHidden(true);
        if(setIsMemoryGameHidden!=null && setIsMemoryGameHidden!=undefined){
            // setIsMemoryGameHidden(true);

        }
        setIsMiniGamesHidden(false);
        console.log(
            "Win window closed, and isMermoryGameHidden now equal to TRUE"
        );
        setIsWin(false)
    };

    return (
        <div
            className={
                !isWinHidden
                    ? `flex flex-col gap-5 text-black w-8/10 h-[435px] w-8/10 md:w-[500px] bg-white rounded-2xl justify-center items-center text-center`
                    : `hidden`
            }
        >
            <div>
                <svg
                    onClick={closeWin}
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

            <Image
                className={"flex justify-center"}
                src={win}
                width={150}
                height={150}
                alt={"win"}
            />
            <div
                className={
                    "w-full flex justify-center text-center items-center"
                }
            >
                <h1
                    className={
                        "text-2xl font-bold  text-black justify-center flex"
                    }
                >
                    Congratulations!
                </h1>
            </div>
            <p className="text-black">
                You have won <span className={"text-[#80CC2D]"}>+1 chance</span>{" "}
                for additional recipe<br></br> generation! Use it when
                you&apos;re ready.
            </p>
        </div>
    );
};

export default YouWon;
