import Image from "next/image";
import burger from "../../../public/images/burgerr.png";
import React, { useState } from 'react';


const HoverExample = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="relative">
            {/* Element to hover over */}
            <div
                className=" text-white cursor-pointer transition-opacity duration-500 ease-in-out w-[30px] "
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Image src={burger} height={38} width={26} alt="burger" />

            </div>

            {/* Conditional rendering for the hidden div */}
            <div
                className={`absolute top-full w-[200px] h-[100px] left-[-30px] p-4 text-center flex justify-center items-center rounded-2xl bg-white border-black border-2 text-black opacity-0 transition-opacity duration-500 ease-in-out ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ marginTop: '10px' }}
            >
                I did it! <br></br>Awarded for publishing 5 or more recipes on the website.
            </div>
        </div>
    );
};

export default HoverExample;
