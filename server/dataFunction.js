import mongoose from "mongoose";
import { Invoice, Supplier } from "./invoiceModel.js";
import { mapDataToSchema } from "./utils.js";

const createInvoice = async (newInvoiceData) => {
    try {
        const mappedData = mapDataToSchema(newInvoiceData);

        const { InvoiceDate, PaymentTerm } = mappedData;
        const parsedInvoiceDate = new Date(InvoiceDate); // Attempt to parse the date
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

        // Add the calculated due date to the newInvoiceData object
        mappedData.dueDate = dueDate;

        // Update the status based on the current date and due date
        // const currentDate = new Date();
        // if (currentDate > dueDate) {
        //     newInvoiceData.InvoiceStatus = "Overdue";
        // } else if (currentDate === dueDate) {
        //     newInvoiceData.InvoiceStatus = "Pending";
        // } else {
        //     newInvoiceData.InvoiceStatus = "Paid";
        // }
        // console.log(mappedData);
        const newInvoice = await Invoice.create(mappedData);

        return newInvoice;
    } catch (error) {
        console.error("Error creating invoice: " + error.message);
    }
};

// Get all invoices
const getAllInvoices = async () => {
    try {
        const invoices = await Invoice.find();
        return invoices;
    } catch (error) {
        console.error("Error retrieving invoices: " + error.message);
        return error;
    }
};

// Get a specific invoice by ID
const getInvoiceById = async (invNum) => {
    try {
        const invoice = await Invoice.findOne({ InvNum: invNum });

        if (!invoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }

        return invoice;
    } catch (error) {
        console.error("Error retrieving invoices: " + error.message);
    }
};

// Update an invoice by ID
const updateInvoiceById = async (id, updatedInvoiceData) => {
    try {
        const updatedInvoice = await Invoice.findByIdAndUpdate(
            id,
            updatedInvoiceData,
            { new: true }
        );
        if (!updatedInvoice) {
            throw new Error("Invoice not found");
        }
        return updatedInvoice;
    } catch (error) {
        console.error("Error updating invoices: " + error.message);
    }
};

// Delete an invoice by ID
const deleteInvoiceById = async (id) => {
    try {
        const deletedInvoice = await Invoice.findByIdAndDelete(id);
        if (!deletedInvoice) {
            throw new Error("Invoice not found");
        }
        return deletedInvoice;
    } catch (error) {
        console.error("Error deleting invoices: " + error.message);
    }
};

const getAllSuppliers = async () => {
    try {
        const suppliers = await Supplier.find({
            isInvoicingCompany: true,
        });

        return suppliers;
    } catch (error) {
        console.error("Error retrieving suppliers: " + error.message);
    }
};

export {
    createInvoice,
    getAllInvoices,
    getInvoiceById,
    updateInvoiceById,
    deleteInvoiceById,
    getAllSuppliers,
};
