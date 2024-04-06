import MainContainer from "@/components/MainContainer";
import React from "react";
import "../app/globals.css";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FoodAI from "@/components/ai-generation-page/FoodAI"
import ChooseDetails from "@/components/ai-generation-page/ChooseDetails"


const Main = () => {
    return (
        <MainContainer>
            <div className=" w-full max-w-[1195px] relative flex flex-col">
                <Navbar textcolor={"white"} loggedin={true}/>
                <FoodAI />
                <ChooseDetails />
                <Footer/>
            </div>


        </MainContainer>
    )
}

export default Main;