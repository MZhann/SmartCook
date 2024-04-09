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
import leaderboard from "../../public/images/leaderboard.png";
import AcceptedBattle from "@/components/modal/battle-cards/profile-battle-cards/AcceptedBattle";
import LeadersCard from "@/components/LeadersCard";

const Leaderboard = () => {
    return (
        <MainContainer>
            <div className=" w-full max-w-[1195px] relative flex flex-col items-center">
                <Navbar />
                <div
                    className={`gap-4 mt-5 flex flex-col items-center justify-center text-center mb-5 `}
                >
                    <div className="flex items-center space-x-2">
                        <Image
                            src={leaderboard}
                            alt="leaderboard"
                            className="w-[70px] h-[70px]"
                        />

                        <h1
                            className={`flex self-center text-3xl mt-[-10px] font-bold text-black`}
                        >
                            Liderboard
                        </h1>
                    </div>

                    <p className={" font-bold"}>
                        See where you stand among culinary enthusiasts! Track
                        your progress, compare<br></br> scores, and strive for
                        the top spot in the ultimate culinary rankings.
                    </p>
                </div>
                {/* ({ isLeader, name, score })  */}
                <div>
                    {/* Логику isLeader надо переписать, просто трем верхним дать а от параметров убрать */}
                    {/* Места дашь с помощью индексов */}
                    <LeadersCard
                        isLeader={true}
                        name={"Erkin Tilavberdiyev"}
                        score={550}
                    />
                    <LeadersCard
                        isLeader={true}
                        name={"Anna Kim"}
                        score={500}
                    />
                    <LeadersCard
                        isLeader={true}
                        name={"Denis Ten"}
                        score={450}
                    />
                    <LeadersCard
                        isLeader={false}
                        name={"Alexey Navalny"}
                        score={400}
                    />
                    <LeadersCard
                        isLeader={false}
                        name={"Barak Obama"}
                        score={350}
                    />
                    <LeadersCard
                        isLeader={false}
                        name={"Askhat Niyazov"}
                        score={300}
                    />
                    <LeadersCard
                        isLeader={false}
                        name={"Mukan Zhanbolat"}
                        score={250}
                    />
                </div>
                <div className="w-[900px]">
                    <button className="text-white  bg-[#AAE06E] self-start w-[250px] h-[48px] rounded-3xl text-lg font-bold mb-20 mt-10">
                        Load More
                    </button>
                </div>
            </div>
        </MainContainer>
    );
};

export default Leaderboard;
