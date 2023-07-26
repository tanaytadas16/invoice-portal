import React from "react";
import PacmanLoader from "react-spinners/RingLoader";

const Loading = () => {
    return (
        <main className="w-full min-h-screen bg-gray-200 flex flex-col items-center justify-center">
            <PacmanLoader />
        </main>
    );
};

export default Loading;
