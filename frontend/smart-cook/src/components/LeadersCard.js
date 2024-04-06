import Image from "next/image";
import medal from "../../public/images/top3.png";
import coin from "../../public/images/coin.png";

const LeadersCard = ({ isLeader, name, score }) => {
    return (
        <div className="w-[900px] h-[75px] rounded-full bg-[#2A293B] mt-5 px-8 flex items-center justify-between">
            <div className="flex items-center">
                {isLeader ? <Image src={medal} className="w-[45px] h-[49px]" alt="medal" /> : <div className="w-[45px] h-[45px] bg-[#AAE06E] rounded-full flex justify-center items-center text-white font-bold text-xl">4</div> }
                
                <div className="text-white ml-4 text-xl">{name}</div>
            </div>
            <div className="flex items-center">
                <Image src={coin} className="w-[30px] h-[30px]" alt="coin" />
                <div className="text-xl text-white ml-2">{score}</div>
            </div>
        </div>
    );
};

export default LeadersCard;
