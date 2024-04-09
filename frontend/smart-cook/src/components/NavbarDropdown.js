import React from "react";
import { useState } from "react";
import defaultAvatar from "../../public/images/avatarka.png";
import coin from "../../public/images/coin.png";
import Image from "next/image";
import Link from "next/link";

const NavbarDropdown = ({ photo, name, surname, score }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const avatar = null;

    return (
        <div className="w-[333px] h-[281px] text-white flex flex-col items-center bg-[#2A293B] absolute top-14 right-0 rounded-2xl">
            <div className="w-[285px] flex flex-col ">
                <Link href={"/profile"} className="flex mt-10 ">
                    <div className="w-[285px] h-[50px] rounded-full flex space-x-5">
                        {photo ? (
                            <div className="w-[50px] h-[50px]">
                                <Image
                                    src={photo}
                                    className="w-[50px] h-[50px] object-cover"
                                    alt="avatar"
                                    width={50}
                                    height={50}
                                />
                            </div>
                        ) : (
                            <div className="w-[50px] h-[50px]">
                                <Image
                                    className="-mt-1"
                                    src={defaultAvatar}
                                    alt="Default Avatar"
                                    width={50}
                                    height={50}
                                />
                            </div>
                        )}
                        <div className=" ">
                            <div className="flex">
                                {name} {surname}
                            </div>
                            <div className="flex">
                                <Image
                                    src={coin}
                                    className="w-[16px] h-[16px]"
                                    alt="coin"
                                />
                                &nbsp; {score}
                            </div>
                        </div>
                    </div>
                </Link>

                <div className="w-[282px] h-[2px] mt-4 mb-2 bg-gray-200"></div>

                <Link
                    className="self-start w-[282px] text-start py-1 rounded-xl hover:bg-slate-500 "
                    href={"/profile"}
                >
                    Profile
                </Link>
                <div className="w-[282px] h-[2px] my-2 bg-gray-200"></div>

                <Link
                    className="self-start w-[282px] text-start py-1 rounded-xl hover:bg-slate-500 "
                    href={"/profile"}
                >
                    My Recipe
                </Link>
                <div className="w-[282px] h-[2px] my-2 bg-gray-200"></div>

                <Link
                    onClick={() => {
                        localStorage.removeItem("accessToken");

                        // Reload the page
                        window.location.reload();
                    }}
                    className="self-start w-[282px] text-start py-1 rounded-xl hover:bg-slate-500 "
                    href={"/"}
                >
                    Log out
                </Link>
            </div>
        </div>
    );
};

export default NavbarDropdown;
