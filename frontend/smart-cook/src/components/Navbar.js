import Image from "next/image";
import logo from "../../public/images/SmartCookLogo.png";
import Link from "next/link";
import enter from "../../public/images/enter.png";
import {useRouter} from "next/router";


const Navbar = ({loggedin, textcolor}) => {
    const router = useRouter();
   
    return (
        <div className="w-full flex items-center justify-between z-10 mt-5">
            <Link href="/main">
                <Image  src={logo} alt="logo" className="w-[150px]" />
            </Link>
            <div className={`flex space-x-5 ${router.pathname !== '/' ? 'text-white' : 'text-black'}`}>
                <Link href="">ALL RECIPES</Link>
                <Link href="#">AI RECIPES</Link>
                <Link href="#">CHALLENGES</Link>
                <Link href="#">LEADERBOARD</Link>
                <Link href={'/sign-in'}>
                    <Image src={enter} className="w-[25px]" alt="log in" />
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
