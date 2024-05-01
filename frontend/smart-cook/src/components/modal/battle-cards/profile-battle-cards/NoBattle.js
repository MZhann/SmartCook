import Image from 'next/image';
import cookBattle from "../../../../../public/images/cookBattle.png"

const NoBattle = () => {
    return (
        
        <div className="w-full sm:max-w-[574px] sm:min-h-[546px] h-[400px] sm:h-auto rounded-3xl text-white bg-[#2A293B] flex flex-col items-center justify-evenly mb-4">
            <Image src={cookBattle} alt="Cook Battle" className='w-[80px] h-[80px]' />
            <div className='text-lg mt-3'>Currently no Culinary Battles available</div>
            <div className='text-md text-gray-400 mt-2'>Currently not participating in any Culinary Battles</div>
        </div>
    )
}

export default NoBattle;