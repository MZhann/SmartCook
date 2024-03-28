import React from "react";
import "../app/globals.css";


const MainContainer = (props) => {
    return (
        <div className="w-full flex justify-center max-w-full min-h-[calc(100vh-176px-92px-1rem)] bg-[#2A293B]">
            {props.children}
        </div>
    );
};

export default MainContainer;
