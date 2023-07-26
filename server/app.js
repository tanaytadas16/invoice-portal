import express from "express";
import { connect } from "./dbConfig.js";
import {
    createInvoice,
    getAllInvoices,
    getInvoiceById,
    getAllSuppliers,
} from "./dataFunction.js";
import cors from "cors";

const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
    res.send("Hello, Navigate to appropriate API endpoint");
});
// Create an invoice (POST request)
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

// Get all invoices (GET request)
app.get("/api/invoices", async (req, res) => {
    const allInvoices = await getAllInvoices();
    res.status(200).json(allInvoices);
});

// Get a specific invoice by ID (GET request)
app.get("/api/invoices/:invNum", async (req, res) => {
    const invNum = req.params.invNum;
    const InvoiceById = await getInvoiceById(invNum);

    if (!InvoiceById) {
        return res.status(404).json({ message: "Invoice not found" });
    }

    res.status(200).json(InvoiceById);
});

app.put("/api/invoiceResponse/:id", async (req, res) => {
    const { id } = req.params;
    const { status, empResponse } = req.body;

    try {
        // Find the invoice by ID in the database
        const invoice = await Invoice.findById(id);

        if (!invoice) {
            return res.status(404).json({ error: "Invoice not found" });
        }

        // Update the status and employee response
        invoice.invoiceStatus = status;
        invoice.employeeResponse = empResponse;

        // Save the updated invoice to the database
        const updatedInvoice = await invoice.save();

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
