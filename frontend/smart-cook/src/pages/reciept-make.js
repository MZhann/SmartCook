import MainContainer from "@/components/MainContainer";
import Navbar from "@/components/Navbar";
import instax from "@/../public/images/instax.jpg";
import Image from "next/image";
import trash from "@/../public/images/trash.jpg";
import React, { useState } from "react";

const RecieptMake = () => {
    const [count, setCount] = useState(0);

    const incrementCount = () => {
        setCount(prevCount => prevCount + 1);
    };

    return(
        <MainContainer>
            <div className="w-full max-w-[1195px] h-2000vh relative flex flex-col">
                <Navbar/>
                <div className={'flex w-full justify-center'}>
                    <div className="flex justify-center items-center flex-col w-[750px]">
                        <div className="text-center font-montserrat mt-[60px] text-white">
                            <h1 className={'text-[40px] mb-[20px] font-[500] leading-tight'}>Publish a recipe</h1>
                            <p className={'text-[20px] font-[500] leading-6'}>On this page you can publish your recipe
                                with
                                detailed information and steps to create
                                the dish</p>
                        </div>
                        <div
                            className="w-[750px] mt-[50px] h-[400px] bg-white flex justify-center items-center rounded-lg">
                            <div className="text-center justify-center items-center">
                                <Image className={'ml-[18px]'} src={instax} alt="instax" width={250} height={250}/>
                                <h1 className={'mt-5 text-[24px]'}>Upload finished food photo</h1>
                            </div>
                        </div>
                        <div
                            className="w-[750px] mt-[30px] p-[24px] h-[346px] bg-white flex flex-col rounded-lg ">
                            <h1 className={'text-[24px]'}>Ingredients</h1>
                            <div className="">
                                <div className={'flex flex-col'}>
                                    <div>
                                        <p className="text-[16px] mt-5 ">Ingredient {count}</p>
                                        <div className={'w-full justify-between flex-row flex items-center'}>
                                            <input
                                                id="ingredient"
                                                className={`w-[650px] rounded-3xl border-2 h-10 shadow-gray-500 text-xs p-3 mt-2`}
                                                placeholder="Enter text here"
                                                type="text"
                                            />
                                            <Image src={trash} height={24} width={24} alt={'trash'}/>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[16px] mt-5 ">Ingredient {count}</p>
                                        <div className={'w-full justify-between flex-row flex items-center'}>
                                            <input
                                                id="ingredient"
                                                className={`w-[650px] rounded-3xl border-2 h-10 shadow-gray-500 text-xs p-3 mt-2`}
                                                placeholder="Enter text here"
                                                type="text"
                                            />
                                            <Image src={trash} height={24} width={24} alt={'trash'}/>
                                        </div>
                                    </div>
                                    <button
                                        className={'self-center mt-5 items-center flex gap-3 text-white justify-center w-[220px] h-[42px] rounded-[30px] bg-[#AAE06E]'}>
                                        <span className={'text-[24px] items-center -mt-1'}>+</span> Ingredient
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div
                            className="w-[750px] mt-[30px] p-[24px]  bg-white flex flex-col rounded-lg ">
                            <h1 className={'text-[24px]'}>Steps</h1>
                            <div className="">
                                <div className={'flex flex-col'}>
                                    <div>
                                        <p className="text-[16px] mt-5 ">Step {count}</p>
                                        <div className={'w-full justify-between flex-row flex items-center'}>
                                            <input
                                                id="ingredient"
                                                className={`w-[650px] rounded-3xl border-2 h-10 shadow-gray-500 text-xs p-3 mt-2`}
                                                placeholder="Enter text here"
                                                type="text"
                                            />
                                            <Image src={trash} height={24} width={24} alt={'trash'}/>
                                        </div>
                                        <div>
                                            <Image className={'mt-5 border-[1.5px] w-[120px] h-[120px] rounded-lg'}
                                                   src={instax} alt="instax" width={120} height={120}/>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[16px] mt-5 ">Step {count}</p>
                                        <div className={'w-full justify-between flex-row flex items-center'}>
                                            <input
                                                id="ingredient"
                                                className={`w-[650px] rounded-3xl border-2 h-10 shadow-gray-500 text-xs p-3 mt-2`}
                                                placeholder="Enter text here"
                                                type="text"
                                            />
                                            <Image src={trash} height={24} width={24} alt={'trash'}/>
                                        </div>
                                        <div>
                                            <Image className={'mt-5 border-[1.5px] w-[120px] h-[120px] rounded-lg'}
                                                   src={instax} alt="instax" width={120} height={120}/>
                                        </div>
                                    </div>
                                    <button
                                        className={'self-center mt-5 items-center flex gap-3 text-white justify-center w-[220px] h-[42px] rounded-[30px] bg-[#AAE06E]'}>
                                        <span className={'text-[24px] items-center -mt-1'}>+</span> Step
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button
                            className={'mb-[100px] self-center mt-7 items-center flex gap-3 text-white text-[28px] justify-center w-[450px] h-[60px] rounded-[30px] bg-[#AAE06E]'}>
                            Publish
                        </button>
                    </div>
                </div>
            </div>
        </MainContainer>
    );
};

export default RecieptMake;
