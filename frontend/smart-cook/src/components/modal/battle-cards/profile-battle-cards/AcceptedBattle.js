import Image from "next/image";
import cookBattle from "../../../../../public/images/cookBattle.png";
import BattleReceiptCard from "./BattleReceiptCard";
import vs from "../../../../../public/images/vs.png";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import {config} from "../../../../../config";


const AcceptedBattle = ({battle}) => {
    console.log(battle)
    const router = useRouter()
    const [timeLeft, setTimeLeft] = useState('');
    
    
    useEffect(() => {
        const updateTimer = () => {
            const startDate = new Date(battle?.created_at);
            const endDate = new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate(), startDate.getUTCHours() + 24, startDate.getUTCMinutes(), startDate.getUTCSeconds()));
            const now = new Date();
            const difference = endDate - now;
            if (difference <= 0) {
                setTimeLeft('00:00:00');
                axios.post(`${config.baseUrl}/api/v1/clashes/${battle?.id}/end/`).then(r => {
                    console.log(r.data);
                    window.location.reload();
                }).catch(err => console.error(err))
                return;
            }
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            console.log(hours, minutes, seconds);

            const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            setTimeLeft(formattedTime);
        };

        const intervalId = setInterval(updateTimer, 1000);


        return () => clearInterval(intervalId);
    }, [battle?.created_at]);
    console.log(battle.winner !== null && battle?.winner.first_name === battle?.initiator.first_name);
    return (
        <div className={`${router.pathname === '/challenges' && 'mt-4'} w-full sm:max-w-[570px] sm:min-h-[546px] rounded-3xl text-white bg-[#2A293B] m-[5px] flex flex-col items-center justify-between`}>
            <Image
                src={cookBattle}
                alt="Cook Battle"
                className="w-[50px] h-[50px] mt-5"
            />
            <div className="text-lg mt-3">Culinary Clash {battle.id}</div>
            <div className="text-3xl text-white mt-2">{battle?.theme}</div>
            <div className="w-72 p-3 sm:p-0 sm:w-[150px] sm:h-[36px] bg-[#AAE06E] flex justify-center items-center text-2xl font-bold tracking-wider rounded-3xl mt-4">
                {timeLeft}
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center w-full p-6">
                <BattleReceiptCard user={battle.initiator} recipe={battle?.initiator_recipe} win={battle.winner !== null && battle?.winner.first_name === battle?.initiator.first_name}/>
                <Image src={vs} alt="vs" className="w-[50px] h-[50px]" />
                <BattleReceiptCard user={battle.opponent} recipe={battle?.opponent_recipe} win={battle.winner !== null && battle?.winner.first_name === battle?.opponent.first_name}/>
            </div>
        </div>
    );
};

export default AcceptedBattle;
