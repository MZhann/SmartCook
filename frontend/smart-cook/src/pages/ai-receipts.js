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

    const loadMoreRecipes = () => {
        setDisplayedRecipes(prevCount => prevCount + 4); // Increment by 4 each time the button is clicked
    };

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
            <div className="w-full max-w-[1195px] relative flex flex-col items-center">
                <Navbar/>
                <div
                    className={`gap-4 mt-5 flex flex-col items-center justify-center text-center text-white`}
                >
                    <h1 className={`flex self-center text-3xl mt-3`}>
                        Discover &nbsp;<span className="text-[#AAE06E]">2534</span>&nbsp; AI-Generated Recipes
                    </h1>
                </div>

                <div className="flex w-full flex-wrap justify-between mt-6">
                    {recipes && recipes.slice(0, displayedRecipes).map((recipe, index) => (
                        <Link key={index} href="/recipes-ai/[recipeAi]" as={`/recipes-ai/${recipe.id}`} passHref>
                            <Recipe recipe={recipe}/>
                        </Link>
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
