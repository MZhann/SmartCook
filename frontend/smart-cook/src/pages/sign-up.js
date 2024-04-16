import "../app/globals.css";
import logo from "../../public/images/SmartCookLogo.png";
import Image from "next/image";
import cook from "../../public/images/cook.png";
import cooker from "../../public/images/cooker.png";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { config } from "../../config";
import show from "../../public/images/show.png";
import hide from "../../public/images/hide.png";
import loading from "../../public/loading.gif";
import { useRouter } from "next/router";
import { isEmailValid, isPasswordValid } from "../utils/validation";

const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [phone, setPhone] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);

    const isPasswordValidated = isPasswordValid(password);
    const isEmailValidated = isEmailValid(email);

    const router = useRouter();

    const isEmailValidOnChange = (value) => {
        setEmail(value);
        setEmailTouched(true);
    };

    const isPasswordValidOnChange = (value) => {
        setPassword(value);
        setPasswordTouched(true);
    };

    async function handleLogin() {
        const requestBody = {
            email: email,
            password: password,
        };

        try {
            setIsLoading(true);
            const response = await axios.post(
                `${config.baseUrl}/api/v1/login/`,
                requestBody
            );
            localStorage.setItem("accessToken", response.data.access);
            localStorage.setItem("refreshToken", response.data.refresh);
            setIsLoading(false);
            router.push("/");
        } catch (error) {
            setIsLoading(false);
            console.error(error);
            if (
                error.response &&
                error.response.data &&
                error.response.data.error
            ) {
                setErrorMessage(error.response.data.error);
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isEmailValidated || !isPasswordValidated) {
            setErrorMessage("Please check your email and password.");
            return;
        }

        const requestBody = {
            first_name: name,
            last_name: surname,
            email: email,
            password: password,
        };

        setIsLoading(true);
        try {
            await axios.post(`${config.baseUrl}/api/v1/register/`, requestBody);
            setIsLoading(false);
            handleLogin();
        } catch (error) {
            setIsLoading(false);
            console.error(error);
            if (
                error.response &&
                error.response.data &&
                error.response.data.error
            ) {
                setErrorMessage(error.response.data.error);
            }
        }
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
            <div className="w-[450px] text-black py-8 bg-white rounded-xl flex justify-center">
                <div className="w-8/12 flex flex-col">
                    <h1 className="text-lg text-black font-bold">Sign up</h1>
                    <p className="text-xs mt-1">
                        Already have an account?
                        <Link
                            href="/sign-in"
                            className="text-[#80CC2D] hover:border-b-[#AAE06E] border-white border-b-2"
                        >
                            &nbsp;Log in&nbsp;
                        </Link>
                    </p>
                    {errorMessage && (
                        <p className="text-red-500 text-xs mt-2">
                            {errorMessage}
                        </p>
                    )}
                    <p className="text-sm mt-5">First name</p>
                    <input
                        id="name"
                        className="w-full rounded-3xl border-2 h-10 shadow-gray-500 text-xs p-3 mt-2"
                        placeholder="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <p className="text-sm mt-5">Last name</p>
                    <input
                        id="surname"
                        className="w-full rounded-3xl border-2 h-10 shadow-gray-500 text-xs p-3 mt-2"
                        placeholder="surname"
                        type="text"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                    <p className="text-sm mt-5">Email</p>
                    <input
                        id="email"
                        className={`w-full rounded-3xl border-2 h-10 shadow-gray-500 text-xs p-3 mt-2 ${
                            emailTouched && !isEmailValidated
                                ? "border-red-500"
                                : ""
                        }`}
                        placeholder="your.email@gmail.com"
                        type="email"
                        value={email}
                        onChange={(e) => isEmailValidOnChange(e.target.value)}
                    />
                    <p className="text-sm mt-5">Create a password</p>
                    <div className="relative">
                        <input
                            id="password"
                            className={`w-full rounded-3xl border-2 h-10 shadow-gray-500 text-xs p-3 mt-2 ${
                                passwordTouched && !isPasswordValidated
                                    ? "border-red-500"
                                    : ""
                            }`}
                            placeholder="password"
                            type={passwordShown ? "text" : "password"}
                            value={password}
                            onChange={(e) =>
                                isPasswordValidOnChange(e.target.value)
                            }
                        />
                        {passwordShown ? (
                            <Image
                                onClick={() => setPasswordShown(false)}
                                src={hide}
                                alt="eye_closed"
                                className="cursor-pointer w-[20px] h-[20px] absolute top-[18px] right-3"
                            />
                        ) : (
                            <Image
                                onClick={() => setPasswordShown(true)}
                                src={show}
                                alt="eye"
                                className="cursor-pointer w-[20px] h-[20px] absolute top-[18px] right-3"
                            />
                        )}
                    </div>

                    {isLoading ? (
                        <Image
                            src={loading}
                            alt="loading"
                            className="mt-3 w-[20px] h-[20px]"
                        />
                    ) : (
                        ""
                    )}

                    <button
                        className={`text-white bg-[#AAE06E] w-full h-10 rounded-3xl mt-5 ${
                            isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
