"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Table from "./_components/Table";
import Loading from "./_components/Loading";

const Invoices = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);

    // Function to fetch invoices from the server
    const fetchInvoices = async () => {
        try {
            const response = await axios.get("/api/invoices");
            console.log("Invoices fetched successfully:", response.data);
            setInvoices(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching invoices:", error);
        }
    };

    // Function to handle the decision (accept or decline)
    const handleDecision = async (invoiceId, decision) => {
        if (decision === "Approve") decision = "Approved";
        if (decision === "Decline") decision = "Declined";

        const statusUpdate = await axios.put("api/invoices", {
            invoiceId,
            decision,
        });
        if (!statusUpdate) console.log("Cannot Update Status");
        else {
            console.log("Decision updated in db successfully:", statusUpdate);

            setInvoices((prevInvoices) =>
                prevInvoices.map((invoice) =>
                    invoice.InvNum === invoiceId
                        ? { ...invoice, InvoiceStatus: decision }
                        : invoice
                )
            );

            const response = await axios.put(
                "http://localhost:3001/api/invoiceResponse",
                {
                    invoiceId,
                    decision,
                }
            );
            console.log("Decision sent successfully:", response);
        }
    };

    useEffect(() => {
        fetchInvoices();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="overflow-x-auto relative">
            <div className="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
                <div className="w-full m-5 lg:w-5/6">
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
                                <Table
                                    key={invoice.invoiceNumber}
                                    invoice={invoice}
                                    handleDecision={handleDecision}
                                />
                            ))}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Invoices;
