import Image from 'next/image';
import cookBattle from "../../../../../public/images/cookBattle.png"

const DeclinedBattle = () => {
    return (
        <div className="w-[574px] h-[546px] rounded-3xl text-white bg-[#2A293B] flex flex-col items-center justify-center">
            <Image src={cookBattle} alt="Cook Battle" className='w-[80px] h-[80px]' />
            <div className='mt-2 text-md'>Culinary clash 145</div>
            <div className='text-xl mt-3 font-bold'>Vegetable sweet pastries</div>
            <div className='mt-2 text-[#F20A0AF7] text-lg'>Challenge Declined</div>
            <div className='mt-2 text-center text-md'>Your opponent has declined the challenge. Keep honing <br></br> your skills and exploring new culinary adventures. The <br></br>kitchen awaits your next challenge!</div>
        </div>

    )
}

export default DeclinedBattle;