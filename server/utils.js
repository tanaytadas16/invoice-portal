export const mapDataToSchema = (incomingData) => {
    console.log();
    const invoiceLineItems = incomingData.invoiceLineItems.map((item) => ({
        InvItemNum: item.lineNumber,
        ProdType: item.productType,
        Description: item.description,
        Quantity: parseFloat(item.quantity),
        Unit: item.unit,
        Price: parseFloat(item.price),
        Amt: parseFloat(item.amount),
        Dis: parseFloat(item.discount),
        OtherCharge: parseFloat(item.otherCharges),
        Taxes: parseFloat(item.taxes),
        GrossAmt: item.lineGrossAmount,
        ItemText: item.lineItemText,
        InvLineDt: new Date(), // Set the date as needed
        InvlineCreator: "John Doe", // Set the creator as needed
        Lastmoddt: new Date(), // Set the last modified date as needed
    }));

    const invoiceHeader = {
        InvNum: incomingData.invoiceHeader.invoiceNumber,
        InvoiceStatus: incomingData.invoiceHeader.invoiceStatus,
        InvRefNumber: incomingData.invoiceHeader.invoiceRefNumber,
        Supplier: "Tanay",
        PaymentTerm: incomingData.invoiceHeader.paymentTerm,
        InvoicingCompany: incomingData.invoiceHeader.invoicingCompany,
        InvoiceDate: new Date(incomingData.invoiceHeader.invoiceDate),
        dueDate: null, // Set the due date as needed
        InvoiceHeaderNotes: incomingData.invoiceHeader.invoiceHeaderNotes,
        InvoiceLineItems: invoiceLineItems,
        InvoiceTotals: {
            totalAmount: incomingData.invoiceHeader.invoiceTotals.totalAmount,
            totalDiscount:
                incomingData.invoiceHeader.invoiceTotals.totalDiscount,
            totalOtherCharges:
                incomingData.invoiceHeader.invoiceTotals.totalOtherCharges,
            totalTax: incomingData.invoiceHeader.invoiceTotals.totalTax,
            grossTotal: incomingData.invoiceHeader.invoiceTotals.grossTotal,
        },
    };
    return invoiceHeader;
};
