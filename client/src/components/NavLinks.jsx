import React from "react";
import { Link } from "react-router-dom";

const NavLinks = () => {
    return (
        <div className="container text-lg w-full bg-blue-400 text-white max-w-none p-2">
            <ul className="flex flex-row justify-start  gap-10">
                <Link to="/">Home</Link>
                <Link to="/invoices">Invoices</Link>
                <Link to="/activity">Activity</Link>
            </ul>
        </div>
    );
};

export default NavLinks;
