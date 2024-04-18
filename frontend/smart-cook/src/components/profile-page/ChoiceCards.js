import Image from "next/image";
import potato from "../../../public/images/defaultFood.png";
import defaultAvatar from "../../../public/images/avatarka.png";
import Like from "@/components/Like";
import defaultFood from "../../../public/images/defaultFood.png";

const ChoiceCards = ({ userProfile, recipes }) => {
    return (
        <div className={`w-full grid grid-cols-4 mt-5`}>
            {recipes && recipes.map((recipe) => (
                <div key={recipe.title} className={`bg-[#2A293B] object-contain flex flex-col text-white w-[280px] h-[317px] rounded-3xl mt-5`}>
                    {recipe.image ?
                        (<Image width={280} height={211}
                                className={'w-[px] z-0 h-[211px] rounded-tl-[8px] rounded-tr-[8px]'} src={recipe.image}
                                alt="Food"/>
                        ) :
                        (<Image className="w-[280xp] h-[211px] object-cover" src={defaultFood} alt="Food"/>)
                    }
                    <div className={`p-4 relative`}>
                        <div className={'flex flex-row'}>
                            <Image className={'mr-2 rounded-full object-fit h-[20px] w-[20px]'} src={defaultAvatar} alt={'default'} />
                            <h1 className={'text-[17px] font-[500]'}>{userProfile?.first_name} {userProfile?.last_name}</h1>
                        </div>
                        <h1 className={`text-[14px]`}>{recipe.title}</h1>
                        <Like id={recipe.id} count={recipe.likes_count ? (recipe.likes_count) : 0} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChoiceCards;
