import { NextRequest, NextResponse } from "next/server";
import { addInvoice, getAllInvoices } from "../../../_data/_data";

export async function GET(req, res) {
    try {
        console.log("GET:  Tanay");
        const allInvoices = getAllInvoices();
        return NextResponse.json(allInvoices);
    } catch (error) {
        console.error(error);
        NextResponse.error({ error: "Server Error" });
    }
}

export async function POST(req, res) {
    try {
        console.log("POST ::Tanay");
        const { invoiceData } = req.body;
        const newInvoice = addInvoice(invoiceData);
        return NextResponse.json(newInvoice);
    } catch (error) {
        console.error(error);
        NextResponse.error({ error: "Server Error" });
    }
}
