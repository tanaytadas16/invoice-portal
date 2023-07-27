import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useInvoiceContext } from "../context/InvoiceContext";
import { useReactToPrint } from "react-to-print";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import HomeIcon from "@mui/icons-material/Home";
import Loading from "./Loading";

export const ComponentToPrint = React.forwardRef((props, ref) => {
    let params = useParams();

    const { selectedSupplier, invoiceHeader, invoiceLineItems, invoiceTotals } =
        useInvoiceContext();
    console.log(selectedSupplier);
    console.log(invoiceHeader);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    return (
        <>
            <div
                className="w-full md:w-2/3 shadow-xl mx-auto mt-8 rounded"
                ref={ref}
            >
                <div className="w-full bg-black flex items-center">
                    <div className="w-1/2 h-[100%]  p-8 ">
                        <img src="/logo.png" alt="Logo" className="w-[150px]" />
                    </div>
                    <div className="w-1/2  px-6 py-4">
                        <h3 className="text-gray-50 text-2xl mb-8">Invoice</h3>
                        <p className="text-gray-50 text-sm mb-1">Invoice ID:</p>

                        {invoiceHeader && (
                            <p className="text-gray-300 mb-5 text-sm">
                                {invoiceHeader.invoiceNumber}
                            </p>
                        )}

                        <p className="text-gray-50 text-sm mb-1">Date:</p>

                        {invoiceHeader && (
                            <p className="text-gray-300 text-sm">
                                {invoiceHeader.invoiceDate}
                            </p>
                        )}
                    </div>
                </div>
                <div className="w-full flex items-center">
                    {invoiceHeader && (
                        <div className="w-1/2 p-8">
                            <h3 className="font-medium mb-2">Bill From:</h3>
                            <p className="text-sm mb-1">Tanay</p>
                            <p className="text-sm mb-1">123 Avenue</p>
                            <p className="text-sm mb-1">Los Angeles,CA</p>
                            <p className="text-sm mb-1">tanay@gmail.com</p>
                        </div>
                    )}

                    {selectedSupplier && (
                        <div className="w-1/2  p-8">
                            <h3 className="font-medium mb-2">Bill to:</h3>
                            <p className="text-sm mb-1">
                                {selectedSupplier.S_SuppName}
                            </p>
                            <p className="text-sm mb-1">
                                {selectedSupplier.S_CorpAddr}
                            </p>
                        </div>
                    )}
                </div>

                <div className="p-8 ">
                    <table className=" w-full border-collapse table-auto bg-white shadow-lg rounded ">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Item</th>
                                <th className="py-3 px-6 text-left">Cost</th>
                                <th className="py-3 px-6 text-left">Qty</th>
                                <th className="py-3 px-6 text-left">Price</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {invoiceLineItems &&
                                invoiceLineItems.map((item) => (
                                    <tr key={item.lineNumber}>
                                        <td className="border border-gray-400 text-sm capitalize px-4 py-2">
                                            {item.description}
                                        </td>
                                        <td className="border border-gray-400 text-xs text-right px-4 py-2">
                                            {Number(item.price).toLocaleString(
                                                "en-US"
                                            )}
                                        </td>
                                        <td className="border border-gray-400 text-xs text-right px-4 py-2">
                                            {Number(
                                                item.quantity
                                            ).toLocaleString("en-US")}
                                        </td>
                                        <td className="border border-gray-400 text-xs text-right px-4 py-2">
                                            {(
                                                Number(item.quantity) *
                                                Number(item.price)
                                            ).toLocaleString("en-US")}
                                        </td>
                                    </tr>
                                ))}

                            {invoiceLineItems && (
                                <tbody>
                                    <tr>
                                        <th
                                            className="border border-gray-400 text-right font-bold text-sm px-4 py-2"
                                            colSpan="3"
                                        >
                                            TOTAL DISCOUNT
                                        </th>
                                        <td className="border border-gray-400 font-bold text-right uppercase text-sm px-4 py-2">
                                            {parseFloat(
                                                invoiceHeader.invoiceTotals
                                                    .totalDiscount
                                            ).toLocaleString("en-US")}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            colSpan="3"
                                            className="border border-gray-400 text-right font-bold text-sm px-4 py-2"
                                        >
                                            Taxes &amp; other
                                        </td>
                                        <td className="border border-gray-400 font-bold text-right uppercase text-sm px-4 py-2">
                                            {(
                                                parseFloat(
                                                    invoiceHeader.invoiceTotals
                                                        .totalOtherCharges
                                                ) +
                                                parseFloat(
                                                    invoiceHeader.invoiceTotals
                                                        .totalTax
                                                )
                                            ).toLocaleString("en-US")}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            colSpan="3"
                                            className="border border-gray-400 text-right font-bold text-sm px-4 py-2"
                                        >
                                            TOTAL AMOUNT
                                        </td>
                                        <td className="border border-gray-400 font-bold text-right uppercase text-sm px-4 py-2">
                                            {invoiceHeader.invoiceTotals.grossTotal.toLocaleString(
                                                "en-US"
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                        </tbody>
                    </table>
                </div>

                <footer className="px-8 py-4 bg-gray-200 w-full">
                    <p className="text-sm text-center">
                        Thanks for continuing business with us!
                    </p>
                </footer>
            </div>
        </>
    );
});

export const ViewInvoice = () => {
    const ComponentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => ComponentRef.current,
    });
    const navigate = useNavigate();
    return (
        <>
            <div className="w-full flex items-center md:justify-start justify-center relative">
                <Tooltip title="Print Invoice">
                    <IconButton
                        onClick={handlePrint}
                        style={{
                            position: "fixed",
                            top: "10px",
                            right: "30px",
                            zIndex: "1000px",
                            color: "#F7CCAC",
                        }}
                    >
                        <LocalPrintshopIcon style={{ fontSize: "50px" }} />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Go Home">
                    <IconButton
                        onClick={() => navigate("/")}
                        style={{
                            position: "fixed",
                            bottom: "50px",
                            right: "30px",
                            zIndex: "1000px",
                        }}
                    >
                        <HomeIcon style={{ fontSize: "30px" }} />
                    </IconButton>
                </Tooltip>

                <ComponentToPrint ref={ComponentRef} />
            </div>
        </>
    );
};
