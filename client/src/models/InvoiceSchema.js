const mongoose = require("mongoose");

// Invoice Header Schema
const invoiceHeaderSchema = new mongoose.Schema({
    InvoiceNumber: {
        type: String,
        required: true,
        unique: true,
    },
    InvoiceReferenceNumber: {
        type: String,
        required: true,
    },
    Supplier: {
        type: String,
        required: true,
    },
    PaymentTerm: {
        type: String,
        required: true,
        enum: ["120D", "30D", "90D"],
    },
    InvoicingCompany: {
        type: String,
        required: true,
    },
    InvoiceHeaderNotes: {
        type: String,
        maxLength: 20000,
    },
    InvoiceTotal: {
        type: Number,
        required: true,
    },
    InvoiceStatus: {
        type: String,
        required: true,
    },
    InvoiceDate: {
        type: Date,
        required: true,
    },
    InvoiceCreator: {
        type: String,
        required: true,
    },
    LastModifyDate: {
        type: Date,
        required: true,
    },
});

const invoiceHeaderCollectionName = "Invoice Header";
const InvoiceHeader = mongoose.model(
    "InvoiceHeader",
    invoiceHeaderSchema,
    invoiceHeaderCollectionName
);

// Supplier Schema
const supplierSchema = new mongoose.Schema({
    SupplierNumber: {
        type: String,
        required: true,
        unique: true,
    },
    SupplierName: {
        type: String,
        required: true,
    },
    CorporateAddress: {
        type: String,
        maxLength: 400,
    },
    RemitToAddress: {
        type: String,
        maxLength: 4000,
    },
    Email: {
        type: String,
        required: true,
    },
    Phone: {
        type: Number,
    },
    CreateDate: {
        type: Date,
        required: true,
    },
    ModifyDate: {
        type: Date,
        required: true,
    },
});

const supplierCollectionName = "Supplier";
const Supplier = mongoose.model(
    "Supplier",
    supplierSchema,
    supplierCollectionName
);

// Invoice Item Schema
const invoiceItemSchema = new mongoose.Schema({
    InvoiceNumber: {
        type: String,
        required: true,
    },
    InvoiceLineNumber: {
        type: Number,
        required: true,
    },
    productType: {
        type: String,
        enum: ["Material", "Service"],
        required: true,
    },
    Description: {
        type: String,
        maxLength: 400,
    },
    Quantity: {
        type: Number,
        required: true,
    },
    Unit: {
        type: String,
        enum: ["Each", "Hours", "Day", "Month"],
        required: true,
    },
    Price: {
        type: Number,
        required: true,
    },
    Amount: {
        type: Number,
        required: true,
    },
    Discount: {
        type: Number,
        default: 0,
    },
    OtherCharges: {
        type: Number,
        default: 0,
    },
    Taxes: {
        type: Number,
        default: 0,
    },
    GrossAmount: {
        type: Number,
        required: true,
    },
    LineItemText: {
        type: String,
        maxLength: 20000,
    },
    InvoiceLineDate: {
        type: Date,
        required: true,
    },
    InvoiceLineCreator: {
        type: String,
        required: true,
    },
    LastModifyDate: {
        type: Date,
        required: true,
    },
});

const invoiceItemCollectionName = "Invoice Item";
const InvoiceItem = mongoose.model(
    "InvoiceItem",
    invoiceItemSchema,
    invoiceItemCollectionName
);

module.exports = {
    InvoiceHeader,
    Supplier,
    InvoiceItem,
};
