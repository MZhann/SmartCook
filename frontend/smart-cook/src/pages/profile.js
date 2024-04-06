import MainContainer from "@/components/MainContainer";
import Navbar from "@/components/Navbar";
import defaultAvatar from "../../public/images/avatarka.png"
import Image from "next/image"
import sandwich from "../../public/images/holding-sandwich.png"
import starAward from "../../public/images/star-award.png"
import cook from "../../public/images/cook-award.png"
import logout from "../../public/images/Logout.png"
import WaitingOpponent from "@/components/modal/battle-cards/profile-battle-cards/WaitingOpponent";
import Statistics from "@/components/profile-page/Statistics";

const Profile = () => {
    return (
      <MainContainer>
          <div className="w-full max-w-[1195px] relative flex flex-col">
              <Navbar/>
              <div className={`flex justify-center items-center w-full text-black text-[40px] font-[600] mt-7`}><h1>Profile</h1></div>
              <div className={'flex flex-row justify-between mt-4'}>
                  <div className={'w-[278px] h-[546px] px-6 py-5 bg-[#2A293B] rounded-3xl'}>
                      <div className={`w-full`}>
                          <Image className={'rounded-full object-fit border-white border-[3px] h-[101px] w-[101px]'} src={defaultAvatar}  alt={'default'} />
                      </div>
                      <div className={'w-full flex-col flex gap-0.5 mt-2'}>
                          <div>
                              <h1 className={`text-white text-[20px] font-[700]`}>Mariya Kim</h1>
                          </div>
                          <div>
                              <p className={`text-white text-[12px] font-[400]`}>mariyakim@gmail.com</p>
                          </div>
                      </div>
                      <div className={'mt-7'}>
                          <div>
                              <p className={`text-white text-[12px] font-[600]`}>Awards</p>
                          </div>
                          <div className={`flex flex-row gap-4 mt-1`}>
                              <Image src={sandwich} alt={`sandwich`} className={'w-[25.77px] h-[38px]'} />
                              <Image src={starAward} alt={`sandwich`} className={'w-[34px] h-[38px]'} />
                              <Image src={cook} alt={`sandwich`} className={'w-[38px] h-[38px]'} />
                          </div>
                      </div>
                      <div className={`flex gap-3 flex-col mt-[160px]`}>
                          <button
                              className={'flex bg-white w-[230px] h-[36px] rounded-3xl justify-center items-center'}>
                              <svg width="17" height="16" viewBox="0 0 17 16" fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
                                  <path
                                      d="M0.625 12.5937V15.8749H3.90625L13.5837 6.19744L10.3025 2.91619L0.625 12.5937ZM16.1212 3.65994C16.2024 3.57899 16.2667 3.48284 16.3106 3.37699C16.3545 3.27114 16.3771 3.15766 16.3771 3.04307C16.3771 2.92847 16.3545 2.815 16.3106 2.70915C16.2667 2.60329 16.2024 2.50714 16.1212 2.42619L14.0738 0.378691C13.9928 0.297576 13.8966 0.233222 13.7908 0.189313C13.6849 0.145404 13.5715 0.122803 13.4569 0.122803C13.3423 0.122803 13.2288 0.145404 13.123 0.189313C13.0171 0.233222 12.9209 0.297576 12.84 0.378691L11.2388 1.97994L14.52 5.26119L16.1212 3.65994Z"
                                      fill="#191919"/>
                              </svg>
                              <span className={'ml-2 text-[16px] font-[500]'}>Edit profile</span>
                          </button>
                          <button
                              className={'flex bg-white w-[230px] h-[36px] rounded-3xl justify-center items-center'}>
                                  <Image src={logout} alt={'lo'} className={`w-[21px] h-[21px]`} />
                              <span className={'ml-2 text-[16px] font-[500]'}>Log out</span>
                          </button>
                      </div>
                  </div>
                  <WaitingOpponent />
                  <Statistics />
              </div>
              <div className={'w-[1196px] h-[97px] py-[24px] px-[40px] flex flex-row bg-[#2A293B] rounded-3xl mt-6'}>
                  <div
                      className={'px-[38px] w-[220px] h-[49px] text-[#2A293B] text-[24px] font-[500] flex justify-center items-center rounded-3xl bg-gradient-to-r from-[#AAE06E] to-[#CDE7B1]'}>Past
                      battles
                  </div>
                  <div
                      className={'px-[38px] w-[190px] h-[49px] text-[#2A293B] text-[24px] font-[500] flex justify-center items-center rounded-3xl bg-gradient-to-r from-[#AAE06E] to-[#CDE7B1]'}>
                      My recipe
                  </div>
                  <div
                      className={'px-[38px] w-[220px] h-[49px] text-[#2A293B] text-[24px] font-[500] flex justify-center items-center rounded-3xl bg-gradient-to-r from-[#AAE06E] to-[#CDE7B1]'}>
                      Saved recipe
                  </div>

              </div>
          </div>
      </MainContainer>
    );
};

export default Profile;