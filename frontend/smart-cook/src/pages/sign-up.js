import "../app/globals.css";
import logo from "../../public/images/SmartCookLogo.png";
import Image from "next/image";
import Link from "next/link";

const SignUp = () => {
    return (
        <div className="w-full flex flex-col items-center bg-[#2A293B] min-h-screen ">
            <Image src={logo} alt="logo" className="w-[300px] mt-6 mb-8" />
            <div className="w-[450px] h-[556px] bg-white rounded-xl flex justify-center">
                <div className="w-8/12 mt-8 flex flex-col">
                    <h1 className="text-lg font-bold">Sign up</h1>
                    <p className="text-xs mt-1">
                        Already have an account?
                        <Link href="/sign-in" className="text-[#80CC2D] hover:border-b-[#AAE06E] border-white border-b-2">&nbsp;Log in&nbsp;</Link>
                    </p>
                    <p className="text-sm mt-5">First name</p>
                    <input
                        id="name"
                        className="w-full rounded-3xl border-2 h-10 shadow-gray-500 text-xs p-3 mt-2"
                        placeholder="name"
                        type="name"
                        // value={field}
                        // onChange={(e) => setField(e.target.value)}
                    />
                    <p className="text-sm mt-5">Last name</p>
                    <input
                        id="surname"
                        type="surname"
                        className="w-full rounded-3xl border-2 h-10 shadow-gray-500 text-xs p-3 mt-2"
                        placeholder="surname"
                        
                    />
                    <p className="text-sm mt-5">Email</p>
                    <input
                        id="email"
                        className="w-full rounded-3xl border-2 h-10 shadow-gray-500 text-xs p-3 mt-2"
                        placeholder="your.email@gmail.com"
                        type="email"
                        // value={field}
                        // onChange={(e) => setField(e.target.value)}
                    />
                    <p className="text-sm mt-5">Creat a password</p>
                    <input
                        id="password"
                        type="password"
                        className="w-full rounded-3xl border-2 h-10 shadow-gray-500 text-xs p-3 mt-2"
                        placeholder="password"
                        
                    />
                    <p className="text-[#80CC2D] text-xs mt-2 self-end border-b-2 border-white cursor-pointer hover:border-b-[#AAE06E]">Forgot password?</p>
                    <button className="text-white bg-[#AAE06E] w-full h-10 rounded-3xl mt-5">Log in</button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
