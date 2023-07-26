import React, { createContext, useState, useContext, useEffect } from "react";

const InvoiceContext = createContext();

export const useInvoiceContext = () => useContext(InvoiceContext);

const InvoiceProvider = ({ children }) => {
    const [invoiceHeader, setInvoiceHeader] = useState({
        invoiceNumber: "",
        invoiceStatus: "",
        invoiceRefNumber: "",
        supplier: "",
        paymentTerm: "",
        invoicingCompany: "",
        invoiceDate: "",
        invoiceHeaderNotes: "",
        invoiceTotals: {
            totalAmount: 0,
            totalDiscount: 0,
            totalOtherCharges: 0,
            totalTax: 0,
            grossTotal: 0,
        },
    });

    const [invoiceLineItems, setInvoiceLineItems] = useState([
        {
            lineNumber: 1,
            productType: "",
            description: "",
            quantity: "",
            unit: "",
            price: "",
            amount: "",
            discount: "",
            otherCharges: "",
            taxes: "",
            lineGrossAmount: "",
            lineItemText: "",
        },
    ]);
    const calculateGrossAmount = (item) => {
        const quantity = parseFloat(item.quantity) || 0;
        const price = parseFloat(item.price) || 0;
        const amount = parseFloat(item.amount) || 0;
        const discount = parseFloat(item.discount) || 0;
        const taxes = parseFloat(item.taxes) || 0;
        const otherCharges = parseFloat(item.otherCharges) || 0;

        const grossAmount =
            quantity * price -
            amount -
            (amount * discount) / 100 +
            (amount * taxes) / 100 +
            otherCharges;
        return isNaN(grossAmount) ? 0 : grossAmount;
    };

    // // Function to update gross amount for all line items
    // const updateGrossAmounts = () => {
    //     const updatedLineItems = invoiceLineItems.map((item) => {
    //         const grossAmount = calculateGrossAmount(item);
    //         return { ...item, lineGrossAmount: grossAmount };
    //     });
    //     setInvoiceLineItems(updatedLineItems);
    // };

    // Calculate totals
    const calculateTotals = (lineItems) => {
        const totalAmount = lineItems.reduce(
            (total, item) => total + parseFloat(item.amount || 0),
            0
        );
        const totalDiscount = lineItems.reduce(
            (total, item) =>
                total +
                (parseFloat(item.amount) * parseFloat(item.discount || 0)) /
                    100,
            0
        );
        const totalOtherCharges = lineItems.reduce(
            (total, item) => total + parseFloat(item.otherCharges || 0),
            0
        );
        const totalTax = lineItems.reduce(
            (total, item) =>
                total +
                (parseFloat(item.amount) * parseFloat(item.taxes || 0)) / 100,
            0
        );
        const grossTotal =
            totalAmount - totalDiscount + totalOtherCharges + totalTax;

        return {
            totalAmount,
            totalDiscount,
            totalOtherCharges,
            totalTax,
            grossTotal,
        };
    };
    const [invoiceTotals, setInvoiceTotals] = useState(
        calculateTotals(invoiceLineItems)
    );

    // Functions to update the state
    const addRow = () => {
        const newLineNumber = invoiceLineItems.length + 1;
        setInvoiceLineItems((prevItems) => [
            ...prevItems,
            { lineNumber: newLineNumber },
        ]);
    };

    const deleteRow = (lineNumber) => {
        setInvoiceLineItems((prevItems) =>
            prevItems.filter((item) => item.lineNumber !== lineNumber)
        );
    };

    const [selectedSupplier, setSelectedSupplier] = useState([
        {
            S_CorpAddr: "",
            S_Email: "",
            S_Phone: "",
            S_RemitAdd: "",
            S_SupNum: "",
            S_SuppName: "",
            isInvoicingCompany: true,
        },
    ]);

    const resetContext = () => {
        setInvoiceHeader({
            invoiceNumber: "",
            invoiceStatus: "",
            invoiceRefNumber: "",
            supplier: "",
            paymentTerm: "",
            invoicingCompany: "",
            invoiceDate: "",
            invoiceHeaderNotes: "",
        });
        setSelectedSupplier({
            S_CorpAddr: "",
            S_Email: "",
            S_Phone: "",
            S_RemitAdd: "",
            S_SupNum: "",
            S_SuppName: "",
            isInvoicingCompany: true,
        });
        setInvoiceLineItems([
            {
                lineNumber: 1,
                productType: "",
                description: "",
                quantity: "",
                unit: "",
                price: "",
                amount: "",
                discount: "",
                otherCharges: "",
                taxes: "",
                lineGrossAmount: "",
                lineItemText: "",
            },
        ]);
    };

    useEffect(() => {
        // Call the calculateTotals function whenever invoiceLineItems change
        const totals = calculateTotals(invoiceLineItems);
        // Update the totals in the context

        setInvoiceTotals(totals);
        setInvoiceHeader((prevHeader) => ({
            ...prevHeader,
            invoiceTotals: totals,
        }));
        calculateGrossAmount(invoiceLineItems);
    }, [invoiceLineItems]);

    return (
        <InvoiceContext.Provider
            value={{
                invoiceHeader,
                invoiceLineItems,
                setInvoiceLineItems,
                setInvoiceHeader,
                invoiceTotals,
                addRow,
                deleteRow,
                resetContext,
                selectedSupplier,
                setSelectedSupplier,
            }}
        >
            {children}
        </InvoiceContext.Provider>
    );
};

export default InvoiceProvider;
