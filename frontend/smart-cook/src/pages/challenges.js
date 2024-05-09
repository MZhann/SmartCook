import MainContainer from "@/components/MainContainer";
import Navbar from "@/components/Navbar";
import AcceptedBattle from "@/components/modal/battle-cards/profile-battle-cards/AcceptedBattle"
import SelectTitleCard from "@/components/modal/battle-cards/choose-opponent-cards/SelectTitileCard";
import {useEffect, useState} from "react";
import SelectOpponent from "@/components/modal/battle-cards/choose-opponent-cards/SelectOpponentCard";
import CreateReceiptCard from "@/components/modal/battle-cards/choose-opponent-cards/CreateReceiptCard";
import axios from "axios";
import {config} from "../../config";
import {error} from "next/dist/build/output/log";

const Challenges = () => {
    const [clashes, setClashes] = useState(null)
    const [modalStage, setModalStage] = useState(0); // 0: none, 1: SelectTitleCard, 2: SelectOpponent
    const [title, setTitle] = useState('');
    const [opponent, setOpponent] = useState('');
    const [recipe, setRecipe] = useState({});
    const openModal = () => setModalStage(1);
    const goToSelectOpponent = () => setModalStage(2);
    const goToCreateRecipe = () => setModalStage(3);
    const closeModal = () => setModalStage(0);
    const goBack = () => setModalStage(modalStage - 1);
    const [displayedRecipes, setDisplayedRecipes] = useState(4);
    const [currentClash, setCurrentClash] = useState([]);

    useEffect(() => {
        const fetchBattle = async () => {
            try {
                const res = await axios.get(
                    `${config.baseUrl}/api/v1/clashes/current/`,
                    {
                        headers: {
                            Authorization:
                                "Bearer " + localStorage.getItem("accessToken"),
                        },
                    }
                );

                setCurrentClash(res.data);
                console.log(res.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBattle().catch(err => console.error(err));
    })

    const loadMoreRecipes = () => {
        setDisplayedRecipes(prevCount => prevCount + 4); // Increment by 4 each time the button is clicked
    };

    const handleCreateClash = (e) => {
        e.preventDefault();

        axios.post(`${config.baseUrl}/api/v1/clashes/create/`, {
            theme: title,
            opponent: opponent
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("accessToken"),
            }
        }).then(r => {
            console.log("clash create response", r);
            window.location.replace(`/clashes`);
        }).catch((err) => {
            console.error(err)
            setModalStage(0);
            alert(err.response.data.non_field_errors[0]);
        }).finally(() => console.log('hello'))
    }

    useEffect(() => {
        const fetchData = () => {
            axios.get('https://web-production-d3136.up.railway.app/api/v1/clashes/ongoing/')
                .then((r) => {
                        setClashes(r.data);
                    }
                ).catch((err) => console.log(err));
        }
        fetchData();
    })



    return (
        <MainContainer>
            <div className=" w-full max-w-[1195px] relative flex flex-col items-center px-4">
                <Navbar/>
                <div
                    className={`gap-4 mt-5 flex flex-col items-center justify-center text-center `}
                >
                    <h1 className={`flex self-center text-black text-3xl mt-3 font-black`}>
                        Culinary Clash: Battle Royale of Flavors
                    </h1>
                    <p className={"font-[400] text-pretty"}>
                        Take part in heated culinary duels, where the most
                        mouth-watering recipes compete for<br></br> supremacy.
                        Show your support by liking your favorite dueling dishes
                        as they compete to<br></br> be crowned the ultimate
                        flavor champion.
                    </p>
                </div>

                <div className="flex items-center space-x-4 mt-10">
                    {currentClash?.length !== 0 ?
                        <div
                                className="px-4 py-3 items-center text-center rounded-full bg-[#AAE06E] focus:outline-none w-[300px] sm:w-[450px] text-white text-xl font-bold h-[60px]">
                            You&apos;re already in battle
                        </div> :
                        <button onClick={openModal}
                                className="px-4 py-2 rounded-full bg-[#AAE06E] hover:bg-green-500 focus:outline-none w-[300px] sm:w-[450px] text-white text-xl font-bold h-[60px]">
                            Let&apos;s Battle
                        </button>
                    }
                </div>

                <h1 className={`self-start text-black text-3xl mt-10 font-bold`}>
                    Current Battles
                </h1>

                <div className="flex flex-wrap justify-center w-full">
                    {clashes && clashes.slice(0, displayedRecipes).map((clash, index) => (
                        <AcceptedBattle key={index} battle={clash && clash}/>
                    ))}
                </div>
                <button
                    onClick={loadMoreRecipes}
                    className="text-white bg-[#AAE06E] self-start w-[250px] h-[48px] rounded-3xl text-lg font-bold mb-20 mt-10">Load
                    More
                </button>
                <SelectTitleCard
                    isModalOpen={modalStage === 1}
                    onClose={closeModal}
                    openNext={goToSelectOpponent}
                    setTitle={setTitle}
                />
                <SelectOpponent
                    isModalOpen={modalStage === 2}
                    onClose={closeModal}
                    openNext={goToCreateRecipe}
                    setOpponent={setOpponent}
                    goBack={goBack}
                />
                <CreateReceiptCard
                    isModalOpen={modalStage === 3}
                    onClose={closeModal}
                    setRecipe={setRecipe}
                    goBack={goBack}
                    handleCreateRecipe={handleCreateClash}
                />
            </div>

        </MainContainer>
    );
};

export default Challenges;
