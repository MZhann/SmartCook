import React from "react";
import { useState } from "react";

const Dropdown = ({ options, placeholder, onSelect }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleSelectOption = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onSelect(option);
    };

   

    return (
        <div className="relative inline-block text-left mt-2">
            <div>
                <button
                    type="button"
                    className="inline-flex w-[344px] h-[42px]  px-4 py-2 text-sm font-medium text-gray-500 hover:text-white justify-between items-center border-2 border-gray-500 rounded-3xl hover:bg-[#AAE06E] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {selectedOption || placeholder}
                    <svg
                        className="-mr-1 ml-2 h-5 w-5 text-gray-700"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 12.586L4.707 7.293a1 1 0 011.414-1.414L10 10.172l4.879-4.88a1 1 0 111.414 1.415l-5.5 5.5a1 1 0 01-1.414 0l-5.5-5.5a1 1 0 111.414-1.415L10 12.587z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div className="z-10 origin-top-right w-[344px] absolute right-0 mt-2 rounded-md shadow-2xl border-2 border-gray-300 bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                        {options.map((option) => (
                            <button
                                key={option}
                                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-[#AAE06E] rounded-3xl"
                                onClick={() => handleSelectOption(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
