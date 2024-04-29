const ScoreInfoCard = () => {
    return (
        <div className="flex w-52 flex-col items-center justify-center p-4 border-[#2a293b] rounded-xl bg-white text-[#2a293b] border-4 ">
            <div className="">win  - <span className="font-bold text-green-500">50</span> points</div>
            <div className="">draw - <span className="font-bold text-green-500">25</span> points</div>
            <div className="">lose - <span className="font-bold text-green-500">5</span> points</div>

        </div>
    )
}

export default ScoreInfoCard;