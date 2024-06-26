import MainContainer from "@/components/MainContainer";
import Navbar from "@/components/Navbar";
import defaultAvatar from "../../public/images/avatarka.png";
import Image from "next/image";
import logout from "../../public/images/Logout.png";
import WaitingOpponent from "@/components/modal/battle-cards/profile-battle-cards/WaitingOpponent";
import Statistics from "@/components/profile-page/Statistics";
import Chooser from "@/components/profile-page/Choose";
import {config} from "../../config.js";
import axios from "axios";
import {useEffect, useState} from "react";
import EditProfile from "@/components/modal/EditProfile";
import NoBattle from "@/components/modal/battle-cards/profile-battle-cards/NoBattle";
import DeclinedBattle from "@/components/modal/battle-cards/profile-battle-cards/DeclinedBattle";
import AcceptedBattle from "@/components/modal/battle-cards/profile-battle-cards/AcceptedBattle";
import AIchef from "../components/awards/AIchef";
import IDidIt from "../components/awards/IDidIt";
import Superstar from "../components/awards/Superstar";
import AcceptDecline from "@/components/modal/battle-cards/profile-battle-cards/AcceptDecline";

const Profile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const [battle, setBattle] = useState(null);

    useEffect(() => {
        const fetchBattle = async () => {
            try {
                const res = await axios.get(
                    `${config.baseUrl}/api/v1/clashes/current/`,
                    {
                        headers: {
                            Authorization:
                                "Bearer " + localStorage.getItem("accessToken"),
                        },
                    }
                );

                setBattle(res.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBattle();
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    useEffect(() => {
        const fetchProfile = () => {
            try {
                axios
                    .get(`${config.baseUrl}/api/v1/user/profile`, {
                        headers: {
                            Authorization:
                                "Bearer " + localStorage.getItem("accessToken"),
                        },
                    })
                    .then((response) => {
                        console.log(response.data);
                        setUserProfile(response.data);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } catch (error) {
                console.error(error);
            }
        };

        fetchProfile();
    }, []);

    return (
        <MainContainer>
            <div className="mx-8 w-full max-w-[1195px] relative flex flex-col items-center">
                <Navbar/>
                <div
                    className={`flex justify-center items-center w-full text-black text-[40px] font-[600] mt-7`}
                >
                    <h1 className={"text-black"}>Profile</h1>
                </div>
                <div
                    className={"flex flex-col w-full flex-wrap lg:flex-row lg:space-x-6 justify-between mt-4 md:justify-center"}>
                    <div
                        className={
                            "flex flex-col mb-4 justify-center items-center w-full  lg:w-[278px] h-[546px] px-6 py-5 bg-[#2A293B] rounded-3xl"
                        }
                    >
                        <div className={`w-full flex flex-col justify-center items-center`}>
                            {userProfile && userProfile.photo ? (
                                <Image
                                    className={
                                        "rounded-full  object-fit border-white border-[3px] h-[101px] w-[101px]"
                                    }
                                    src={userProfile && userProfile?.photo}
                                    width={101}
                                    height={101}
                                    alt={"default"}
                                />
                            ) : (
                                <Image
                                    className={
                                        "rounded-full object-fit border-white border-[3px] h-[101px] w-[101px]"
                                    }
                                    src={defaultAvatar}
                                    alt={"default"}
                                />
                            )}
                        </div>
                        <div className={"w-full flex-col flex gap-0.5 mt-2"}>
                            <div>
                                <h1
                                    className={`text-white text-center  text-[20px] font-[700]`}
                                >
                                    {userProfile?.first_name}{" "}
                                    {userProfile?.last_name}
                                </h1>
                            </div>
                            <div>
                                <p
                                    className={`text-white text-center  text-[12px] font-[400]`}
                                >
                                    {userProfile?.email}
                                </p>
                            </div>
                        </div>
                        <div className={"mt-7 sm:self-center"}>
                            <div>
                                <p
                                    className={`text-white text-[12px] font-[600] -ml-10 mb-3`}
                                >
                                    Awards
                                </p>
                            </div>
                            <div className={`flex flex-row justify-start -ml-10  gap-4 mt-1`}>
                                {userProfile?.awardBurger || userProfile?.top_ten_achievement || userProfile?.awardBake ?
                                    (
                                        <>
                                            {userProfile?.awardBurger && <IDidIt/>}
                                            {userProfile?.top_ten_achievement && <Superstar/>}
                                            {userProfile?.awardBake && <AIchef/>}
                                        </>
                                    ) : (
                                        <div className="text-white text-xs">There are no awards yet</div>
                                    )
                                }
                            </div>
                        </div>
                        <div className={`flex gap-3 flex-col mt-[160px]`}>
                            <button
                                onClick={openModal}
                                className={
                                    "flex bg-white w-[230px] self-center h-[36px] rounded-3xl justify-center items-center"
                                }
                            >
                                <svg
                                    width="17"
                                    height="16"
                                    viewBox="0 0 17 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M0.625 12.5937V15.8749H3.90625L13.5837 6.19744L10.3025 2.91619L0.625 12.5937ZM16.1212 3.65994C16.2024 3.57899 16.2667 3.48284 16.3106 3.37699C16.3545 3.27114 16.3771 3.15766 16.3771 3.04307C16.3771 2.92847 16.3545 2.815 16.3106 2.70915C16.2667 2.60329 16.2024 2.50714 16.1212 2.42619L14.0738 0.378691C13.9928 0.297576 13.8966 0.233222 13.7908 0.189313C13.6849 0.145404 13.5715 0.122803 13.4569 0.122803C13.3423 0.122803 13.2288 0.145404 13.123 0.189313C13.0171 0.233222 12.9209 0.297576 12.84 0.378691L11.2388 1.97994L14.52 5.26119L16.1212 3.65994Z"
                                        fill="#191919"
                                    />
                                </svg>
                                <span className={"ml-2 text-[16px]  font-[500]"}>
                                    Edit profile
                                </span>
                            </button>
                            <button
                                className={
                                    "flex bg-white w-[230px] self-center h-[36px] rounded-3xl justify-center items-center"
                                }
                            >
                                <Image
                                    src={logout}
                                    alt={"lo"}
                                    className={`w-[21px] h-[21px]`}
                                />
                                <span className={"ml-2 text-[16px] font-[500]"}>
                                    Log out
                                </span>
                            </button>
                        </div>
                    </div>
                    {battle &&
                    userProfile &&
                    battle[0]?.status === "pending" &&
                    battle[0]?.initiator.id === userProfile?.id ? (
                        <WaitingOpponent battle={battle[0]} doNotShow={true}/>
                    ) : battle && battle[0]?.initiator !== userProfile?.id && battle[0]?.status === "pending" ? (
                        <AcceptDecline battle={battle[0]}/>
                    ) : battle && battle[0]?.status === "accepted" &&
                    battle[0]?.initiator.id === userProfile?.id ? (
                        battle &&
                        <AcceptedBattle battle={battle[0]}/>
                    ) : battle && battle[0]?.status === "accepted" ? (
                        <AcceptedBattle battle={battle[0]}/>
                    ) : battle && battle[0]?.status === "declined" ? (
                        <DeclinedBattle/>
                    ) : (
                        <NoBattle/>
                    )}
                    <Statistics mt={true} user={userProfile}/>
                    <EditProfile
                        userProfile={userProfile}
                        isModalOpen={isModalOpen}
                        onClose={closeModal}
                        closeModal={closeModal}
                    />
                </div>
                <Chooser userProfile={userProfile}/>
            </div>
        </MainContainer>
    );
};

export default Profile;
