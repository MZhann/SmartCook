import { useState, useEffect } from "react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import defaultAvatar from "../../../public/images/avatarka.png";
import AIchef from "../../components/awards/AIchef";
import IDidIt from "../../components/awards/IDidIt";
import Superstar from "../../components/awards/Superstar";
import Statistics from "../../components/profile-page/Statistics"

const axios = require("axios");

const UserInfo = ({ id }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(
                    `https://web-production-ad96.up.railway.app/api/v1/users/${id}/`
                );
                setUser(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserData();
    }, [id]); // Ensure fetchUserData runs when id changes

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col z-50">
            <div
                className={
                    "md:w-[278px] flex flex-col w-full h-full  md:p-5  rounded-3xl"
                }
            >
                <Link href={"/profile"} className="flex  mb-3">
                    <div className="w-[285px]  rounded-full flex space-x-5">
                        <div className="flex flex-col justify-start h-full space-y-2">
                            {user.photo ? (
                                <div className="w-[100px] h-[100px]">
                                    <Image
                                        src={user.photo}
                                        className="rounded-full w-[100px] h-[100px] object-cover "
                                        alt="avatar"
                                        width={100}
                                        height={100}
                                    />
                                </div>
                            ) : (
                                <div className="w-[100px] h-[100px]">
                                    <Image
                                        className="-mt-1 rounded-full object-cover w-[100px] h-[100px]"
                                        src={defaultAvatar}
                                        alt="Default Avatar"
                                        width={100}
                                        height={100}
                                    />
                                </div>
                            )}
                            <div className="flex flex-col items-start">
                                <div className="flex text-left font-bold text-3xl text-[#2a293b] ">
                                    {user.first_name} {user.last_name}
                                </div>
                                <div className="text-gray-600">
                                    {user.email}
                                </div>
                            </div>
                            <div className="text-green-700">Awards</div>
                            <div className="flex space-x-2">
                                <div className={`flex flex-row  gap-4 mt-1`}>
                                    {user?.awardBurger && <IDidIt />}
                                    {user?.top_ten_achievement && <Superstar />}
                                    {user?.awardBake && <AIchef />}

                                    {user?.awardBurger !== false &&
                                    user?.top_ten_achievement !== false &&
                                    user?.awardBake !== false ? null : (
                                        <div className="text-white text-xs">
                                            There are no awards yet
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <div>
              <Statistics user={user} />
            </div>
        </div>
    );
};

export default UserInfo;
