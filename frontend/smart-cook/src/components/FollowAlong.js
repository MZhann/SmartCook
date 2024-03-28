import React from "react";
import Link from "next/link";
import Image from "next/image";
import pinterest from "../../public/images/pinterest.png";
import whatsapp from "../../public/images/whatsapp.png";
import instagram from "../../public/images/instagram.png";
import facebook from "../../public/images/meta.png";
import parts from "../../public/images/parts.png";



const FollowAlong = () => {
    return (
        <div className="w-full h-[176px] rounded-2xl mt-14 bg-[#C3F48D] flex flex-col items-center justify-center ">
            <div className="relative">
                <Image className="ml-[-40px]" src={parts}/>
                <div className="text-xs font-bold self-start mb-2">FOLLOW ALONG</div>
                <div className="flex space-x-5">
                    <Link href="#">
                        <Image src={pinterest} alt="pinterest" />
                    </Link>
                    <Link href="#">
                        <Image src={whatsapp} alt="whatsapp" />
                    </Link>
                    <Link href="#">
                        <Image src={instagram} alt="instagram" />
                    </Link>
                    <Link href="#">
                        <Image src={facebook} alt="facebook" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FollowAlong;
