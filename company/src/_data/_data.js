// data.js
let invoices = [
    {
        _id: {
            $oid: "64c08ec3dba4af2fe73b1032",
        },
        InvNum: "105",
        InvoiceStatus: "Paid",
        Supplier: "MNO Supplier",
        PaymentTerm: "30D",
        InvoicingCompany: "RST Corp",
        InvoiceDate: "2023-07-05",
        dueDate: "2023-08-04",
        InvoiceHeaderNotes: "Sample invoice 5",
        InvoiceLineItems: [
            {
                InvItemNum: 1,
                ProdType: "Service",
                Description: "Service E",
                Quantity: 12,
                Unit: "Hours",
                Price: 60,
                Amt: 720,
                Dis: 0,
                OtherCharge: 0,
                Taxes: 36,
                GrossAmt: 756,
                ItemText: "Sample service",
                InvLineDt: "2023-07-05",
                InvlineCreator: "Tom Wilson",
                Lastmoddt: "2023-07-05",
            },
        ],
        InvoiceTotals: {
            totalAmount: 720,
            totalDiscount: 0,
            totalOtherCharges: 0,
            totalTax: 36,
            grossTotal: 756,
        },
    },
];

export function getAllInvoices() {
    return invoices;
}

export function addInvoice(invoiceData) {
    const newInvoice = {
        id: Date.now().toString(),
        ...invoiceData,
    };
    invoices.push(newInvoice);
    return newInvoice;
}
