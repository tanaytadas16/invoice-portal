import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import InvoiceProvider from "./context/InvoiceContext";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <InvoiceProvider>
            <App />
        </InvoiceProvider>
    </React.StrictMode>
);
