import Image from "next/image";
import logo from "../../public/images/SmartCookLogo.png";
import Link from "next/link";
import enter from "../../public/images/enter.png";


const Navbar = () => {
    return (
        <div className="w-full flex items-center justify-between z-10 mt-5">
            <Image src={logo} alt="logo" className="w-[150px]" />
            <div className="flex space-x-5">
                <Link href="#">ALL RECIPES</Link>
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
