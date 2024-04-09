import React, {useEffect, useState} from "react";
import Recipe from "./Recipe";
import axios from "axios";
import {config} from "../../config";
import Link from "next/link";


const RecentlyAdded = () => {
    const [recipes, setRecipes] = useState(null);
    const [displayedRecipes, setDisplayedRecipes] = useState(8); // Initial number of recipes displayed

    const loadMoreRecipes = () => {
        setDisplayedRecipes(prevCount => prevCount + 4); // Increment by 4 each time the button is clicked
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await axios.get(`${config.baseUrl}/api/v1/all-recipes/`);
            setRecipes(data.data);
            console.log(recipes);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="mt-32 flex flex-col">
            <div className="text-white text-4xl ">Recently added recipes</div>
            <div className="mt-10 flex justify-between flex-wrap">
                {recipes && recipes.slice(0, displayedRecipes).map((recipe, index) => (
                    <Link key={index} href="/recipes/[recipeTitle]" as={`/recipes/${recipe.id}`} passHref>
                        <Recipe  recipe={recipe} />
                    </Link>
                ))}
            </div>
            <Link href={"/all-receipts"} className="w-max text-white px-16 font-bold py-2 mt-4 rounded-3xl tracking-wide bg-[#AAE06E]">Load More</Link>
        </div>
    )
}

export default RecentlyAdded;