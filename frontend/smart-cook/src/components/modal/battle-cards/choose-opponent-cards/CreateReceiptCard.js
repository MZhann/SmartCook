import Image from "next/image";
import cookBattle from "../../../../../public/images/cookBattle.png";
import close from "../../../../../public/images/Close.svg";
import {useState} from "react";

const CreateReceiptCard = ({isModalOpen, handleCreateRecipe, onClose}) => {
    const [isHidden, setIsHidden] = useState('');
    const [inputValue, setInputValue] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitted value:", inputValue);
        setInputValue("");
    };

    const handleCloseClick = () => {
        setIsHidden('hidden');
    }

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <div
            className={`overflow-auto fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${isModalOpen ? "" : "hidden"}`}
        >
            <div className={'absolute z-50 flex flex-col items-center'}>
                <div
                    className={`w-[370px] sm:w-[500px] h-[412px] bg-white rounded-xl relative flex flex-col items-center ${isModalOpen ? '' : "hidden"}`}
                >
                    <Image
                        onClick={onClose}
                        src={close}
                        alt="close"
                        className="cursor-pointer w-[24px] h-[24px] absolute top-6 right-6"
                    />
                    <Image src={cookBattle} className="w-[80px] h-[80px] mt-14" alt={'cookBattle'}/>
                    <div className="font-bold tracking-[0.1px] mt-5 text-lg">
                        Culinary Clash
                    </div>
                    <div className="mt-2 mb-6">Step 3: Create a recipe for a battle</div>

                    <button onClick={(e) => handleCreateRecipe(e)} className="w-[150px] h-[36px] text-white bg-[#AAE06E] rounded-3xl">Create</button>
                </div>
            </div>
        </div>
    );
};

export default CreateReceiptCard;
