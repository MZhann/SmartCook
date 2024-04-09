import Image from "next/image";
import logo from "../../public/images/SmartCookLogo.png";
import blogo from "../../public/images/blac-logo.png";
import Link from "next/link";
import defaultAvatar from "../../public/images/avatarka.png";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { config } from "../../config";
import NavbarDropdown from "./NavbarDropdown";

const Navbar = () => {
    const router = useRouter();

    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        photo: null,
    });

    useEffect(() => {
        const fetchUserData = async () => {
            const accessToken = localStorage.getItem("accessToken");
            setIsLoggedIn(accessToken !== null);

            try {
                if (!accessToken) {
                    throw new Error("Access token not found in localStorage");
                }

                const response = await fetch(
                    `${config.baseUrl}/api/v1/user/profile/`,
                    {
                        headers: {
                            Authorization: "Bearer " + accessToken,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch user profile data");
                }

                const userData = await response.json();
                const { first_name, last_name, photo } = userData;

                // Update state with the fetched data (only saving required fields)
                setUserData({
                    firstName: first_name,
                    lastName: last_name,
                    photo: photo,
                });

                console.log(userData);
            } catch (error) {
                console.error("Error fetching user profile data:", error);
            }
        };
        fetchUserData();
    }, []);

    return (
        <div className="w-full flex items-center justify-between z-10 mt-5">
            <Link href="/">
                <Image
                    src={
                        router.pathname === "/profile" ||
                        router.pathname === "/challenges" ||
                        router.pathname === "/leaderboard"
                            ? blogo
                            : logo
                    }
                    alt="logo"
                    className="w-[150px]"
                />
            </Link>
            <div
                className={`flex space-x-5 ${
                    router.pathname === "/" ||
                    router.pathname === "/profile" ||
                    router.pathname === "/challenges" ||
                    router.pathname === "/leaderboard"
                        ? "text-black"
                        : "text-white"
                }`}
            >
                <Link href="/all-receipts">ALL RECIPES</Link>
                <Link href="/ai-receipts">AI RECIPES</Link>
                <Link href="/challenges">CHALLENGES</Link>
                <Link href="/leaderboard">LEADERBOARD</Link>
                {!isLoggedIn ? (
                    <Link href={"/sign-in"}>
                        <svg
                            className={"-mt-1"}
                            width={30}
                            height={30}
                            viewBox="0 0 21 21"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g
                                fill="none"
                                fill-rule="evenodd"
                                stroke={
                                    router.pathname === "/" ||
                                    router.pathname === "/profile" ||
                                    router.pathname === "/challenges" ||
                                    router.pathname === "/leaderboard"
                                        ? "#000000"
                                        : "white"
                                }
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                transform="translate(3 3)"
                            >
                                <path d="m6.5 10.5 3-3-3-3" />
                                <path
                                    d="m5 3v9"
                                    transform="matrix(0 1 -1 0 12.5 2.5)"
                                />
                                <path d="m1.5 5.5v-3.0079176c0-1.10147263.89060277-1.99561512 1.99206673-1.99998427l7.95228497-.03160773c1.1045608-.00432011 2.0035361.8875515 2.0079175 1.99211231l.0398162 10.02918369c.0043323 1.1045608-.8875404 2.003535-1.9921012 2.0079309-.0026436 0-.0052873 0-.0079309 0h-7.9920533c-1.1045695 0-2-.8954305-2-2v-2.9897173" />
                            </g>
                        </svg>
                    </Link>
                ) : (
                    <button onClick={() => {setIsProfileDropdownOpen(!isProfileDropdownOpen)}}>
                        {isProfileDropdownOpen && <NavbarDropdown photo={userData.photo} name={userData.firstName} surname={userData.lastName} score={250} /> }
                        {userData.photo ? (
                            <Image
                                className="-mt-1"
                                src={userData.photo}
                                alt="User Photo"
                                width={30}
                                height={30}
                            />
                        ) : (
                            <Image
                                className="-mt-1"
                                src={defaultAvatar}
                                alt="Default Avatar"
                                width={30}
                                height={30}
                            />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
