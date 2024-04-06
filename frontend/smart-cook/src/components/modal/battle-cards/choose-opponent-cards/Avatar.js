import Image from "next/image";

const Avatar = ({ image, name }) => {
    return (
        
        <button className="flex flex-col items-center justify-between mx-2  hover:mt-[-10px]">
            <Image
                src={image}
                alt="avatar"
                className="mb-3 w-[70px] h-[70px] rounded-full"
            />
            <div className="text-[11px] font-bold text-center flex flex-col w-[70px] break-words ">
                {name.split(" ").map((part, index) => (
                    <span key={index} className="whitespace-nowrap">
                        {part}
                    </span>
                ))}
            </div>
        </button>
    );
};

export default Avatar;
