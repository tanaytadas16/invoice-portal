import React, { useState } from "react";
import { useInvoiceContext } from "../context/InvoiceContext";

const FormHeaders = ({ suppliers }) => {
    const { setSelectedSupplier, invoiceHeader, setInvoiceHeader } =
        useInvoiceContext();

    const handleChange = (event, field) => {
        const { id, value } = event.target;
        if (id === "invoicingCompany") {
            const selectedSupplier = suppliers.find(
                (supplier) => supplier.S_SuppName === value
            );

            setSelectedSupplier(selectedSupplier);
        }

        setInvoiceHeader((prevInvoiceHeader) => ({
            ...prevInvoiceHeader,
            [id]: value,
        }));
        console.log("invoiceHeader", invoiceHeader);
    };

    return (
        <div className="flex flex-row text-xs justify-evenly box-content m-7 bg-white rounded-md shadow-md p-4">
            <div className="flex flex-col  w-64">
                <>
                    <label htmlFor="invoiceNumber">Invoice Number:</label>
                    <input
                        type="text"
                        id="invoiceNumber"
                        placeholder="123"
                        value={invoiceHeader.invoiceNumber}
                        onChange={handleChange}
                    />
                </>

                <label htmlFor="invoiceStatus">Invoice Status:</label>
                <select
                    id="invoiceStatus"
                    className="mb-5"
                    value={invoiceHeader.invoiceStatus}
                    onChange={handleChange}
                >
                    <option value="Draft">Select a Status</option>
                    <option value="Outstanding">Outstanding</option>
                    <option value="Unpaid">Unpaid</option>
                    <option value="Paid">Paid</option>
                    <option value="Reconcile">Reconcile</option>
                </select>

                <div className="flex flex-col">
                    <label htmlFor="invoiceRefNumber">
                        Invoice Reference Number:
                    </label>
                    <input
                        type="text"
                        id="invoiceRefNumber"
                        placeholder="ABC"
                        value={invoiceHeader.invoiceRefNumber}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col mb-5">
                    <label htmlFor="supplier">Supplier:</label>
                    <input
                        type="text"
                        value="Tanay"
                        id="supplier"
                        placeholder="1214"
                        readOnly
                    />
                </div>
            </div>
            <div className=" flex flex-col justify-between w-64">
                <div className="flex flex-col ">
                    <label htmlFor="paymentTerm">Payment Term:</label>
                    <select
                        id="paymentTerm"
                        className="mb-4"
                        value={invoiceHeader.paymentTerm}
                        onChange={handleChange}
                    >
                        <option value="Select a Term">Select a Term</option>
                        <option value="30">30Days</option>
                        <option value="60">60Days</option>
                        <option value="90">90Days</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="invoicingCompany">Invoicing Company:</label>

                    <select
                        id="invoicingCompany"
                        value={invoiceHeader.invoicingCompany}
                        onChange={handleChange}
                    >
                        <option> Select a Company</option>
                        {suppliers.map((supplier) => (
                            // console.log(supplier)
                            <option key={supplier.S_SupNum}>
                                {supplier.S_SuppName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="invoiceDate">Invoice Date:</label>
                    <input
                        type="date"
                        id="invoiceDate"
                        placeholder="1/1/2023"
                        value={invoiceHeader.invoiceDate}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="invoiceHeaderNotes">
                        Invoice Header Notes:
                    </label>
                    <textarea
                        id="invoiceHeaderNotes"
                        placeholder="Payment Method etc."
                        value={invoiceHeader.invoiceHeaderNotes}
                        onChange={handleChange}
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

export default FormHeaders;
