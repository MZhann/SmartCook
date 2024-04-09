import Image from "next/image";
import checkmark from "../../../../../public/images/checkmark.png";
import { useState } from "react"

const Avatar = ({ onClick, image, name, isChecked }) => {

    return (
        <button
            className={`flex flex-col items-center justify-between mx-2 hover:mt-[-10px] relative }`}
            onClick={onClick}
        >
            <Image
                src={image}
                alt="avatar"
                className={`mb-3 w-[70px] h-[70px] rounded-full ${
                    isChecked ? "border-[#AAE06E] border-2" : ""}`}
            />
            <div className="text-[11px] font-bold text-center flex flex-col w-[70px] break-words">
                {name.split(" ").map((part, index) => (
                    <span key={index} className="whitespace-nowrap">
            {part}
          </span>
                ))}
            </div>
            {isChecked && (
                <div className="absolute top-[35px] right-[35px] transform translate-x-1/2 -translate-y-1/2">
                    <Image src={checkmark} alt="checkmark" className="w-6 h-6" />
                </div>
            )}
        </button>
    );
};

export default Avatar;
