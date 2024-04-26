import React from "react";
import Image from "next/image";
import Link from "next/link";
import mail from "../../public/images/mail.png";
import phone from "../../public/images/phone.png";
import location from "../../public/images/location.png";

const Footer = () => {
    const handleLocationClick = () => {
        // Construct the 2GIS URL with the location parameters for Almaty, Kazakhstan
        const latitude = 43.238949;
        const longitude = 76.889709;
        const url = `https://2gis.kz/almaty/search/${latitude},${longitude}/zoom/17`;
    
        // Open the location in 2GIS
        window.open(url, '_blank');
      };

    return (
        <div className="lg: px-6">
            <div className="hidden w-full text-white lg:flex h-[300px] mt-10">
                <div className="h-full w-4/12 border-r-2 border-gray-100 flex flex-col justify-center">
                    <div className="">
                        <div className="text-2xl mb-4">SmartCook</div>
                        <div className="text-xs ">
                            Where do delicious ideas come<br></br> from? Recipes
                            for dishes and<br></br> games on one site.{" "}
                        </div>
                    </div>
                </div>

                <div className="h-full w-3/12 border-r-2 border-gray-100 flex flex-col justify-center items-center">
                    <Link
                        className="flex flex-col items-center justify-center"
                        href="mailto:smartcook@gmail.com"
                    >
                        <Image src={mail} alt="mail" />
                        <div className="text-lg mt-3">MAIL</div>
                        <div className="text-xs">smartcook@gmail.com</div>
                    </Link>
                </div>
                <div className="h-full w-3/12 border-r-2 border-gray-100 flex flex-col justify-center items-center">
                    <Link
                        className="flex flex-col items-center justify-center"
                        href="https://wa.me/77473433434"
                    >
                        <Image src={phone} alt="phone" />
                        <div className="text-lg mt-3">CALL</div>
                        <div className="text-xs">+7(747)-343-34-34</div>
                    </Link>
                </div>
                <div className="h-full w-2/12 flex flex-col justify-center items-end">
                    <button
                        onClick={handleLocationClick}
                        
                    >
                        <Image src={location} alt="location" />
                        <div className="text-lg mt-3">FIND US</div>
                        <div className="text-xs">Almaty, KZ</div>
                    </button>
                </div>
            </div>
            <div className="flex sm:space-x-96 text-white mt-14 mb-5">
                <div>SmartCook</div>
                <div className="mt-1 ml-4 text-xs whitespace-nowrap">
                    2024 © All rights reserved
                </div>
            </div>
        </div>
    );
};

export default Footer;
