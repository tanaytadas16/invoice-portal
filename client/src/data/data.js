let invoiceList = [
    {
        clientName: "ABC Corporation",
        invoiceNumber: 5,
        lineItems: [
            {
                description: "Web Development",
                quantity: 10,
                rate: 50,
            },
            {
                description: "Graphic Design",
                quantity: 5,
                rate: 40,
            },
            {
                description: "Content Writing",
                quantity: 8,
                rate: 30,
            },
        ],
        hoursOfWork: 60,
        rate: 50,
        workRelatedExpense: 100,
        materials: 200,
        labor: 300,
        invoiceDate: "19-07-2023",
        dueDate: "19-08-2023",
        paymentMethod: "Bank Transfer",
        paymentTerm: "Net 30 Days",
        status: "Unpaid",
        totalBill: 50000,
    },
    {
        clientName: "XYZ Corporation",
        invoiceNumber: "INV-002",
        lineItems: [
            {
                description: "Web Development",
                quantity: 10,
                rate: 50,
            },
            {
                description: "Graphic Design",
                quantity: 5,
                rate: 40,
            },
            {
                description: "Content Writing",
                quantity: 8,
                rate: 30,
            },
            {
                description: "SEO Services",
                quantity: 12,
                rate: 60,
            },
        ],
        hoursOfWork: 60,
        rate: 50,
        workRelatedExpense: 100,
        materials: 200,
        labor: 300,
        invoiceDate: "2023-07-20",
        dueDate: "2023-08-20",
        paymentMethod: "Credit Card",
        paymentTerm: "Net 45 Days",
        notes: "Please make the payment by the due date. Thank you for your business!",
        status: "Paid",
        totalBill: 24000,
    },
];

export default invoiceList;
