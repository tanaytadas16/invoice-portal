import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./../App.css";
// import invoiceList from "../data/data.js";
// import InvoiceForm from "./InvoiceForm";
import InvoiceTable from "./InvoiceTable";
import { Link } from "react-router-dom";
import Loading from "./Loading";

export const InvoiceList = () => {
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3001/api/invoices"
                );

                setInvoices(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching invoices:", error);
            }
        };

        fetchInvoices();
    }, []);

    // Function to handle the click on an invoice to view it in preview mode
    const handleViewInvoice = (invoice) => {
        setSelectedInvoice(invoice);
    };

    // Function to close the invoice preview mode
    const handleClosePreview = () => {
        setSelectedInvoice(null);
    };

    if (loading) {
        return <Loading />;
    }
    return (
        <>
            <div className="overflow-x-auto relative">
                <div className="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
                    <div className="w-full m-5 lg:w-5/6">
                        <Link to="/form">
                            <button
                                className="relative inline-flex text-sm sm:text-base rounded-full font-medium border-2 border-transparent transition-colors outline-transparent focus:outline-transparent disabled:opacity-50 disabled:pointer-events-none disabled:opacity-40 disabled:hover:opacity-40 disabled:cursor-not-allowed disabled:shadow-none
        text-white bg-[#4040F2] hover:bg-[#3333D1] focus:border-[#B3B3FD] focus:bg-[#4040F2] px-4 py-1 sm:py-1.5 sm:px-5"
                            >
                                + New Invoice
                            </button>
                        </Link>

                        <div className="bg-white shadow-md rounded my-6">
                            <table className="min-w-max w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        {/* <th class="py-3 px-6 text-left">Project</th> */}

                                        <th className="py-3 px-6 text-left">
                                            Client
                                        </th>
                                        <th className="py-3 px-6 text-center">
                                            Invoice Number
                                        </th>
                                        <th className="py-3 px-6 text-center">
                                            Amount
                                        </th>
                                        <th className="py-3 px-6 text-center">
                                            Status
                                        </th>
                                        <th className="py-3 px-6 text-left">
                                            Due Date
                                        </th>

                                        <th className="py-3 px-6 text-center">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                {invoices.map((invoice) => (
                                    <InvoiceTable
                                        key={invoice.invoiceNumber}
                                        invoice={invoice}
                                    />
                                ))}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
