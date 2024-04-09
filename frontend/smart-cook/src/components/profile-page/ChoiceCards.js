import Image from "next/image";
import potato from "../../../public/images/potato.jpg";
import defaultAvatar from "../../../public/images/avatarka.png";
import Like from "@/components/Like";

const ChoiceCards = ({ userProfile, recipes }) => {
    return (
        <div className={`flex flex-wrap justify-between mt-5`}>
            {recipes && recipes.map((recipe) => (
                <div key={recipe.title} className={`bg-[#2A293B] flex flex-col text-white w-[280px] h-[317px] rounded-3xl mt-5`}>
                    {recipe.image ?
                        <Image
                            className={`object-contain rounded-t-3xl`}
                            src={recipe.image}
                            alt={recipe.title}
                            width={574}
                            height={382}
                        /> :
                        <Image
                            className={`object-contain rounded-t-3xl`}
                            src={potato}
                            alt={recipe.title}
                            width={574}
                            height={382}
                        />
                    }
                    <div className={`p-4 relative`}>
                        <div className={'flex flex-row'}>
                            <Image className={'mr-2 rounded-full object-fit h-[20px] w-[20px]'} src={defaultAvatar} alt={'default'} />
                            <h1 className={'text-[17px] font-[500]'}>{userProfile?.first_name} {userProfile?.last_name}</h1>
                        </div>
                        <h1 className={`text-[14px]`}>{recipe.title}</h1>
                        <Like count={recipe.likes_count ? (recipe.likes_count) : 0} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChoiceCards;
