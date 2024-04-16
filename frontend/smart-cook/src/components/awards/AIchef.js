import Image from "next/image";
import cookaward from "../../../public/images/cook-award.png";
import React, { useState } from 'react';


const HoverExample = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="relative">
            {/* Element to hover over */}
            <div
                className=" text-white cursor-pointer transition-opacity duration-500 ease-in-out"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Image src={cookaward} height={38}  alt="burger" />

            </div>

            {/* Conditional rendering for the hidden div */}
            <div
                className={`absolute top-full w-[200px] h-[130px] left-0 p-4 text-center flex justify-center items-center rounded-2xl bg-white border-black border-2 text-black opacity-0 transition-opacity duration-500 ease-in-out ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ marginTop: '10px' }}
            >
                AI chef <br></br> Awarded to users who have utilized Food AI to generate recipes on the site over 10 times.
            </div>
        </div>
    );
};

export default HoverExample;
