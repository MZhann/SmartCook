import MainContainer from "@/components/MainContainer";
import Navbar from "@/components/Navbar";
import AcceptedBattle from "@/components/modal/battle-cards/profile-battle-cards/AcceptedBattle"
import SelectTitleCard from "@/components/modal/battle-cards/choose-opponent-cards/SelectTitileCard";
import {useEffect, useState} from "react";
import SelectOpponent from "@/components/modal/battle-cards/choose-opponent-cards/SelectOpponentCard";
import CreateReceiptCard from "@/components/modal/battle-cards/choose-opponent-cards/CreateReceiptCard";
import axios from "axios";

const Challenges = () => {
    const [clashes, setClashes] = useState(null)
    const [modalStage, setModalStage] = useState(0); // 0: none, 1: SelectTitleCard, 2: SelectOpponent
    const [title, setTitle] = useState('');
    const [opponent, setOpponent] = useState('');
    const [recipe, setRecipe] = useState({});
    const openModal = () => setModalStage(1);
    const goToSelectOpponent = () => setModalStage(2);
    const goToCreateReciept = () => setModalStage(3);
    const closeModal = () => setModalStage(0);
    const goBack = () => setModalStage(modalStage - 1);
    const handleCreateRecipe = () => {
        console.log(title)
        console.log(opponent)
        console.log('End!')
    }

    const [displayedLeaders, setDisplayedLeaders] = useState(8);

    useEffect(() => {
        const fetchData = () => {
            axios.get('https://web-production-ad96.up.railway.app/api/v1/clashee/all').then((r) => {
                    setClashes(r.data);
                }
            ).catch((err) => console.log(err));
        }
        fetchData();
    })

    return (
        <MainContainer>
            <div className=" w-full max-w-[1195px] relative flex flex-col items-center">
                <Navbar />
                <div
                    className={`gap-4 mt-5 flex flex-col items-center justify-center text-center `}
                >
                    <h1 className={`flex self-center text-black text-3xl mt-3 font-black`}>
                        Culinary Clash: Battle Royale of Flavors
                    </h1>
                    <p className={" font-[400]"}>
                        Take part in heated culinary duels, where the most
                        mouth-watering recipes compete for<br></br> supremacy.
                        Show your support by liking your favorite dueling dishes
                        as they compete to<br></br> be crowned the ultimate
                        flavor champion.
                    </p>
                </div>

                <div className="flex items-center space-x-4 mt-10">
                    <button onClick={openModal} className="px-4 py-2 rounded-full bg-[#AAE06E] hover:bg-green-500 focus:outline-none w-[450px] text-white text-xl font-bold h-[60px]">
                        Let&apos;s Battle
                    </button>
                </div>

                <h1 className={`self-start text-black text-3xl mt-10 font-bold`}>
                    Current Battles
                </h1>

                <div className="grid grid-cols-2 w-full">
                    {/*{clashes && clashes.slice(0,4).map((clash, index) => (*/}
                    {/*    <AcceptedBattle key={index} />*/}
                    {/*))}*/}
                </div>
                <button className="text-white bg-[#AAE06E] self-start w-[250px] h-[48px] rounded-3xl text-lg font-bold mb-20 mt-10">Load More</button>
                <SelectTitleCard
                    isModalOpen={modalStage === 1}
                    onClose={closeModal}
                    openNext={goToSelectOpponent}
                    setTitle={setTitle}
                />
                <SelectOpponent
                    isModalOpen={modalStage === 2}
                    onClose={closeModal}
                    openNext={goToCreateReciept}
                    setOpponent={setOpponent}
                    goBack={goBack}
                />
                <CreateReceiptCard
                    isModalOpen={modalStage === 3}
                    onClose={closeModal}
                    setRecipe={setRecipe}
                    goBack={goBack}
                    handlCreateRecipe={handleCreateRecipe}
                />
            </div>

        </MainContainer>
    );
};

export default Challenges;
