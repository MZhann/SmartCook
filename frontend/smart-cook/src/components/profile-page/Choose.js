import {useState} from "react";

const Chooser = () => {
    const [activeOption, setActiveOption] = useState(null);

    const handleOptionClick = (option) => {
        setActiveOption(option);
    };
    return (
        <div className={'w-[1196px] transition-all duration-500 h-[97px] py-[24px] px-[40px] flex flex-row bg-[#2A293B] rounded-3xl mt-6'}>
            <div
                className={`cursor-pointer px-[38px] w-[220px] h-[49px]  text-[24px] font-[500] flex justify-center items-center rounded-3xl transition-all duration-500 ${
                    activeOption === 'Past battles' ? 'bg-gradient-to-r from-[#AAE06E] to-[#CDE7B1] text-[#2A293B]' : 'text-white'
                }`}
                onClick={() => handleOptionClick('Past battles')}
            >
                Past battles
            </div>
            <div
                className={`cursor-pointer px-[38px] h-[49px] text-[#2A293B] text-[24px] font-[500] flex justify-center items-center rounded-3xl transition-all duration-500 ${
                    activeOption === 'My recipe' ? 'bg-gradient-to-r from-[#AAE06E] to-[#CDE7B1] text-[#2A293B]' : 'text-white'
                }`}
                onClick={() => handleOptionClick('My recipe')}
            >
                My recipe
            </div>
            <div
                className={`cursor-pointer px-[38px] h-[49px] text-[#2A293B] text-[24px] font-[500] flex justify-center items-center rounded-3xl transition-all duration-500 ${
                    activeOption === 'Saved recipe' ? 'bg-gradient-to-r from-[#AAE06E] to-[#CDE7B1] text-[#2A293B]' : 'text-white'
                }`}
                onClick={() => handleOptionClick('Saved recipe')}
            >
                Saved recipe
            </div>
        </div>
    );
};

export default Chooser;