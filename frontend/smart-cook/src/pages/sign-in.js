import "../app/globals.css";
import logo from "../../public/images/SmartCookLogo.png";
import Image from "next/image";
import cook from "../../public/images/cook.png";
import cooker from "../../public/images/cooker.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../../config";
import show from "../../public/images/show.png"
import hide from "../../public/images/hide.png"

const SignIn = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            const requestBody = {
                email: email,
                password: password,
            };
            setIsLoading(true);
            axios
                .post(`${config.baseUrl}/api/v1/login/`, requestBody)
                .then((res) => {
                    localStorage.setItem("accessToken", res.data.access);
                    localStorage.setItem("refreshToken", res.data.refresh);
                    window.location.href = "/";
                })
                .catch((error) => {
                    console.error(error);
                    if (
                        error.response &&
                        error.response.data &&
                        error.response.data.error
                    ) {
                        setErrorMessage(error.response.data.error);
                    }
                });
            setIsLoading(false);
        }
    };

    const validate = () => {
        let error = "";

        if (!validateEmail(email)) {
            error = "Please enter a valid email address.";
        } else if (password.length < 6) {
            error = "Password must be at least 6 characters long.";
        }

        setErrorMessage(error);
        return !error;
    };

    const validateEmail = (email) => {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    return (
        <div className="w-full flex flex-col items-center bg-[#2A293B] min-h-screen ">
            <Image
                src={cook}
                alt="cook"
                className="w-[350px] mt-6 mb-8 absolute left-20 top-72"
            />
            <Image
                src={cooker}
                alt="cook"
                className="w-[120px] mt-6 mb-8 absolute right-52 top-72"
            />
            <Image src={logo} alt="logo" className="w-[300px] mt-6 mb-8" />
            <div className="w-[450px] py-8 bg-white rounded-xl flex justify-center">
                <div className="w-8/12 text-black flex flex-col">
                    <h1 className="text-lg text-black font-bold">Log in</h1>
                    <p className="text-xs mt-1">
                        New user?
                        <Link
                            href="/sign-up"
                            className="text-[#80CC2D] hover:border-b-[#AAE06E] border-white border-b-2"
                        >
                            &nbsp;Sign up&nbsp;
                        </Link>
                    </p>
                    {errorMessage && (
                        <p className="text-red-500 text-xs mt-2">
                            {errorMessage && errorMessage}
                        </p>
                    )}
                    <p className="text-sm mt-5">Enter your email</p>
                    <input
                        id="email"
                        className={`w-full rounded-3xl border-2 h-10 shadow-gray-500 text-xs p-3 mt-2 ${
                            !validateEmail(email) && "border-red-500"
                        }`}
                        placeholder="your.email@gmail.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <p className="text-sm mt-5">Enter your password</p>
                    <div className="relative">
                        <input
                            id="password"
                            className={`w-full rounded-3xl border-2 h-10 shadow-gray-500 text-xs p-3 mt-2 ${
                                password.length < 6 && "border-red-500"
                            }`}
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={passwordShown ? 'text' : 'password'}
                        />
                        {
                            passwordShown ? (
                                <Image onClick={() => setPasswordShown(false)} src={hide} alt="eye_closed" className="w-[20px] h-[20px] absolute top-[18px] right-3"/>
                            ) : (
                                <Image onClick={() => setPasswordShown(true)} src={show} alt="eye" className="w-[20px] h-[20px] absolute top-[18px] right-3" />
                            )
                        }
                    </div>

                    <Link
                        passHref={true}
                        className="text-[#80CC2D] text-xs mt-2 self-end border-b-2 border-white cursor-pointer hover:border-b-[#AAE06E]"
                        href={`/forgot-password`}
                    >
                        Forgot password?
                    </Link>
                    <button
                        className={`text-white bg-[#AAE06E] w-full h-10 rounded-3xl mt-5 ${
                            errorMessage && "disabled"
                        }`}
                        onClick={handleSubmit}
                    >
                        Log in
                    </button>
                </div>
            </div>
        </div>
    );
};
export default SignIn;
