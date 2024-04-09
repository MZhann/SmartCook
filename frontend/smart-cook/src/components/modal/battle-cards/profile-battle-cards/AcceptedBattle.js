import Image from "next/image";
import cookBattle from "../../../../../public/images/cookBattle.png";
import BattleReceiptCard from "./BattleReceiptCard";
import vs from "../../../../../public/images/vs.png";
import opponentReceiptImage from "../../../../../public/images/opponentReceiptPhoto.png";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

const AcceptedBattle = ({battle}) => {

    const router = useRouter()
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        // Function to update the time left
        const updateTimer = () => {
            const startDate = new Date(battle?.created_at);
            const endDate = new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate(), startDate.getUTCHours() + 24, startDate.getUTCMinutes(), startDate.getUTCSeconds()));

            const now = new Date();
            const difference = endDate - now;
            if (difference <= 0) {
                // Time's up
                setTimeLeft('00:00:00');
                return;
            }

            // Calculate time left
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            console.log(hours, minutes, seconds);
            // Format time left
            const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            setTimeLeft(formattedTime);
        };

        // Update timer every second
        const intervalId = setInterval(updateTimer, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, [battle?.created_at]);
    return (
        <div className={`${router.pathname === '/challenges' && 'mt-4'} w-[574px] h-[546px] rounded-3xl text-white bg-[#2A293B] flex flex-col items-center justify-between`}>
            <Image
                src={cookBattle}
                alt="Cook Battle"
                className="w-[50px] h-[50px] mt-5"
            />
            <div className="text-lg mt-3">Culinary Clash 145</div>
            <div className="text-3xl text-white mt-2">{battle && battle?.theme}</div>

            <div className="w-[150px] h-[36px] bg-[#AAE06E] flex justify-center items-center text-2xl font-bold tracking-wider rounded-3xl mt-4">
                {timeLeft}
            </div>

            <div className="flex justify-between items-center w-full p-6">
                <BattleReceiptCard />
                <Image src={vs} alt="vs" className="w-[50px] h-[50px]" />
                <BattleReceiptCard image={opponentReceiptImage}/>
            </div>
        </div>
    );
};

export default AcceptedBattle;
