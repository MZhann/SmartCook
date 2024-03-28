import MainContainer from "@/components/MainContainer";
import React from "react";
import "../app/globals.css";
import bg from "../../public/images/greenBg.svg"
import Image from "next/image";
import Navbar from "@/components/Navbar";
import WelcomeTry from "@/components/WelcomeTry";
import RecentlyAdded from "@/components/RecentlyAdded";
import FollowAlong from "@/components/FollowAlong";
import Footer from "@/components/Footer";
import EightPuzzle from "@/components/EightPuzzle";
import DynamicQuiz from "@/components/Quiz";

const Main = () => {
    return (
        <MainContainer>
            <Image src={bg} className="absolute w-2/3 right-0 top-0 z-0" alt="background"  />
            <div className=" w-full max-w-[1195px] relative flex flex-col ">
                <Navbar/>
                <WelcomeTry/>
                <RecentlyAdded/>
                <div className={`flex flex-row justify-around`}>
                    <div className={`w-1/3 flex-col p-4 mt-14 flex justify-around bg-white rounded`}>
                        <h1 className={`flex justify-center text-xl mb-3`}>8 Puzzle Game</h1>
                        <EightPuzzle/>
                    </div>
                    <div className={`w-1/3 flex-col p-4 mt-14 flex justify-around bg-white rounded`}>
                        <DynamicQuiz/>
                    </div>
                </div>
                <FollowAlong/>
                <Footer/>
            </div>


        </MainContainer>
    )
}

export default Main;