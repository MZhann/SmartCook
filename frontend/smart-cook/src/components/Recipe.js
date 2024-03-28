import React from "react";
import Image from "next/image";
import food from "../../public/images/food1.png";
import person from "../../public/images/person1.png";
import like from "../../public/images/like.png";
import saved from "../../public/images/saved.png";
import notSaved from "../../public/images/notSaved.png";

const Recipe = () => {
    return (
        <div className="w-[280px] h-[317px] bg-white rounded-lg my-5">
            <div className="w-full h-[210px] relative">
                <div className="absolute right-2 top-2">
                    <Image src={notSaved} alt="saved"/>
                </div>
                <Image src={food} alt="Food" />
            </div>
            <div className="w-full h-[107px] rounded-b-lg p-4">
                <div className="flex items-center">
                    <Image src={person} className="mr-2 rounded-5xl" alt="profile avatar"/>
                    <div className="text-xs">Asylym Aydarkyzy</div>
                </div>
                <div className=" mt-1 text-sm">Salad with tuna and sour cream</div>
                <div className="flex items-center mt-2">
                    <Image className="w-[16px] h-[15px] mr-2" src={like} alt="likeImg"/>
                    <div>2</div>
                </div>
            </div>
        </div>
    )
}

export default Recipe;