import MainContainer from "@/components/MainContainer";
import Navbar from "@/components/Navbar";
import Recipe from "@/components/Recipe";

const AiReceipts = () => {
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
                    <Recipe />
                    <Recipe />
                    <Recipe />
                    <Recipe />
                    <Recipe />
                    <Recipe />
                    <Recipe />
                    <Recipe />
                </div>
                <button className="text-white bg-[#AAE06E] self-start w-[250px] h-[48px] rounded-3xl text-lg font-bold mb-20 mt-2">Load More</button>
            </div>
        </MainContainer>
    );
};

export default AiReceipts;
