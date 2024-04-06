import Image from "next/image";
import { useState } from "react";
import cookBattle from "../../../../../public/images/cookBattle.png";
import close from "../../../../../public/images/Close.svg";
import search from "../../../../../public/images/Search.png";
import avatar1 from "../../../../../public/images/avatar1.png";
import avatar2 from "../../../../../public/images/avatar2.png";
import avatar3 from "../../../../../public/images/avatar3.png";
import avatar from "../../../../../public/images/avatar.jpg";
import egg from "../../../../../public/images/egg.png";

import Avatar from "./Avatar";
import ScrollBlock from "./ScrollBlock";

const SelectOpponent = () => {
    const [isHidden, setIsHidden] = useState("");
    const [inputValue, setInputValue] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here (e.g., send data to backend, etc.)
        console.log("Submitted value:", inputValue);
        setInputValue(""); // Clear input after submission (optional)
    };

    const handleCloseClick = () => {
        setIsHidden("hidden");
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <div
            className={`w-[500px] h-[512px] bg-white rounded-xl relative flex flex-col items-center mt-5 ${isHidden}`}
        >
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
            <div className="mt-2 mb-6">Step 2: Choose your opponent</div>
            <form onSubmit={handleSubmit} className="flex">
                <div className="flex w-5/6">
                    <input
                        type="text"
                        className="border-2 border-gray-300 pl-3 w-[250px] h-[36px] py-1 rounded-l-3xl"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Find Opponent"
                        required
                    />
                    <button className="w-[50px] h-[36px] flex justify-center bg-[#AAE06E] items-center rounded-e-3xl">
                        <Image src={search} className="w-[20px] h-[20px] " />
                    </button>
                </div>

                <button className="w-[135px] h-[36px] bg-[#AAE06E] flex justify-center items-center font-bold text-white rounded-3xl self-center hover:bg-green-500">
                    Random
                </button>
            </form>
            <ScrollBlock />
            <div className="flex space-x-5">
                <button className="border-2 border-[#AAE06E] text-[#AAE06E] w-[150px] h-[36px] rounded-full">Back</button>
                <button className="border-2 text-white w-[150px] bg-[#AAE06E] h-[36px] rounded-full">Next</button>
            </div>
        </div>
    );
};

export default SelectOpponent;
