import Image from "next/image";
import cookBattle from "../../../../../public/images/cookBattle.png";
import close from "../../../../../public/images/Close.svg";
import {useState} from "react";
import SelectOpponentCard from "@/components/modal/battle-cards/choose-opponent-cards/SelectOpponentCard";

const SelectTitleCard = ({isModalOpen, onClose, openNext, setTitle}) => {
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitted value:", inputValue);
        setTitle(inputValue);
        openNext();
    };

    if (!isModalOpen) return null;

    return (
        <div
            className={`overflow-auto fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${isModalOpen ? "" : "hidden"}`}
        >
            <div className={`w-[500px] h-[412px] bg-white rounded-xl relative flex flex-col items-center `}>
                <Image src={close} alt="close" width={24} height={24} className="cursor-pointer absolute top-6 right-6" onClick={onClose} />
                <Image src={cookBattle} alt="cookBattle" width={80} height={80} className="mt-14" />
                <div className="font-bold tracking-[0.1px] mt-5 text-lg">
                    Culinary Clash 145
                </div>
                <div className="mt-2 mb-6">Step 1: Select a mission for the battle</div>
                <form onSubmit={handleSubmit} className="flex w-full flex-col items-center mt-6">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Write a task for the battle"
                        required
                        className="border-2 border-gray-300 pl-3 w-full max-w-[344px] py-1 rounded-3xl"
                    />
                    <button type="submit" className="mt-6 bg-[#AAE06E] hover:bg-green-500 text-white font-bold py-2 px-4 rounded-3xl">
                        Next
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SelectTitleCard;
