import Image from "next/image";
import medal from "../../public/images/top3.png";
import coin from "../../public/images/coin.png";
import ScoreInfoCard from '@/components/modal/leaderbord-cards/ScoreInfoCard';
import { useState } from "react";
import Modal from './modal/Modal';
import UserInfo from "./modal/UserInfo";


const LeadersCard = ({ isLeader, name, score, index, id }) => {
    const [showModal, setShowModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const showCoinCard = () => {
        setIsOpen(true);
    }

    const unshowCoinCard = () => {
        setIsOpen(false);
    }

    const showProfileModal = () => {
        setShowModal(true)
    }

    const unshowProfileModal = () => {
        setShowModal(false)
    }

    return (
        <div className="w-11/12 h-[75px] rounded-full bg-[#2A293B] mt-5 px-8 flex items-center justify-between">
            <div className="flex items-center">
                {isLeader ? <Image src={medal} className="w-[45px] h-[49px]" alt="medal" /> : <div className="w-[45px] h-[45px] bg-[#AAE06E] rounded-full flex justify-center items-center text-white font-bold text-xl">{index + 1}</div> }
                
                <div onMouseEnter={showProfileModal} onMouseLeave={unshowProfileModal} className="text-white ml-4 text-xl">
                    {name}
                    {showModal && (
                        <Modal onClose={unshowProfileModal}>
                            <UserInfo id={id}/>
                        </Modal>
                    )}    
                </div>

            </div>
            <div className="flex items-center" onMouseOverCapture={showCoinCard} onMouseLeave={unshowCoinCard}>
                {isOpen && <ScoreInfoCard />}
                <Image src={coin} className="w-[30px] h-[30px]" alt="coin" />
                <div className="text-xl text-white ml-2">{score}</div>
            </div>
        </div>
    );
};

export default LeadersCard;
