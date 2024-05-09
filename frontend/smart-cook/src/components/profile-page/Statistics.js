import Image from "next/image";
import cookBattle from "../../../public/images/cookBattle.png";
import trophy from "../../../public/images/trophy.png";
import rank from "../../../public/images/ranking.png";
import Link from "next/link";

const Statistics = ({user, mt}) => {
    console.log("user info", user)
    return (
        <div className={`md:w-[278px] self-center md:self-start w-full h-[302px] px-6 py-5 md:p-5 bg-[#2A293B] rounded-3xl xl:mt-0 ${mt && 'mt-[10px]'}`}>
            <div className={'w-full'}>
                <h1 className={`font-[700] text-white text-[20px]`}>Statistics</h1>
            </div>
            <div className={'flex flex-col text-white gap-2 md:gap-0 mt-6'}>
                <div className={'flex flex-row gap-3 items-center'}>
                    <Image src={cookBattle} alt={'cookBattle'} className={'w-[38px] h-[38px]'}/>
                    <div className={`flex flex-row items-center`}><span className={'text-[20px] font-[600]'}>{user?.wins + user?.losses}</span>&nbsp;<span>battles</span></div>
                </div>
                <div className={'flex flex-row gap-3 items-center md:gap-0'}>
                    <Image src={trophy} alt={'cookBattle'} className={'w-[38px] h-[38px]'}/>
                    <div className={`flex flex-row items-center`}><span className={'text-[20px] font-[600] ml-3'}>{user?.wins}</span>&nbsp;<span>win</span></div>
                </div>
                <div className={'flex flex-row gap-3 items-center md:gap-0'}>
                    <div className={'w-[38px]'}><Image src={rank} alt={'cookBattle'}
                                                       className={'w-[35.2px] h-[35.2px]'}/></div>
                    <div className={`flex flex-row items-center`}><span className={'text-[20px] font-[600] ml-3'}>{user?.position}</span>&nbsp;<span>rank</span></div>
                </div>
            </div>
            <Link href={'/challenges'}
                  className={'mt-8 flex bg-[#AAE06E] w-[230px] h-[36px] rounded-3xl justify-center items-center'}>
                <span className={'text-[16px] font-[500] text-white'}>Challenge</span>
            </Link>
        </div>
    );
};

export default Statistics;