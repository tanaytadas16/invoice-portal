import { NextRequest, NextResponse } from "next/server";
import { Invoice } from "../../../utils/invoiceModel";
import connectMongo from "../../../dbConfig/dbConfig";
import { mapDataToSchema } from "../../../utils/utils";

export async function GET(req, res) {
    try {
        // console.log("CONNECTING TO MONGO");
        await connectMongo();
        console.log("CONNECTED TO MONGO");
        const allInvoices = await Invoice.find();
        return NextResponse.json(allInvoices);
    } catch (error) {
        console.error(error);
        NextResponse.error({ error: "Invoices not found" }, { status: 500 });
    }
}

export async function POST(req, res) {
    try {
        await connectMongo();
        console.log("CONNECTED TO MONGO");
        const invoiceData = await req.json();
        console.log("POST :: Data Received");
        // const newInvoice = addInvoice(invoiceData);
        let mappedData = mapDataToSchema(invoiceData);
        const { InvoiceDate, PaymentTerm } = mappedData;

        let parsedInvoiceDate = new Date(InvoiceDate);

        const paymentTermInDays = parseInt(PaymentTerm);

        if (isNaN(parsedInvoiceDate.getTime())) {
            // If parsing failed, try a custom format (e.g., "YYYY-MM-DD")
            const dateParts = InvoiceDate.split("-");
            parsedInvoiceDate = new Date(
                parseInt(dateParts[0]), // Year
                parseInt(dateParts[1]) - 1, // Month (0-based index)
                parseInt(dateParts[2]) // Day
            );

            if (isNaN(parsedInvoiceDate.getTime())) {
                throw new Error("Invalid invoiceDate format.");
            }
        }

        const dueDate = new Date(parsedInvoiceDate);
        dueDate.setDate(dueDate.getDate() + paymentTermInDays);
        mappedData.dueDate = dueDate;

        // console.log("Mapped", mappedData);
        const createdInvoice = await Invoice.create(mappedData);

        if (createdInvoice) {
            console.log("Invoice Created in DB! ");
        }
        return NextResponse.json(createdInvoice, { status: 200 });
    } catch (error) {
        console.error(error);
        NextResponse.error({ error: "Can't Insert Invoice" }, { status: 500 });
    }
}

export async function PUT(req, res) {
    // await connectMongo();
    // console.log("CONNECTED TO MONGO");
    // const { id } = query;
    const { invoiceId, decision } = await req.json();

    const updatedInvoice = await Invoice.findOneAndUpdate(
        { InvNum: invoiceId },
        { InvoiceStatus: decision },
        { new: true }
    );

    if (updatedInvoice) {
        return NextResponse.json(updatedInvoice);
    } else {
        return NextResponse.error(
            { message: "Invoice Status cannot be updated" },
            { status: 404 }
        );
    }
}
