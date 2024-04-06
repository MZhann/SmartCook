import React from "react";
import "../app/globals.css";
import {useRouter} from "next/router";


const MainContainer = (props) => {
    const router = useRouter();
    return (
        <div className={router.pathname === '/profile' || router.pathname == '/challenges' || router.pathname == '/leaderboard' ? "w-full flex justify-center max-w-full min-h-[calc(100vh-176px-92px-1rem)]" : "w-full flex justify-center max-w-full min-h-[calc(100vh-176px-92px-1rem)] bg-[#2A293B]"}>
            {props.children}
        </div>
    );
};

export default MainContainer;
