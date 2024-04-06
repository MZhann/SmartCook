import MainContainer from "@/components/MainContainer";
import Navbar from "@/components/Navbar";

const Profile = () => {
    return (
      <MainContainer>
          <div className="w-full max-w-[1195px] relative flex flex-col">
              <Navbar/>
              <div className={`flex justify-center items-center w-full text-white`}><h1>Profile</h1></div>
          </div>
      </MainContainer>
    );
};

export default Profile;