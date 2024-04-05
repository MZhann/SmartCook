import React from "react";
import { useState } from "react";
import Image from "next/image";

const Ingredient = ({ image, name, checked, onChange, id }) => {

    let bgColor = checked ? "bg-[#AAE06E]" : "bg-white";

    return (
        <label
            className={`cursor-pointer hover:bg-[#AAE06E] transition duration-200 w-[120px] h-[120px] rounded-full ${bgColor} flex justify-center items-center mt-4`}
        >
            <input
                id={id}
                type="checkbox"
                className="sr-only w-[40px] h-[40px] bg-blue-500" // Hide default checkbox
                checked={checked}
                onChange={onChange}
            />
                
            <div  htmlFor={id} className="cursor-pointer transition-colors  duration-150 flex flex-col justify-center items-center">
                <div className="h-[50px] flex">
                    <Image src={image} className="w-[52px]" alt="ingredient" />
                </div>
                <div className="font-bold text-sm h-[30px] mt-2">{name}</div>
            </div>
        </label>
    );
};

export default Ingredient;
