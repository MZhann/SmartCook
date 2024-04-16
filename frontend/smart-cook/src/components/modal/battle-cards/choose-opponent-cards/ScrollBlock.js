import React, {useEffect, useRef, useState} from "react";
import defaultAvatar from "../../../../../public/images/avatarka.png";
import Avatar from "../choose-opponent-cards/Avatar";
import Image from "next/image";
import left from "../../../../../public/images/left.png";
import right from "../../../../../public/images/right.png";
import axios from "axios";
const ScrollBlock = ({setOpponent, filteredUsers}) => {
    const scrollRef = useRef(null);

    const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(null);

    const handleAvatarClick = (index, userId) => {
        setSelectedAvatarIndex(index);
        setOpponent(userId);
        console.log(userId);
    };

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
        }
    };

    return (
        <div>
            <div>
                <button
                    className="absolute bottom-[100px] left-0 p-[8px]  border-none cursor-pointer transform -translate-y-1/2"
                    onClick={scrollLeft}
                >
                    <Image
                        src={left}
                        alt="left"
                        className="w-[18px] h-[30px]"
                    />
                </button>
                <button
                    className="absolute bottom-[100px] right-0  p-[8px] border-none cursor-pointer transform -translate-y-1/2"
                    onClick={scrollRight}
                >
                    <Image
                        src={right}
                        alt="right"
                        className="w-[18px] h-[30px]"
                    />
                </button>
            </div>
            <div className="flex items-center w-[450px] overflow-hidden relative justify-center mt-7">
                <div
                    className="overflow-x-scroll w-[420px] p-4 scrollbar-hide"
                    ref={scrollRef}
                >
                    <div className={`flex`}>
                        {filteredUsers && filteredUsers.map((user, index) => (
                            <Avatar
                                key={index}
                                onClick={() => handleAvatarClick(index, user.id)} // Pass user.id here
                                isChecked={selectedAvatarIndex === index}
                                image={user.photo ? user.photo : defaultAvatar}
                                name={`${user.first_name} ${user.last_name}`}
                            />
                        ))}
                    </div>
                </div>
                <style jsx>{`
                    .scrollbar-hide::-webkit-scrollbar {
                        display: none;
                    }
                `}</style>
            </div>
        </div>
    );
};

export default ScrollBlock;
