import MainContainer from "@/components/MainContainer";
import Navbar from "@/components/Navbar";
import food from "@/../public/images/food.jpg";
import Image from "next/image";
import clock from "@/../public/images/clock.svg";
import people from "@/../public/images/profile-2user.svg";
import avatar from "@/../public/images/avatar.jpg";
import love from "@/../public/images/love.png";
import fav from "@/../public/images/favorite.png";
import potato from "@/../public/images/potato.jpg";
import Recipe from "@/components/Recipe";

const HumanReciept = () => {
    return (
        <MainContainer>
            <div className=" w-full max-w-[1195px] relative flex flex-col items-center">
                <Navbar />
                <div
                    className={`gap-4 mt-5 flex flex-col items-center justify-center text-center text-white`}
                >
                    <h1 className={`flex self-center text-[40px]`}>
                        Recipe inspiration
                    </h1>
                    <p className={"text-[20px] font-[400]"}>
                        Explore a world of flavor with our diverse collection of
                        recipes, featuring <br></br>culinary delights from every
                        corner of the globe.
                    </p>
                </div>

                <div class="flex items-center space-x-4 mt-10">
                    <input
                        type="text"
                        class="px-4 py-2 rounded-full border border-gray-300 focus:outline-none w-[375px] h-[42px]"
                        placeholder="Search"
                    />
                    <button class="px-4 py-2 rounded-full bg-[#AAE06E] text-white hover:bg-green-600 focus:outline-none w-[135px] h-[42px]">
                        Search
                    </button>
                </div>

                <div className="flex flex-wrap justify-between mt-10">
                    <Recipe /> 
                    <Recipe /> 
                    <Recipe /> 
                    <Recipe /> 
                    <Recipe /> 
                    <Recipe /> 
                    <Recipe /> 
                    <Recipe /> 
                </div>
                <div className="h-[400px]"></div>
            </div>
        </MainContainer>
    );
};

export default HumanReciept;
