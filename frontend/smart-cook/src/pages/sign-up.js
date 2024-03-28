import "../app/globals.css";
import logo from "../../public/images/SmartCookLogo.png";
import Image from "next/image";
import cook from "../../public/images/cook.png";
import cooker from "../../public/images/cooker.png";
import Link from "next/link";
import {useState} from "react";
import axios from "axios";
import {config} from "../../config";

const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [phone, setPhone] = useState("");

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
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            const requestBody = {
                first_name: name,
                phone_number: phone,
                email: email,
                password: password
            };

            try {
                setIsLoading(true);
                await axios.post(`http://127.0.0.1:8000/api/v1/register/`, requestBody)
                setIsLoading(false);
                window.location.href = '/sign-in'
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    setErrorMessage(error.response.data.error)
                }
                console.error(error);
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
            <div className="w-[450px] py-8 bg-white rounded-xl flex justify-center">
                <div className="w-8/12 flex flex-col">
                    <h1 className="text-lg font-bold">Sign up</h1>
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
                        <p className="text-red-500 text-xs mt-2">{errorMessage}</p>
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
                    <p className="text-sm mt-5">Email</p>
                    <input
                        id="email"
                        className={`w-full rounded-3xl border-2 h-10 shadow-gray-500 text-xs p-3 mt-2`}
                        placeholder="your.email@gmail.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <p className="text-sm mt-5">Phone</p>
                    <input
                        id="email"
                        className={`w-full rounded-3xl border-2 h-10 shadow-gray-500 text-xs p-3 mt-2`}
                        placeholder="your.email@gmail.com"
                        type="email"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <p className="text-sm mt-5">Create a password</p>
                    <input
                        id="password"
                        type="password"
                        className={`w-full rounded-3xl border-2 h-10 shadow-gray-500 text-xs p-3 mt-2 `}
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <p className="text-[#80CC2D] text-xs mt-2 self-end border-b-2 border-white cursor-pointer hover:border-b-[#AAE06E]">
                        <Link href={'/forgot-password'}>
                            Forgot password?
                        </Link>
                    </p>
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