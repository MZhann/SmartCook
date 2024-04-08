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
import {useRouter} from "next/router";
import axios from "axios";

const AiReceipt = () => {
    return (
        <MainContainer>
            <div className=" w-full max-w-[1195px] relative flex flex-col ">
                <Navbar />
                <div
                    className={`gap-4 mt-5 flex flex-col items-center justify-center text-center text-white`}
                >
                    <h1
                        className={`flex self-center text-[40px] tracking-wider`}
                    >
                        AI Recipe Generation
                    </h1>
                    <p className={"text-xl font-[400] tracking-wider"}>
                        Your Custom AI-Generation Recipe is Ready - Don Appetit
                    </p>
                </div>
                <div className={"mt-8 text-white flex flex-row w-full"}>
                    <div className={`flex flex-col gap-3 w-[500px]`}>
                        <Image
                            className={`rounded-[20px] w-[400px] h-[400px] object-cover`}
                            src={food}
                            alt={"food"}
                        />
                        <div
                            className={`flex flex-row items-center text-[20px] gap-7 font-[300]`}
                        >
                            <div
                                className={`ml-3 flex flex-row items-center gap-3`}
                            >
                                <Image src={clock} alt={"clocl"} />
                                <p>35 minutes</p>
                            </div>
                            <div className={`flex flex-row items-center gap-3`}>
                                <Image src={people} alt={"people"} />
                                <p>for 5 people</p>
                            </div>
                        </div>
                    </div>
                    <div className={`flex flex-col w-2/3`}>
                        <div
                            className={`w-3/5 flex flex-row items-center space-x-4`}
                        >
                            <div className="w-[100[x] h-[36px] bg-[#DAE8FF] text-[#203878] text-lg flex justify-center items-center rounded-full p-4">
                                Asian
                            </div>
                            <div className="w-[120px] h-[36px] bg-[#FFE3F3] text-[#872D51] text-lg flex justify-center items-center rounded-full p-4 ">
                                Breakfast
                            </div>
                        </div>
                        <div className={`mt-4 leading-tight`}>
                            <h1
                                className={`w-[520px] text-[40px] mb-4 mt-5 tracking-wider`}
                            >
                                Juicy burger made from cutlet and potatoes
                            </h1>
                            <p
                                className={`w-[92%] text-left text-2xl tracking-wider leading-[36px]`}
                            >
                                A unigue and flavorful Brazilian salad combining
                                the sweetness of bananas with savory chicken and
                                cheese, all tossed in a light and creamy milk
                                dressing.
                            </p>
                        </div>
                        <div className="flex space-x-5">
                            <button className="w-[210px] h-[48px] text-white text-lg bg-[#FF5858] flex justify-center items-center rounded-full mt-10">
                                Delete
                            </button>
                            <button className="w-[210px] h-[48px] text-white text-lg bg-[#C3F48D] flex justify-center items-center rounded-full mt-10">
                                Save Recipe
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <div className={`flex flex-col w-[500px] mt-16`}>
                        <h1 className={`text-[#AAE06E] text-[28px]`}>
                            Ingredients
                        </h1>
                        <ul
                            className={`flex flex-col text-white text-[24px] gap-1 font-[400] mt-8`}
                        >
                            <li>1 boneless, skinless chicken breast</li>
                            <li>1 boneless, skinless chicken breast</li>
                            <li>1 boneless, skinless chicken breast</li>
                        </ul>
                    </div>
                    <div className={`flex flex-col w-full mt-16 ml-24`}>
                        <h1 className={`text-[#AAE06E] text-[28px]`}>
                            Direction
                            <ol className="list-decimal text-white w-[630px] text-xl">
                                <li>Season the chicken breast with salt and pepper. In a pan, melt the butter over medium heat and cook the chicken until fully cooked. Let it cool and slice.</li>
                                <li>In a small bowl, whisk together the milk and a pinch of salt and pepper to make the dressing.</li>
                                <li>In a salad bowl, arrange the fresh greens, sliced banana, cooked chicken, and shredded cheese</li>
                                <li>Drizzle the milk dressing over the salad and gently toss to combine. </li>
                                <li>Serve immediately and enjoy! </li>
                            </ol>
                        </h1>
                    </div>
                </div>
                <div className="w-[953px] h-[75px] border-2 border-[#AAE06E] rounded-2xl self-center mt-16 mb-16 text-center text-[#AAE06E] text-md flex justify-center items-center">NOTE: This recipe is AI-generated and DishGen has not verified it for accuracy or safety. It may contain errors. <br></br> Always use your best judgement when making AI-generated dishes.</div>

            </div>
        </MainContainer>
    );
};

export default AiReceipt;
