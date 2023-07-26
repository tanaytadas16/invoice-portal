import { useEffect, useState } from "react";
import axios from "axios";
import { useInvoiceContext } from "../context/InvoiceContext";
// import "../styles/Form.css";
import Loading from "./Loading";
import { PrintButton, SubmitButton, ResetButton } from "./Buttons";
import FormHeaders from "./FormHeaders";
import NavLinks from "./NavLinks";
import Table from "./Table";
import Totals from "./Totals";

const Form = () => {
    const [loading, setLoading] = useState(true);
    const { invoiceLineItems, invoiceHeader, resetContext } =
        useInvoiceContext();

    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        async function getSuppliersName() {
            try {
                const response = await axios.get(
                    "http://localhost:3001/api/suppliers"
                );

                setSuppliers(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error getting all data:", error);
            }
        }
        getSuppliersName();
        // return () => {
        //     second;
        // };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const combinedData = {
            invoiceHeader: invoiceHeader,
            invoiceLineItems: invoiceLineItems,
        };
        console.log("combined data", combinedData);
        try {
            const response = await axios.post(
                "http://localhost:3001/api/invoices",
                combinedData
            );
            console.log(response.data);
            if (response) {
                resetContext();
                const sendInvoice = await axios
                    .post("https://eo8w4jk4lyfkl.m.pipedream.net", combinedData)
                    .then(console.log("Data sent to company"));
            }
        } catch (error) {
            console.error("Error sending data:", error);
        }
    };
    if (loading) {
        return <Loading />;
    }

    return (
        <form onSubmit={handleSubmit} className=" bg-slate-50 h-full">
            <div className="w-screen h-full bg-gray-100 flex-col relative items-start justify-center overflow-hidden">
                <div className="w-full flex-col justify-end max-w-none">
                    <div className="w-full flex flex-row justify-between">
                        <div className="totals w-1/2 flex-col justify-end">
                            <FormHeaders suppliers={suppliers} />
                        </div>
                        <div className="submitButtons m-7 flex flex-row w-1/2">
                            <div className="w-full max-w-screen py-4">
                                <div className="login-buttons flex float-right justify-between gap-5">
                                    <ResetButton />
                                    <PrintButton />
                                    <SubmitButton />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="my-4 mr-7 object-contain relative w-screen h-auto border border-gray-700 max-w-none shadow-lg bg-slate-50 overflow-x-auto">
                        <Table />
                    </div>
                    <div className="sticky">
                        <Totals />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Form;
