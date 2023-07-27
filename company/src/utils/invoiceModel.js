import mongoose from "mongoose";
const { Schema, models, model } = mongoose;

const invoiceItemSchema = new mongoose.Schema({
    InvItemNum: { type: Number, required: true },
    ProdType: { type: String, required: true, enum: ["Material", "Service"] },
    Description: { type: String, required: true },
    Quantity: { type: Number, required: true },
    Unit: {
        type: String,
        required: true,
        enum: ["EA", "Hours", "Day", "Month"],
    },
    Price: { type: Number, required: true },
    Amt: { type: Number, required: true },
    Dis: { type: Number, required: true },
    OtherCharge: { type: Number, required: true },
    Taxes: { type: Number, required: true },
    GrossAmt: { type: Number, required: true },
    ItemText: { type: String, required: true },
    InvLineDt: { type: Date, required: true },
    InvlineCreator: { type: String, required: true },
    Lastmoddt: { type: Date, required: true },
});

const invoiceSchema = new mongoose.Schema({
    InvNum: { type: String, required: true },
    InvoiceStatus: {
        type: String,
        required: true,
        enum: ["Submitted", "Approved", "Declined", "Paid", "Reconcile"],
    },
    InvRefNumber: { type: String },
    Supplier: { type: String, required: true },
    PaymentTerm: {
        type: String,
        required: true,
        enum: ["60", "30", "90"],
    },
    InvoicingCompany: { type: String, required: true },
    InvoiceDate: { type: Date, required: true },
    dueDate: { type: Date },
    InvoiceHeaderNotes: { type: String },
    InvoiceLineItems: [invoiceItemSchema],
    InvoiceTotals: {
        totalAmount: { type: Number, default: 0 },
        totalDiscount: { type: Number, default: 0 },
        totalOtherCharges: { type: Number, default: 0 },
        totalTax: { type: Number, default: 0 },
        grossTotal: { type: Number, default: 0 },
    },
});

invoiceSchema.pre("create", function (next) {
    // Calculate the due date based on the invoice date and payment term
    const { invoiceDate, paymentTerm } = this;
    const paymentTermInDays = parseInt(paymentTerm);
    const dueDate = new Date(invoiceDate);
    dueDate.setDate(dueDate.getDate() + paymentTermInDays);
    this.dueDate = dueDate;

    next();
});

export const Invoice = models.Invoice || model("Invoice", invoiceSchema);
