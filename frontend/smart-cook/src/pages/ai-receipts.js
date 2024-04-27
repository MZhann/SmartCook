import MainContainer from "@/components/MainContainer";
import Navbar from "@/components/Navbar";
import Recipe from "@/components/Recipe";
import axios from "axios";
import {config} from "../../config";
import {useEffect, useState} from "react";
import Link from "next/link";

const AiReceipts = () => {
    const [recipes, setRecipes] = useState(null);
    const [displayedRecipes, setDisplayedRecipes] = useState(8); // Initial number of recipes displayed
    const [recipesCount, setRecipesCount] = useState(0);

    const loadMoreRecipes = () => {
        setDisplayedRecipes(prevCount => prevCount + 4); // Increment by 4 each time the button is clicked
    };

    useEffect(() => {
        fetchData().catch(err => console.error(err));
    }, [])

    const fetchData = async () => {
        try {
            const data = await axios.get(`${config.baseUrl}/api/v1/recipes/ai/all`);
            setRecipes(data.data);
            console.log(recipes)
            setRecipesCount(data.data.length)
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <MainContainer>
            <div className="px-4 lg:px-0 w-full max-w-[1195px] relative flex flex-col items-center mb-56">
                <Navbar/>
                <div
                    className={`gap-4 mt-5 flex flex-col items-center justify-center text-center text-white`}
                >
                    <h1 className={`flex flex-col md:flex-row self-center text-3xl mt-3`}>
                        Discover &nbsp;<span className="text-[#AAE06E]">{recipesCount}</span>&nbsp; AI-Generated Recipes
                    </h1>
                </div>

                <div className="grid grid-cols-1 place-items-center md:grid-cols-2 px-8 md:px-0 lg:grid-cols-4 w-full">
                    {recipes && recipes.slice(0, displayedRecipes).map((recipe, index) => (
                            <Recipe key={index} recipe={recipe}/>
                    ))}
                </div>
                <button onClick={loadMoreRecipes}
                        className="text-white bg-[#AAE06E] self-start w-[250px] h-[48px] rounded-3xl text-lg font-bold mb-20 mt-2">Load
                    More
                </button>
            </div>
            
        </MainContainer>
    );
};

export default AiReceipts;
