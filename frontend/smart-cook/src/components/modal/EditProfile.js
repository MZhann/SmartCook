import {useState} from "react";
import editProf from '../../../public/images/edit-profile.png'
import Image from "next/image"
import Link from "next/link";
import axios from "axios";
import {config} from "../../../config";
import edit from "../../../public/images/edit-pen.png"

const EditProfile = ({isModalOpen, onClose, closeModal, userProfile}) => {
    const [imagePreview, setImagePreview] = useState(null);
    const [email, setEmail] = useState(userProfile?.email || "");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState(userProfile?.first_name || "");
    const [lastName, setLastName] = useState(userProfile?.last_name || "");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleClose = () => {
        onClose();
        closeModal();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestBody = new FormData();

        if (imagePreview && imagePreview !== userProfile?.photo) {
            // Convert data URL to Blob
            const blob = dataURLtoBlob(imagePreview);
            requestBody.append("photo", blob, "avatar.jpg");
        }
        if (firstName.trim() !== "") {
            requestBody.append("first_name", firstName.trim());
        }
        if (lastName.trim() !== "") {
            requestBody.append("last_name", lastName.trim());
        }
        if (newPassword.trim() !== "") {
            requestBody.append("password", newPassword.trim());
        }

        try {
            setIsLoading(true);
            await axios.patch(`${config.baseUrl}/api/v1/user/profile/`, requestBody, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                },
            });
            console.log("Profile updated successfully");
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error("Error updating profile:", error);
            if (error.response && error.response.data && error.response.data.error) {
                setErrorMessage(error.response.data.error);
            }
        } finally {
            setIsLoading(false);
        }
    };


    const dataURLtoBlob = (dataURL) => {
        const arr = dataURL.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type: mime});
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // Store the data URL directly
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };

    const validate = () => {
        let error = "";

        if (firstName === "") {
            error = "First name is required.";
        } else if (lastName === "") {
            error = "Last name is required.";
        } else if (currentPassword === "" && currentPassword > 6) {
            error = "Current password is required.";
        } else if (newPassword !== "" && newPassword.length < 6) {
            error = "New password must be at least 6 characters long.";
        } else if (newPassword !== repeatPassword) {
            error = "New password and repeat password do not match.";
        }

        setErrorMessage(error);
        return !error;
    };


    return (
        <div
            className={`overflow-auto fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${isModalOpen ? "" : "hidden"}`}
        >
            <div className="w-[408px] p-[32px] bg-white rounded-xl mt-6 relative flex flex-col items-center">
                <div className={'w-full flex flex-row justify-between'}>
                    <h1 className={'text-[28px] text-black font-[600]'}>Edit page</h1>
                    <div className={'justify-center items-center flex'}>
                        <svg onClick={handleClose} width="16" height="16" viewBox="0 0 16 16" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M15.281 14.2194C15.3507 14.289 15.406 14.3718 15.4437 14.4628C15.4814 14.5539 15.5008 14.6514 15.5008 14.75C15.5008 14.8485 15.4814 14.9461 15.4437 15.0372C15.406 15.1282 15.3507 15.2109 15.281 15.2806C15.2114 15.3503 15.1286 15.4056 15.0376 15.4433C14.9465 15.481 14.849 15.5004 14.7504 15.5004C14.6519 15.5004 14.5543 15.481 14.4632 15.4433C14.3722 15.4056 14.2895 15.3503 14.2198 15.2806L8.00042 9.0603L1.78104 15.2806C1.64031 15.4213 1.44944 15.5004 1.25042 15.5004C1.05139 15.5004 0.860523 15.4213 0.719792 15.2806C0.579062 15.1399 0.5 14.949 0.5 14.75C0.5 14.551 0.579062 14.3601 0.719792 14.2194L6.9401 7.99999L0.719792 1.78061C0.579062 1.63988 0.5 1.44901 0.5 1.24999C0.5 1.05097 0.579062 0.860095 0.719792 0.719365C0.860523 0.578634 1.05139 0.499573 1.25042 0.499573C1.44944 0.499573 1.64031 0.578634 1.78104 0.719365L8.00042 6.93968L14.2198 0.719365C14.3605 0.578634 14.5514 0.499573 14.7504 0.499573C14.9494 0.499573 15.1403 0.578634 15.281 0.719365C15.4218 0.860095 15.5008 1.05097 15.5008 1.24999C15.5008 1.44901 15.4218 1.63988 15.281 1.78061L9.06073 7.99999L15.281 14.2194Z"
                                fill="#222222"/>
                        </svg>
                    </div>
                </div>
                <div className={'w-full flex-col flex justify-center items-center mt-3'}>
                    <div className={'relative'}>
                        <label htmlFor="avatarInput" className="cursor-pointer">
                            <Image src={edit} alt={"edit-pen"} className={`top-3/4 right-0 absolute size-[22px]`}/>
                        </label>
                        <input
                            type="file"
                            id="avatarInput"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                        {imagePreview ? (
                            <img src={imagePreview} alt="profile"
                                 className="w-[81px] h-[80px] flex justify-center items-center"/>
                        ) : (
                            <>
                                {userProfile && userProfile.photo ?
                                    <Image src={userProfile?.photo} alt={'edit-profile'} width={81} height={81}
                                           className={'w-[81px] h-[80px] flex justify-center items-center'}/>
                                    :
                                    <Image src={editProf} alt={'edit-profile'}
                                           className={'w-[81px] h-[80px] flex justify-center items-center'}/>
                                }
                            </>
                        )}
                    </div>
                    {errorMessage && <p className={'text-red-700'}>{errorMessage}</p>}
                </div>
                <div className={'flex flex-col w-full  '}>
                    <p className="text-sm mt-5">First name</p>
                    <input
                        id="email"
                        className={`w-full rounded-3xl border-2 h-10 shadow-gray-500 text-xs p-3 mt-2`}
                        placeholder="Enter your surname"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <p className="text-sm mt-5">Last name</p>
                    <input
                        id="email"
                        className={`w-full rounded-3xl border-2 h-10 shadow-gray-500 text-xs p-3 mt-2`}
                        placeholder="Enter your surname"
                        type="text"
                        value={lastName} // Use value instead of defaultValue
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <div className={'w-full flex flex-col opacity-20'}>
                        <p className="text-sm mt-5">Email</p>
                        <input
                            id="email"
                            className={`w-full rounded-3xl border-2 h-10 shadow-gray-500 text-xs p-3 mt-2`}
                            placeholder="your.email@gmail.com"
                            type="email"
                            value={userProfile?.email}
                        />
                    </div>
                    <p className="text-sm mt-5">Current password</p>
                    <input
                        id="password"
                        className={`w-full rounded-3xl border-2 h-10 shadow-gray-500 text-xs p-3 mt-2`}
                        placeholder="***********"
                        type="password"
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <p className="text-sm mt-5">New password</p>
                    <input
                        id="password"
                        className={`w-full rounded-3xl border-2 h-10 shadow-gray-500 text-xs p-3 mt-2 `}
                        placeholder="************"
                        type="password"
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <p className="text-sm mt-5">Repeat new password</p>
                    <input
                        id="password"
                        className={`w-full rounded-3xl border-2 h-10 shadow-gray-500 text-xs p-3 mt-2`}
                        placeholder="**************"
                        type="password"
                        onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                    <Link
                        passHref={true}
                        className="text-[#80CC2D] text-xs mt-2 self-end border-b-2 border-white cursor-pointer hover:border-b-[#AAE06E]"
                        href={`/forgot-password`}
                    >
                        Forgot password?
                    </Link>
                    <button
                        className={`text-white bg-[#AAE06E] w-full h-10 rounded-3xl mt-5 ${
                            errorMessage && "disabled"
                        }`}
                        onClick={handleSubmit}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditProfile;