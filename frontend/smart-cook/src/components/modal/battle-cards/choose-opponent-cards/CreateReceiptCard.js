import Image from "next/image";
import cookBattle from "../../../../../public/images/cookBattle.png";
import close from "../../../../../public/images/Close.svg";
import { useState } from "react";

const SelectTitleCard = () => {
    const [isHidden, setIsHidden] = useState('');
    const [inputValue, setInputValue] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here (e.g., send data to backend, etc.)
        console.log("Submitted value:", inputValue);
        setInputValue(""); // Clear input after submission (optional)
    };

    const handleCloseClick = () => {
        setIsHidden('hidden');
    }

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <div className={`w-[500px] h-[412px] bg-white rounded-xl relative flex flex-col items-center ${isHidden}`}>
            <Image
                onClick={handleCloseClick}
                src={close}
                alt="close"
                className="cursor-pointer w-[24px] h-[24px] absolute top-6 right-6"
            />
            <Image src={cookBattle} className="w-[80px] h-[80px] mt-14" />
            <div className="font-bold tracking-[0.1px] mt-5 text-lg">
                Culinary Clash 145
            </div>
            <div className="mt-2 mb-6">Step 3: Create a recipe for a battle</div>
            
            <button className="w-[150px] h-[36px] text-white bg-[#AAE06E] rounded-3xl">Create</button>
        </div>
    );
};

export default SelectTitleCard;
