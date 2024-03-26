import "../app/globals.css";
import logo from "../../public/images/SmartCookLogo.png";
import Image from "next/image";
import Link from "next/link";

const ForgotPassword = () => {
    return (
        <div className="w-full flex flex-col items-center bg-[#2A293B] min-h-screen ">
            <Image src={logo} alt="logo" className="w-[300px] mt-6 mb-24" />
            <div className="w-[450px] h-[326px] bg-white rounded-xl flex justify-center">
                <div className="w-8/12 mt-8 flex flex-col">
                    <h1 className="text-2xl font-bold">Forgot password</h1>
                    <p className="text-xs mt-1">
                        New user?
                        <Link href="/sign-up" className="text-[#80CC2D] hover:border-b-[#AAE06E] border-white border-b-2">&nbsp;Sign up&nbsp;</Link>
                    </p>
                    
                    <p className="text-sm mt-5">Email</p>
                    <input
                        id="email"
                        className="w-full rounded-3xl border-2 h-10 shadow-gray-500 text-xs p-3 mt-2"
                        placeholder="your.email@gmail.com"
                        type="email"
                    />
                    
                 
                    <button className="text-white bg-[#AAE06E] w-full h-10 rounded-3xl mt-10">Send</button>
                    <p className="text-xs mt-1 self-center mt-5">
                        Return to
                        <Link href="/sign-in" className="text-[#80CC2D] hover:border-b-[#AAE06E] border-white border-b-2">&nbsp;Log in&nbsp;</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
