"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const Invoices = () => {
    const [invoices, setInvoices] = useState([]);

    // Function to fetch invoices from the server
    const fetchInvoices = async () => {
        try {
            const response = await axios.get("/api/invoices");

            setInvoices(response.data);
        } catch (error) {
            console.error("Error fetching invoices:", error);
        }
    };

    // Function to handle the decision (accept or decline)
    const handleDecision = async (invoiceId, decision) => {
        try {
            // Send the decision back to the server
            const response = await axios.post("/api/decideInvoice", {
                invoiceId,
                decision,
            }); // Replace with your backend API endpoint to send the decision
            console.log("Decision sent successfully:", response.data);

            // Update the local state to reflect the decision change (optional)
            setInvoices((prevInvoices) =>
                prevInvoices.map((invoice) =>
                    invoice._id === invoiceId
                        ? { ...invoice, status: decision }
                        : invoice
                )
            );
        } catch (error) {
            console.error("Error sending decision:", error);
        }
    };

    // Fetch invoices from the server on component mount
    useEffect(() => {
        fetchInvoices();
    }, []);
    console.log(invoices);

    return (
        <div>
            <h2>Invoice Decision Portal</h2>
            {invoices.map((invoice) => (
                <div key={invoice._id}>
                    <h3>Invoice ID: {invoice._id}</h3>
                    <p>Status: {invoice.status}</p>
                    {invoice.status === "Pending" && (
                        <>
                            <button
                                onClick={() =>
                                    handleDecision(invoice._id, "Accepted")
                                }
                            >
                                Accept
                            </button>
                            <button
                                onClick={() =>
                                    handleDecision(invoice._id, "Declined")
                                }
                            >
                                Decline
                            </button>
                        </>
                    )}
                    <hr />
                </div>
            ))}
        </div>
    );
};

export default Invoices;
