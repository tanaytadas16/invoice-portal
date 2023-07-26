import React from "react";
import { useInvoiceContext } from "../context/InvoiceContext";

const Totals = () => {
    const { invoiceLineItems, invoiceTotals, setInvoiceTotals } =
        useInvoiceContext();

    return (
        <div className="flex flex-row text-xs mx-4 mb-7 float-right justify-between box-content bg-white rounded-md shadow-md p-4">
            <div className="flex flex-col ">
                <div className="totals flex flex-col justify-end">
                    <div>
                        <label htmlFor="totalAmount">Total Amount:</label>
                        <input
                            type="number"
                            id="totalAmount"
                            // placeholder="300"
                            value={invoiceTotals.totalAmount}
                            readOnly
                        />
                    </div>

                    <div>
                        <label htmlFor="totalDiscount">Total Discount:</label>
                        <input
                            type="number"
                            id="totalDiscount"
                            value={invoiceTotals.totalDiscount}
                            // placeholder="20"
                            readOnly
                        />
                    </div>

                    <div>
                        <label htmlFor="totalOtherCharges">
                            Total Other Charges:
                        </label>
                        <input
                            type="number"
                            id="totalOtherCharges"
                            value={invoiceTotals.totalOtherCharges}
                            // placeholder="10"
                            readOnly
                        />
                    </div>

                    <div>
                        <label htmlFor="totalTax">Total Tax:</label>
                        <input
                            type="number"
                            id="totalTax"
                            value={invoiceTotals.totalTax}
                            // placeholder="10"
                            readOnly
                        />
                    </div>

                    <div>
                        <label htmlFor="grossTotal">Gross Total:</label>
                        <input
                            type="number"
                            id="grossTotal"
                            value={invoiceTotals.grossTotal}
                            // placeholder="300"
                            readOnly
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Totals;
