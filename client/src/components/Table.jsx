import React from "react";
import { useInvoiceContext } from "../context/InvoiceContext";
import "../styles/Form.css";

const Table = () => {
    const { invoiceLineItems, setInvoiceLineItems, addRow, deleteRow } =
        useInvoiceContext();

    const handleChange = (event, lineNumber, field) => {
        const updatedValue = event.target.value;

        // Find the line item in the invoiceLineItems array
        const updatedLineItems = invoiceLineItems.map((item) => {
            const quantity = parseFloat(item.quantity);
            const price = parseFloat(item.price);
            const amount = parseFloat(item.amount);
            const discount = parseFloat(item.discount);
            const taxes = parseFloat(item.taxes);
            const otherCharges = parseFloat(item.otherCharges);

            if (item.lineNumber === lineNumber) {
                let lineGrossAmount =
                    quantity * price -
                    (amount * discount) / 100 +
                    (amount * taxes) / 100 +
                    otherCharges;
                return {
                    ...item,
                    [field]: updatedValue,
                    lineGrossAmount: lineGrossAmount,
                };
            }
            return item;
        });

        // Update the invoiceLineItems in the context
        setInvoiceLineItems(updatedLineItems);
    };

    return (
        //     {/* Invoice Line Items */}
        <div className="invoice-line-items">
            <table>
                <thead>
                    <tr>
                        <th>Item Number</th>
                        <th>Product Type</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Unit</th>
                        <th>Price</th>
                        <th>Amount</th>
                        <th>Discount %</th>
                        <th>Other Charges</th>
                        <th>Taxes %</th>
                        <th>Item Gross Amount</th>
                        <th>Item Text</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {invoiceLineItems.map((item) => (
                        <tr key={item.lineNumber}>
                            <td>
                                <input
                                    type="text"
                                    className="lineNumber"
                                    value={item.lineNumber}
                                    readOnly
                                />
                            </td>
                            <td>
                                <select
                                    required
                                    value={item.productType}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            item.lineNumber,
                                            "productType"
                                        )
                                    }
                                >
                                    <option value="Select">Select</option>
                                    <option value="Material">Material</option>
                                    <option value="Service">Service</option>
                                </select>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className="description"
                                    placeholder="Pen"
                                    value={item.description}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            item.lineNumber,
                                            "description"
                                        )
                                    }
                                    required
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    className="quantity"
                                    value={item.quantity}
                                    placeholder="10"
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            item.lineNumber,
                                            "quantity"
                                        )
                                    }
                                />
                            </td>
                            <td>
                                <select
                                    value={item.unit}
                                    onChange={(e) =>
                                        handleChange(e, item.lineNumber, "unit")
                                    }
                                    required
                                >
                                    <option value="Select">Select</option>
                                    <option value="EA">EA</option>
                                    <option value="Hours">Hours</option>
                                    <option value="Day">Day</option>
                                    <option value="Month">Month</option>
                                </select>
                            </td>
                            <td>
                                <input
                                    type="number"
                                    className="price"
                                    placeholder="20"
                                    value={item.price}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            item.lineNumber,
                                            "price"
                                        )
                                    }
                                    required
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    className="amount"
                                    placeholder="200"
                                    value={item.amount}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            item.lineNumber,
                                            "amount"
                                        )
                                    }
                                    required
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    className="discount"
                                    placeholder="10"
                                    value={item.discount}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            item.lineNumber,
                                            "discount"
                                        )
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    className="otherCharges"
                                    placeholder="5"
                                    value={item.otherCharges}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            item.lineNumber,
                                            "otherCharges"
                                        )
                                    }
                                    required
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    className="taxes"
                                    placeholder="5"
                                    value={item.taxes}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            item.lineNumber,
                                            "taxes"
                                        )
                                    }
                                    required
                                />
                            </td>
                            <td>
                                <input
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            item.lineNumber,
                                            "lineGrossAmount"
                                        )
                                    }
                                    value={
                                        !isNaN(item.quantity) &&
                                        !isNaN(item.price) &&
                                        !isNaN(item.amount) &&
                                        !isNaN(item.discount) &&
                                        !isNaN(item.taxes) &&
                                        !isNaN(item.otherCharges)
                                            ? Number(item.quantity) *
                                                  Number(item.price) -
                                              (Number(item.amount) *
                                                  Number(item.discount)) /
                                                  100 +
                                              (Number(item.amount) *
                                                  Number(item.taxes)) /
                                                  100 +
                                              Number(item.otherCharges)
                                            : ""
                                    }
                                    readOnly
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className="lineItemText"
                                    placeholder="Model, Names etc."
                                    value={item.lineItemText}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            item.lineNumber,
                                            "lineItemText"
                                        )
                                    }
                                />
                            </td>
                            <td
                                // className="action-button flex flex-row  "
                                onClick={() => deleteRow(item.lineNumber)}
                            >
                                <div className="w-6 ml-8 transform justify-center hover:scale-110">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
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
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div onClick={addRow} className="text-center">
                + Add Row
            </div>
        </div>
    );
};

export default Table;
