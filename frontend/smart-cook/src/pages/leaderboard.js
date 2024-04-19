import MainContainer from "@/components/MainContainer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import leaderboard from "../../public/images/leaderboard.png";
import LeadersCard from "@/components/LeadersCard";
import {useEffect, useState} from "react";
import axios from "axios";

const Leaderboard = () => {
    const [leaders, setLeaders] = useState(null);
    const [displayedLeaders, setDisplayedLeaders] = useState(8);

    useEffect(() => {
        const fetchData = () => {
            axios.get('https://web-production-ad96.up.railway.app/api/v1/users/top/').then((r) => {
                setLeaders(r.data);
        }
            ).catch((err) => console.log(err));
        }
        fetchData();
    })

    const handleLoadMore = () => {
        setDisplayedLeaders(displayedLeaders + 4);
    };

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
                            Leaderboard
                        </h1>
                    </div>

                    <p className={" font-bold px-3 sm:p-0"}>
                        See where you stand among culinary enthusiasts! Track
                        your progress, compare<br></br> scores, and strive for
                        the top spot in the ultimate culinary rankings.
                    </p>
                </div>
                <div className="w-full flex flex-col items-center">
                    {leaders && leaders.slice(0, displayedLeaders).map((leader, index) => (
                        <LeadersCard index={index} key={index} isLeader={index < 3} name={`${leader.first_name} ${leader.last_name}`} score={leader.score} />
                    ))
                    }
                </div>
                <div className="w-[250px] md:w-[900px]">
                    <button onClick={handleLoadMore} className="text-white  bg-[#AAE06E] self-start w-[250px] h-[48px] rounded-3xl text-lg font-bold mb-20 mt-10">
                        Load More
                    </button>
                </div>
            </div>
        </MainContainer>
    );
};

export default Leaderboard;
