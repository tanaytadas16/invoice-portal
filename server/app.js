import express from "express";
import { connect } from "./dbConfig.js";
import {
    createInvoice,
    getAllInvoices,
    getInvoiceById,
    getAllSuppliers,
} from "./dataFunction.js";
import { Invoice, Supplier } from "./invoiceModel.js";
import cors from "cors";

const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
    res.send("Hello, Navigate to appropriate API endpoint");
});

app.post("/api/invoices", async (req, res) => {
    try {
        const newInvoice = await createInvoice(req.body);
        res.status(201).json({ message: "Invoice Created!!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ Error: error });
    }
});
app.get("/api/suppliers", async (req, res) => {
    const allSuppliers = await getAllSuppliers();
    res.status(200).json(allSuppliers);
});

app.get("/api/invoices", async (req, res) => {
    const allInvoices = await getAllInvoices();
    res.status(200).json(allInvoices);
});

app.get("/api/invoices/:invNum", async (req, res) => {
    const invNum = req.params.invNum;
    const InvoiceById = await getInvoiceById(invNum);

    if (!InvoiceById) {
        return res.status(404).json({ message: "Invoice not found" });
    }

    res.status(200).json(InvoiceById);
});

app.put("/api/invoiceResponse", async (req, res) => {
    try {
        const { invoiceId, decision } = req.body;
        // console.log("From supp API", invoiceId, decision);
        const invoice = await Invoice.findOne({ InvNum: invoiceId });

        if (!invoice) {
            return res.status(404).json({ error: "Invoice not found" });
        }

        invoice.InvoiceStatus = decision;
        const updatedInvoice = await invoice.save();
        console.log("Company Decision Updated Successfully!");

        return res.status(200).json(updatedInvoice);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
});

const start = async () => {
    try {
        await connect();
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
start();
