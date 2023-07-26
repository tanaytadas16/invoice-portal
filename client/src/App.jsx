import "./App.css";
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { InvoiceList } from "./components/InvoiceList";
import Invoice from "./components/Invoice";
import Landing from "./components/Landing";

import Form from "./components/Form";
import NotFound from "./components/NotFound";
import NavLinks from "./components/NavLinks";
import Loading from "./components/Loading";
import { ViewInvoice } from "./components/PrintInvoice";

function App() {
    return (
        <Suspense fallback={<Loading />}>
            <BrowserRouter>
                <NavLinks />

                <Routes>
                    <Route path="/" element={<Landing />}></Route>
                    <Route path="/invoices" element={<InvoiceList />} />

                    <Route
                        path="/view/invoice/:invoiceId"
                        element={<Invoice />}
                    />
                    <Route path="/form" element={<Form />} />
                    <Route path="/print" element={<ViewInvoice />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
}

export default App;
