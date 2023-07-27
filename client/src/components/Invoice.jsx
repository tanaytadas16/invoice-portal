import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

const Invoice = () => {
    const { invoiceId } = useParams();

    // const { invoices } = useContext(InvoiceContext);
    const [invoice, setInvoice] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3001/api/invoices/${invoiceId}`
                );
                console.log(response);
                setInvoice(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching invoice:", error);
            }
        };

        fetchInvoice();
    }, [invoiceId]);

    if (loading) {
        return <Loading />;
    }
    if (!invoice) {
        return <div>Invoice not found.</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-row justify-between">
                <h1 className="text-2xl font-semibold mb-4">
                    Invoice {invoice.InvNum}
                </h1>
                <Link to="/print">
                    <button className="inline-flex items-center h-10 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium rounded-md">
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
            </div>

            <div className="bg-white rounded-md shadow-md p-4 flex flex-col gap-5">
                <div>
                    <h3 className="font-semibold">Client Name:</h3>
                    <p>{invoice.InvoicingCompany}</p>
                </div>
                <div>
                    <h3 className="font-semibold">Invoice Date:</h3>
                    <p>{invoice.InvoiceDate.split("T")[0]}</p>
                </div>
                <div>
                    <h3 className="font-semibold">Invoice Number:</h3>
                    <p>{invoice.InvNum}</p>
                </div>
                <div>
                    <h3 className="font-semibold">Line Items:</h3>
                    <ul>
                        {invoice.InvoiceLineItems.map((item, index) => (
                            <li key={index}>
                                <p>Description: {item.Description}</p>
                                <p>Quantity: {item.Quantity}</p>
                                <p>Rate: {item.GrossAmt}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Invoice;
