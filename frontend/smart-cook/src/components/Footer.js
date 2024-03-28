import React from "react";
import Image from "next/image";
import mail from "../../public/images/mail.png";
import phone from "../../public/images/phone.png";
import location from "../../public/images/location.png";

const Footer = () => {
    return (
        <div>
            <div className="w-full text-white flex h-[300px] mt-10">
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
                    <Image src={mail} alt="mail" />
                    <div className="text-lg mt-3">MAIL</div>
                    <div className="text-xs">smartcook@gmail.com</div>
                </div>
                <div className="h-full w-3/12 border-r-2 border-gray-100 flex flex-col justify-center items-center">
                    <Image src={phone} alt="mail" />
                    <div className="text-lg mt-3">CALL</div>
                    <div className="text-xs">+7(747)-343-34-34</div>
                </div>
                <div className="h-full w-2/12 flex flex-col justify-center items-end">
                    <Image src={location} alt="mail" />
                    <div className="text-lg mt-3">FIND US</div>
                    <div className="text-xs">Almaty, KZ</div>
                </div>
            </div>
            <div className="flex space-x-96 text-white mt-14 mb-5">
                <div>SmartCook</div>
                <div className="text-xs">2024 © All rights reserved</div>
            </div>
        </div>
    );
};

export default Footer;
