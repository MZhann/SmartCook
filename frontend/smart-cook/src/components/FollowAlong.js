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
                <Image className="ml-[-40px]" src={parts} alt={''}/>
                <div className="text-xs font-bold self-start mb-2">FOLLOW ALONG</div>
                <div className="flex space-x-5">
                    <Link href="https://pin.it/4igVo3nFH">
                        <Image src={pinterest} alt="pinterest" />
                    </Link>
                    <Link href="https://wa.me/message/ZHE74PSDF2YMP1">
                        <Image src={whatsapp} alt="whatsapp" />
                    </Link>
                    <Link href="https://www.instagram.com/smartcook_kz?igsh=MWY2c21nN28wMzAzOA%3D%3D&utm_source=qr">
                        <Image src={instagram} alt="instagram" />
                    </Link>
                    <Link href="https://www.facebook.com/profile.php?id=61558165319458">
                        <Image src={facebook} alt="facebook" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FollowAlong;
