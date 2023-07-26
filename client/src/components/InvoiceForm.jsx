import React, { useState } from "react";
// import "../App.css";

const InvoiceForm = ({ onSubmit }) => {
    const [lineItems, setLineItems] = useState([
        { description: "", quantity: 1, rate: 0, type: "hoursOfWork" },
    ]);

    const handleAddLineItem = () => {
        setLineItems([
            ...lineItems,
            { description: "", quantity: 1, rate: 0, type: "hoursOfWork" },
        ]);
    };

    const handleChangeLineItem = (index, field, value) => {
        const updatedLineItems = [...lineItems];
        updatedLineItems[index][field] = value;
        setLineItems(updatedLineItems);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const invoice = {
            clientName: formData.get("clientName"),
            invoiceNumber: formData.get("invoiceNumber"),
            lineItems,
            hoursOfWork: Number(formData.get("hoursOfWork")),
            rate: Number(formData.get("rate")),
            workRelatedExpense: Number(formData.get("workRelatedExpense")),
            materials: Number(formData.get("materials")),
            labor: Number(formData.get("labor")),
            invoiceDate: formData.get("invoiceDate"),
            dueDate: formData.get("dueDate"),
            paymentMethod: formData.get("paymentMethod"),
            paymentTerm: formData.get("paymentTerm"),
        };
        onSubmit(invoice);
    };

    return (
        <form onSubmit={handleSubmit}>
            <main
                className="m-5 p-5 xx
                l:grid grid-cols-2 gap-10 xl:items-start"
                style={{
                    margin: "auto",
                }}
            >
                <section>
                    <div className="bg-white p-5 rounded shadow">
                        <div className="flex flex-col justify-center">
                            <article className="md:grid grid-cols-2 gap-10 md:mt-16">
                                <div className="flex flex-col">
                                    <label htmlFor="clientName">
                                        Enter your client's name
                                    </label>
                                    <input
                                        type="text"
                                        name="clientName"
                                        id="clientName"
                                        placeholder="Enter your client's name"
                                        autoComplete="off"
                                        // value={clientName}
                                        // onChange={(e) =>
                                        //     setClientName(e.target.value)
                                        // }
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="clientAddress">
                                        Enter your client's address
                                    </label>
                                    <input
                                        type="text"
                                        name="clientAddress"
                                        id="clientAddress"
                                        placeholder="Enter your client's address"
                                        autoComplete="off"
                                        // value={clientAddress}
                                        // onChange={(e) =>
                                        //     setClientAddress(e.target.value)
                                        // }
                                    />
                                </div>
                            </article>

                            <article className="md:grid grid-cols-3 gap-10">
                                <div className="flex flex-col">
                                    <label htmlFor="invoiceNumber">
                                        Invoice Number
                                    </label>
                                    <input
                                        type="text"
                                        name="invoiceNumber"
                                        id="invoiceNumber"
                                        placeholder="Invoice Number"
                                        autoComplete="off"
                                        // value={invoiceNumber}
                                        // onChange={(e) =>
                                        //     setInvoiceNumber(e.target.value)
                                        // }
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="invoiceDate">
                                        Invoice Date
                                    </label>
                                    <input
                                        type="date"
                                        name="invoiceDate"
                                        id="invoiceDate"
                                        placeholder="Invoice Date"
                                        autoComplete="off"
                                        // value={invoiceDate}
                                        // onChange={(e) =>
                                        //     setInvoiceDate(e.target.value)
                                        // }
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="dueDate">Due Date</label>
                                    <input
                                        type="date"
                                        name="dueDate"
                                        id="dueDate"
                                        placeholder="Invoice Date"
                                        autoComplete="off"
                                        // value={dueDate}
                                        // onChange={(e) => setDueDate(e.target.value)}
                                    />
                                </div>
                            </article>

                            <div>
                                <h3>Line Items</h3>
                                {lineItems.map((item, index) => (
                                    <div key={index}>
                                        <label
                                            htmlFor={`lineItems[${index}].description`}
                                        >
                                            Description
                                        </label>
                                        <input
                                            type="text"
                                            name={`lineItems[${index}].description`}
                                            value={item.description}
                                            onChange={(e) =>
                                                handleChangeLineItem(
                                                    index,
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <label
                                            htmlFor={`lineItems[${index}].quantity`}
                                        >
                                            Quantity
                                        </label>
                                        <input
                                            type="number"
                                            name={`lineItems[${index}].quantity`}
                                            value={item.quantity}
                                            onChange={(e) =>
                                                handleChangeLineItem(
                                                    index,
                                                    "quantity",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <label
                                            htmlFor={`lineItems[${index}].rate`}
                                        >
                                            Rate
                                        </label>
                                        <input
                                            type="number"
                                            name={`lineItems[${index}].rate`}
                                            value={item.rate}
                                            onChange={(e) =>
                                                handleChangeLineItem(
                                                    index,
                                                    "rate",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        {/* Type of Service Dropdown */}
                                        <select
                                            name={`lineItems[${index}].type`}
                                            value={item.type}
                                            onChange={(e) =>
                                                handleChangeLineItem(
                                                    index,
                                                    "type",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="hoursOfWork">
                                                Hours of Work
                                            </option>
                                            <option value="workRelatedExpense">
                                                Work-related Expense
                                            </option>
                                            <option value="materials">
                                                Materials
                                            </option>
                                            <option value="labor">Labor</option>
                                        </select>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={handleAddLineItem}
                                >
                                    Add Line Item
                                </button>
                            </div>

                            {/* Other Fields */}
                            <div>
                                <label htmlFor="hoursOfWork">
                                    Hours of Work
                                </label>
                                <input
                                    type="number"
                                    name="hoursOfWork"
                                    id="hoursOfWork"
                                />

                                <label htmlFor="rate">Rate</label>
                                <input type="number" name="rate" id="rate" />
                            </div>

                            {/* Invoice Date */}
                            <div>
                                <label htmlFor="invoiceDate">
                                    Invoice Date
                                </label>
                                <input
                                    type="date"
                                    name="invoiceDate"
                                    id="invoiceDate"
                                />
                            </div>

                            {/* Due Date */}
                            <div>
                                <label htmlFor="dueDate">Due Date</label>
                                <input
                                    type="date"
                                    name="dueDate"
                                    id="dueDate"
                                />
                            </div>

                            {/* Payment Method */}
                            <div>
                                <label htmlFor="paymentMethod">
                                    Payment Method
                                </label>
                                <input
                                    type="text"
                                    name="paymentMethod"
                                    id="paymentMethod"
                                />
                            </div>

                            {/* Payment Term */}
                            <div>
                                <label htmlFor="paymentTerm">
                                    Payment Term
                                </label>
                                <input
                                    type="text"
                                    name="paymentTerm"
                                    id="paymentTerm"
                                />
                            </div>

                            {/* Submit Button */}
                            <button type="submit">Create Invoice</button>
                        </div>
                    </div>
                </section>
            </main>
        </form>
    );
};

export default InvoiceForm;
