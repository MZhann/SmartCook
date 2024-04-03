import React from "react";
import Image from "next/image";
import generateAI from "../../public/images/generateAI.png"
import pan from "../../public/images/pan.png"
import cheese from "../../public/images/cheese.png"
import avocado from "../../public/images/avocado.png"
import oil from "../../public/images/oil.png"
import Link from "next/link";

const WelcomeTry = () => {
    return (
        <div className="flex items-center w-full justify-between relative">
            <Image src={cheese} alt="cheese"   className="absolute top-full right-[40%]"/>
            <Image src={avocado} alt="avocado" className="absolute top-14 left-[45%]"/>
            <Image src={oil} alt="oil"         className="absolute top-[50%] left-[45%]"/>
            <div className="mt-10">
                <div className="text-white text-5xl tracking-wide">Are you ready for <br></br> culinary challenges?</div>
                <div className="text-white text-xl mt-5 tracking-wide">Welcome to our unique culinary portal<br></br> where taste, creativity and fun meet!</div>
                <div className="flex mt-6">
                    <Link href="/reciept-make" className="text-white rounded-3xl px-3 bg-[#AAE06E] p-2 font-bold tracking-wide">Create Recipe</Link>
                    <Link href="/ai-generation" className="ml-5 rounded-3xl flex items-center px-5 bg-white tracking-wide"><Image className="mr-3 w-[20px]" src={generateAI} alt="generateImg" /> Recipe Generate</Link>
                </div>
            </div>
            <div>
                <Image className="w-[500px]" src={pan} alt="pan" />
            </div>
        </div>
    )

}

export default WelcomeTry;