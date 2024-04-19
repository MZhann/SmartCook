import Image from "next/image";
import burger from "../../../public/images/burgerr.png";
import staraward from "../../../public/images/star-award.png";
import React, { useState } from 'react';


const HoverExample = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="relative">
            {/* Element to hover over */}
            <div
                className=" text-white cursor-pointer transition-opacity duration-500 ease-in-out  "
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Image src={staraward} height={42}  alt="burger" />

            </div>

            {/* Conditional rendering for the hidden div */}
            <div
                className={`absolute top-full w-[200px] h-[160px] left-[-80px] p-4 text-center flex justify-center items-center rounded-2xl bg-white border-black border-2 text-black opacity-0 transition-opacity duration-500 ease-in-out ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ marginTop: '10px' }}
            >
                Superstar<br></br>Awarded to the top 10 chefs on the leaderboard who have actively participated in culinary battles.
            </div>
        </div>
    );
};

export default HoverExample;
