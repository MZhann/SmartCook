import MainContainer from "@/components/MainContainer";
import Navbar from "@/components/Navbar";
import Recipe from "@/components/Recipe";
import axios from "axios";
import {config} from "../../config";
import {useEffect, useState} from "react";
import Link from "next/link";

const AllReceipts = () => {
    const [recipes, setRecipes] = useState(null);
    const [displayedRecipes, setDisplayedRecipes] = useState(8); // Initial number of recipes displayed
    const [searchValue, setSearchValue] = useState('');
    const loadMoreRecipes = () => {
        setDisplayedRecipes(prevCount => prevCount + 4); // Increment by 4 each time the button is clicked
    };

    const handleSearch = async () => {
        try {
            const data = await axios.get(`${config.baseUrl}/api/v1/all-recipes/`, {
                params: {
                    search: searchValue,
                }
            });
            setRecipes(data.data);
            console.log(recipes);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await axios.get(`${config.baseUrl}/api/v1/all-recipes/`, {
                params: {
                    search: searchValue,
                }
            });
            setRecipes(data.data);
            console.log(recipes);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <MainContainer>
            <div className="px-4 md:px-0 w-full max-w-[1195px] relative flex flex-col items-center">
                <Navbar/>
                <div
                    className={`gap-4 mt-5 flex flex-col items-center justify-center text-center text-white`}
                >
                    <h1 className={`flex self-center text-[40px]`}>
                        Recipe inspiration
                    </h1>
                    <p className={"text-[20px] font-[400]"}>
                        Explore a world of flavor with our diverse collection of
                        recipes, featuring <br></br>culinary delights from every
                        corner of the globe.
                    </p>
                </div>
                <div className="flex items-center space-x-4 mt-10">
                    <input
                        type="text"
                        className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none w-1/2 md:w-[375px] h-[42px]"
                        placeholder="Search"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button
                        onClick={handleSearch}
                        className="px-4 py-2 rounded-full bg-[#AAE06E] text-white hover:bg-green-600 focus:outline-none w-[135px] h-[42px]">
                        Search
                    </button>
                </div>
                <div className={`w-full flex justify-center items-center px-8  lg:px-0 m-3`}>
                    <div className="grid grid-col-1 md:grid-cols-2 self-center lg:grid-cols-4 w-full place-items-center">
                        {recipes && recipes.slice(0, displayedRecipes).map((recipe, index) => (

                            <Recipe recipe={recipe} key={index}/>

                        ))}
                    </div>
                </div>
                <div className={'w-full justify-start'}>
                    <button onClick={loadMoreRecipes}
                            className="w-max text-white px-16 font-bold py-2 mt-4 rounded-3xl tracking-wide bg-[#AAE06E]">Load
                        More
                    </button>
                </div>
                <div className="h-[400px]"></div>
            </div>
        </MainContainer>
    );
};

export default AllReceipts;
