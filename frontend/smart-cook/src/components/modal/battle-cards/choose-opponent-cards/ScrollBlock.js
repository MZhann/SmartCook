import React, { useRef } from "react";
import avatar1 from "../../../../../public/images/avatar1.png";
import avatar2 from "../../../../../public/images/avatar2.png";
import avatar3 from "../../../../../public/images/avatar3.png";
import avatar from "../../../../../public/images/avatar.jpg";
import egg from "../../../../../public/images/egg.png";
import Avatar from "../choose-opponent-cards/Avatar";
import Image from "next/image";
import left from "../../../../../public/images/left.png";
import right from "../../../../../public/images/right.png";

const ScrollBlock = () => {
    const scrollRef = useRef(null);

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
                    <div className="flex">
                        <Avatar image={avatar1} name={"Anna Kravich"} />
                        <Avatar image={avatar2} name={"Oleg Tinkovv"} />
                        <Avatar image={avatar3} name={"Zhanbolat Mukan"} />
                        <Avatar image={avatar1} name={"Anna Kravich"} />
                        <Avatar image={avatar3} name={"Zhanbolat Mukan"} />
                        <Avatar image={avatar} name={"Zhannurkhan Josh"} />
                        <Avatar image={avatar2} name={"Oleg Tinkovv"} />
                        <Avatar image={avatar1} name={"Anna Kravich"} />
                        <Avatar image={avatar3} name={"Zhanbolat Mukan"} />

                        <Avatar image={egg} name={"John Lennon"} />
                    </div>
                </div>

                {/* Custom CSS to hide the scrollbar */}
                <style jsx>{`
                    /* Hide the scrollbar */
                    .scrollbar-hide::-webkit-scrollbar {
                        display: none;
                    }
                `}</style>
            </div>
        </div>
    );
};

export default ScrollBlock;
