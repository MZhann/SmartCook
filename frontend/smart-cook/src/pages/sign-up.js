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
import {useRouter} from "next/router";

const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [phone, setPhone] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const [isPasswordValidated, setIsPasswordValidated] = useState(true);
    const validate = () => {
        let error = "";

        if (!name) {
            error = "Please enter your first name.";
        } else if (!validateEmail(email)) {
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValidPassword = (password) =>
            /^[A-Za-z](?=.*\d)[A-Za-z\d]{7,39}$/.test(password);

        console.log(isValidPassword(password));
        if (isValidPassword(password)) {
            setIsPasswordValidated(true);
        } else {
            setIsPasswordValidated(false);
            return;
        }

        if (validate()) {
            const requestBody = {
                first_name: name,
                last_name: phone,
                email: email,
                password: password,
            };

            try {
                setIsLoading(true);
                await axios
                    .post(`${config.baseUrl}/api/v1/register/`, requestBody)
                    .then((res) => {
                        localStorage.setItem("accessToken", res.data.access);
                        localStorage.setItem("refreshToken", res.data.refresh);
                    });
                setIsLoading(false);
                await handleLogin();
            } catch (error) {
                setIsLoading(false);
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.error
                ) {
                    setErrorMessage(error.response.data.error);
                }
                console.error(error);
            }
        }
    };
    const router = useRouter();
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

            // Redirect to home page
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
                        className={`w-full rounded-3xl border-2 h-10 shadow-gray-500 text-xs p-3 mt-2`}
                        placeholder="name"
                        type="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <p className="text-sm mt-5">Last name</p>
                    <input
                        id="last_name"
                        className={`w-full rounded-3xl border-2 h-10 shadow-gray-500 text-xs p-3 mt-2`}
                        placeholder="surname"
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <p className="text-sm mt-5">Email</p>
                    <input
                        id="email"
                        className={`w-full rounded-3xl border-2 h-10 shadow-gray-500 text-xs p-3 mt-2`}
                        placeholder="your.email@gmail.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <p className="text-sm mt-5">Create a password</p>
                    <div className="relative">
                        <input
                            id="password"
                            className={`w-full rounded-3xl border-2 h-10 shadow-gray-500 text-xs p-3 mt-2 ${
                                password.length < 6 && "border-red-500"
                            }`}
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={passwordShown ? "text" : "password"}
                        />
                        {passwordShown ? (
                            <Image
                                onClick={() => setPasswordShown(false)}
                                src={hide}
                                alt="eye_closed"
                                className="w-[20px] h-[20px] absolute top-[18px] right-3"
                            />
                        ) : (
                            <Image
                                onClick={() => setPasswordShown(true)}
                                src={show}
                                alt="eye"
                                className="w-[20px] h-[20px] absolute top-[18px] right-3"
                            />
                        )}
                        {!isPasswordValidated ? (
                            <div className="text-red-600 text-xs mt-2">
                                Password should be more than 8 and less than 40
                                symbols, start with capital letter and contain
                                at least one number
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>

                    <div className="flex justify-between items-center">
                        {isLoading ? (
                            <Image
                                src={loading}
                                alt="loading"
                                className="w-[20px] h-[20px]"
                            />
                        ) : (
                            <></>
                        )}
                        <p className="text-[#80CC2D] text-xs mt-2 self-end border-b-2 border-white cursor-pointer hover:border-b-[#AAE06E]">
                            <Link href={"/forgot-password"}>
                                Forgot password?
                            </Link>
                        </p>
                    </div>

                    <button
                        className={`text-white bg-[#AAE06E] w-full h-10 rounded-3xl mt-5 ${
                            errorMessage && "disabled" // Disable button if there's an error
                        }`}
                        onClick={handleSubmit}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
