import Image from 'next/image';
import win from "../../../public/images/win.jpg";


const YouWon = () => {
    return (
        <div
            className={
                " flex flex-col gap-5 w-[500px] h-[435px] bg-white rounded-2xl justify-center items-center text-center"
            }
        >
            <Image
                className={"flex justify-center"}
                src={win}
                width={150}
                height={150}
                alt={"win"}
            />
            <h1 className={"text-2xl font-bold"}>Congratulations!</h1>
            <p>
                You have won <span className={"text-[#80CC2D]"}>+1 chance</span>{" "}
                for additional recipe<br></br> generation! Use it when you&apos;re ready.
            </p>
        </div>
    );
};

export default YouWon;
