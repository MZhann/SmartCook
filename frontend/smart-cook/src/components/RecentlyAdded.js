import React from "react";
import Recipe from "./Recipe";


const RecentlyAdded = () => {
    return (
        <div className="mt-32 flex flex-col">
            <div className="text-white text-4xl ">Recently added recipes</div>
            <div className="mt-10 flex justify-between flex-wrap">
                <Recipe />
                <Recipe />
                <Recipe />
                <Recipe />
                <Recipe />
                <Recipe />
                <Recipe />
                <Recipe />
            </div>
            <button className="w-max text-white px-16 font-bold py-2 mt-4 rounded-3xl tracking-wide bg-[#AAE06E]">Load More</button>
        </div>
    )
}

export default RecentlyAdded;