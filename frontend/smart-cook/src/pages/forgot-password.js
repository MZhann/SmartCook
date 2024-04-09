import "../app/globals.css";
import logo from "../../public/images/SmartCookLogo.png";
import Image from "next/image";
import Link from "next/link";
import cook from "../../public/images/cook.png";
import cooker from "../../public/images/cooker.png";
import axios from "axios";
import {useState} from "react";

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [code, setCode] = useState(null)
    const [password, setPassword] = useState(null)
    const [inputs, setInputs] = useState('email')
    const handleSendEmail = () => {
        try {
            const res = axios.post('https://web-production-ad96.up.railway.app/api/v1/password-reset-request/', {
                email: email
            })
            console.log(res)
            setTimeout(() => {
                setInputs('code')
            },[3000])
        } catch (err) {
            console.error(err)
        }
    }
    const handleConfirm = () => {
        try {
            const res = axios.post('https://web-production-ad96.up.railway.app/api/v1/password-reset-confirm/', {
                reset_token: code,
                new_password: password
            })
            console.log(res)
            setTimeout(() => {
                window.location.href = '/sign-in'
            },[2000])
        } catch (err) {
            console.error(err)
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

            <Image src={logo} alt="logo" className="w-[300px] mt-6 mb-24" />
            <div className="w-[450px] py-4 bg-white rounded-xl flex justify-center">
                <div className="w-8/12 mt-8 flex flex-col">
                    <h1 className="text-2xl font-bold">Forgot password</h1>
                    <p className="text-xs mt-1">
                        New user?
                        <Link
                            href="/sign-up"
                            className="text-[#80CC2D] hover:border-b-[#AAE06E] border-white border-b-2"
                        >
                            &nbsp;Sign up&nbsp;
                        </Link>
                    </p>

                    {inputs === 'email' ?
                        <>
                            <p className="text-sm mt-5">Email</p>
                            <input
                                id="email"
                                className="w-full rounded-3xl border-2 h-10 shadow-gray-500 text-xs p-3 mt-2"
                                placeholder="your.email@gmail.com"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </> :
                        <>
                            <p className="text-sm mt-5">Code</p>
                            <input
                                id="code"
                                className="w-full rounded-3xl border-2 h-10 shadow-gray-500 text-xs p-3 mt-2"
                                placeholder="Enter code from email"
                                type="text"
                                onChange={(e) => setCode(e.target.value)}
                            />
                            <p className="text-sm mt-5">New password</p>
                            <input
                                id="email"
                                className="w-full rounded-3xl border-2 h-10 shadow-gray-500 text-xs p-3 mt-2"
                                placeholder="*******************"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </>
                    }

                    {inputs === 'email' ?
                        <button onClick={handleSendEmail}
                                className={` text-white bg-[#AAE06E] w-full h-10 rounded-3xl mt-10`}>
                            send
                        </button> :
                        <button onClick={handleConfirm}
                                className={` text-white bg-[#AAE06E] w-full h-10 rounded-3xl mt-10`}>
                            Confirm
                        </button>
                    }
                    <p className="text-xs mt-1 self-center mt-5">
                        Return to
                        <Link
                            href="/sign-in"
                            className="text-[#80CC2D] hover:border-b-[#AAE06E] border-white border-b-2"
                        >
                            &nbsp;Log in&nbsp;
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
