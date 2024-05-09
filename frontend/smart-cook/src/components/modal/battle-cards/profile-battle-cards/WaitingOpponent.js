import Image from "next/image";
import cookBattle from "../../../../../public/images/cookBattle.png";
import BattleReceiptCard from "./BattleReceiptCard";
import vs from "../../../../../public/images/vs.png";
import time from "../../../../../public/images/time.png";

const WaitingOpponent = ({battle, doNotShow}) => {
    return (
        <div className="w-full lg:w-[574px] mb-4 rounded-3xl text-white bg-[#2A293B] flex flex-col items-center justify-between">
            <Image
                src={cookBattle}
                alt="Cook Battle"
                className="w-[50px] h-[50px] mt-5"
            />
            <div className="text-lg mt-3">Culinary Clash {battle.id}</div>
            <div className="text-3xl text-white mt-2 px-4 text-center">{battle.theme}</div>

            <div className="w-[150px] h-[36px] bg-[#AAE06E] flex justify-center items-center text-2xl font-bold tracking-wider rounded-3xl mt-4">
                00:00
            </div>

            <div className="flex justify-between items-center w-full flex-col sm:flex-row md:justify-center md:space-x-6  p-6">
                <BattleReceiptCard recipe={battle?.initiator_recipe} user={battle?.initiator} doNotShow={doNotShow}/>
                <Image src={vs} alt="vs" className="w-[50px] h-[50px]" />
                <div className="w-[230px] h-[275px] rounded-xl bg-white flex flex-col items-center justify-center ">
                    <div className="text-black text-lg text-center font-bold mb-3">Waiting for Opponent</div>
                    <div className="text-black text-lg font-bold mb-3">{battle?.opponent.first_name + " " + battle?.opponent.last_name}</div>
                    <Image src={time} alt="time" className="w-[50px] h-[50px]" />
                </div>
            </div>
        </div>
    );
};

export default WaitingOpponent;
