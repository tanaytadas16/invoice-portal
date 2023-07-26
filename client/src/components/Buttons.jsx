import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useInvoiceContext } from "../context/InvoiceContext";

export const PrintButton = () => {
    const navigate = useNavigate();
    return (
        <Link to="/print">
            <button
                type="button"
                className="inline-flex items-center h-10 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium rounded-md"
                // onClick={navigate("/form")}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="printer"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7,9.5c-0.8284302,0-1.5,0.6715698-1.5,1.5s0.6715698,1.5,1.5,1.5c0.828064-0.0009155,1.4990845-0.671936,1.5-1.5C8.5,10.1715698,7.8284302,9.5,7,9.5z M7,11.5c-0.276123,0-0.5-0.223877-0.5-0.5s0.223877-0.5,0.5-0.5c0.2759399,0.0005493,0.4994507,0.2240601,0.5,0.5C7.5,11.276123,7.276123,11.5,7,11.5z M19.5,6H18V2.5c0-0.0001831,0-0.0003662,0-0.0006104C17.9998169,2.2234497,17.776001,1.9998169,17.5,2h-11C6.4998169,2,6.4996338,2,6.4993896,2C6.2234497,2.0001831,5.9998169,2.223999,6,2.5V6H4.5C3.119812,6.0012817,2.0012817,7.119812,2,8.5V15c0.0018311,1.6561279,1.3438721,2.9981689,3,3h1v3.5c0,0.0001831,0,0.0003662,0,0.0005493C6.0001831,21.7765503,6.223999,22.0001831,6.5,22h11c0.0001831,0,0.0003662,0,0.0006104,0C17.7765503,21.9998169,18.0001831,21.776001,18,21.5V18h1c1.6561279-0.0018311,2.9981689-1.3438721,3-3V8.5C21.9987183,7.119812,20.880188,6.0012817,19.5,6z M7,3h10v3H7V3z M17,21H7v-6h10V21z M21,15c-0.0014038,1.1040039-0.8959961,1.9985962-2,2h-1v-2.5c0-0.0001831,0-0.0003662,0-0.0006104C17.9998169,14.2234497,17.776001,13.9998169,17.5,14h-11c-0.0001831,0-0.0003662,0-0.0006104,0C6.2234497,14.0001831,5.9998169,14.223999,6,14.5V17H5c-1.1040039-0.0014038-1.9985962-0.8959961-2-2V8.5C3.0009155,7.671936,3.671936,7.0009155,4.5,7h2h11h0.0006104H19.5c0.828064,0.0009155,1.4990845,0.671936,1.5,1.5V15z"
                    ></path>
                </svg>
                Print
            </button>
        </Link>
    );
};

export const DeleteButton = () => {
    return (
        <button className="inline-flex items-center h-10 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
            </svg>
            Delete
        </button>
    );
};

export const ResetButton = () => {
    const { resetContext } = useInvoiceContext();
    return (
        <button
            onClick={() => {
                resetContext();
            }}
            className="inline-flex items-center h-10 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                />
            </svg>
            Restore
        </button>
    );
};

export const SubmitButton = () => {
    return (
        <button
            type="submit"
            className="inline-flex items-center h-10 px-4 py-2 bg-green-500 hover:bg-green-700 text-white text-sm font-medium rounded-md"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-save w-5 h-5 mr-1"
            >
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
            Save
        </button>
    );
};
