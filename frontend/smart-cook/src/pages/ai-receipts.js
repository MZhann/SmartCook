import MainContainer from "@/components/MainContainer";
import Navbar from "@/components/Navbar";
import Recipe from "@/components/Recipe";
import axios from "axios";
import {config} from "../../config";
import {useEffect, useState} from "react";

const AiReceipts = () => {
    const [recipes, setRecipes] = useState(null);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const data = await axios.get(`${config.baseUrl}/api/v1/recipes/ai/`);
            setRecipes(data.data);
            console.log(recipes)
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <MainContainer>
            <div className=" w-full max-w-[1195px] relative flex flex-col items-center">
                <Navbar />
                <div
                    className={`gap-4 mt-5 flex flex-col items-center justify-center text-center text-white`}
                >
                    <h1 className={`flex self-center text-3xl mt-3`}>
                        Discover &nbsp;<span className="text-[#AAE06E]">2534</span>&nbsp; AI-Generated Recipes
                    </h1>
                </div>

                <div className="flex flex-wrap justify-between mt-6">
                    {recipes && recipes.map((recipe, index) => (
                        <Recipe key={index} recipe={recipe} />
                    ))}
                </div>
                <button className="text-white bg-[#AAE06E] self-start w-[250px] h-[48px] rounded-3xl text-lg font-bold mb-20 mt-2">Load More</button>
            </div>
        </MainContainer>
    );
};

export default AiReceipts;
