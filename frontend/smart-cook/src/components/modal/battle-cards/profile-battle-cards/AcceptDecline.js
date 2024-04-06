import Image from "next/image";
import cookBattle from "../../../../../public/images/cookBattle.png";
import BattleReceiptCard from "./BattleReceiptCard";
import vs from "../../../../../public/images/vs.png";
import accept from "../../../../../public/images/accept.png";
import decline from "../../../../../public/images/decline.png";

const AcceptDecline = () => {
    return (
        <div className="w-[574px] h-[546px] rounded-3xl text-white bg-[#2A293B] flex flex-col items-center justify-between">
            <Image
                src={cookBattle}
                alt="Cook Battle"
                className="w-[50px] h-[50px] mt-5"
            />
            <div className="text-lg mt-3">Culinary Clash 145</div>
            <div className="text-3xl text-white mt-2">Salads with fruits</div>

            <div className="w-[150px] h-[36px] bg-[#AAE06E] flex justify-center items-center text-2xl font-bold tracking-wider rounded-3xl mt-4">
                00:00
            </div>

            <div className="flex justify-between items-center w-full p-6">
                <BattleReceiptCard />
                <Image src={vs} alt="vs" className="w-[50px] h-[50px]" />
                <div className="text-white w-[230px] h-[275px] rounded-xl bg-white flex flex-col items-center justify-center ">
                    <button className="flex w-[150px] h-[36px] bg-[#AAE06E] rounded-3xl justify-center mb-2 items-center" >
                        Accept <Image src={accept} className="w-[30px] h-[30px] ml-3" alt="accept" />

                    </button>
                    <button className="flex w-[150px] h-[36px] bg-[#FF736C] rounded-3xl mt-2 justify-center items-center">
                        Decline <Image src={decline} className="w-[30px] h-[30px] ml-3" alt="decline"/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AcceptDecline;
