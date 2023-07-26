import React from "react";

const Landing = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="bg-gray-100 min-h-screen">
                <header className="bg-blue-500 py-4">
                    <div className="container mx-auto">
                        <h1 className="text-white text-4xl font-bold">
                            Invoicing Portal
                        </h1>
                    </div>
                </header>
                <main className="container mx-auto py-8">
                    <section className="text-center">
                        <h2 className="text-3xl font-bold mb-4">
                            Welcome to Our Portal
                        </h2>
                        <p className="text-gray-600">
                            Manage your invoices easily with our user-friendly
                            invoicing portal.
                        </p>
                    </section>
                    <section className="mt-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold mb-4">
                                    Create Invoices
                                </h3>
                                <p>
                                    Easily create and manage invoices for your
                                    clients with our intuitive interface.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold mb-4">
                                    Track Payments
                                </h3>
                                <p>
                                    Keep track of payments and get a clear
                                    overview of your outstanding and paid
                                    invoices.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold mb-4">
                                    Generate Reports
                                </h3>
                                <p>
                                    Generate reports to analyze your business
                                    performance and track invoicing trends.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold mb-4">
                                    Secure & Reliable
                                </h3>
                                <p>
                                    Rest assured that your data is safe and
                                    secure with our robust security measures.
                                </p>
                            </div>
                        </div>
                    </section>
                </main>
                {/* <footer className="bg-blue-500  py-4 text-center text-white">
                    <p>
                        &copy; {new Date().getFullYear()} Invoicing Portal. All
                        rights reserved.
                    </p>
                </footer> */}
            </div>
        </div>
    );
};

export default Landing;
