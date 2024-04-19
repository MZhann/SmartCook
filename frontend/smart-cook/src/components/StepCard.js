import Image from "next/image";
import potato from "../../public/images/potato.jpg";

const StepCard = ({item, index}) => {
    return (
            <div className={`bg-white flex flex-col sm:w-[500px] xl:w-[524px] pb-4 rounded-3xl`}>
                {item && item.image ?
                    <Image className={`object-cover rounded-t-3xl h-[382px] w-[524px]`} width={574} height={382} src={item.image}
                           alt={'potato'}/>
                    :
                    <Image className={`object-cover rounded-t-3xl`} src={potato} alt={'potato'} width={574} height={382}/>
                }
                <div className={`p-4`}>
                    <h1 className={`text-[24px] mb-3`}>Step {index + 1}</h1>
                    <p className={`text-[16px] whitespace-normal break-words`}>{item && item.step_text}</p>
                </div>
            </div>
    )
}

export default StepCard;