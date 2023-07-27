import { useRef } from "react";
import Link from "next/link";

const Table = ({ invoice, handleDecision }) => {
    const selectRef = useRef(null);

    return (
        <tbody className="text-gray-600 text-sm font-light">
            <tr className="border border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                    <div className="flex items-center">
                        <span className="font-medium">
                            {/* <Link to={`/view/invoice/${invoice.InvNum}`}> */}
                            {invoice.InvoicingCompany}
                            {/* </Link> */}
                        </span>
                    </div>
                </td>
                <td className="py-3 px-6 text-center">
                    <div className="flex justify-center">
                        <span>{invoice.InvNum}</span>
                    </div>
                </td>
                <td className="py-3 px-6 text-center">
                    <div className="flex justify-center">
                        <span>${invoice.InvoiceTotals.grossTotal}</span>
                    </div>
                </td>

                <td className="py-3 px-6 text-center">
                    <span
                        className={`bg-${
                            invoice.InvoiceStatus === "Paid" ? "green" : "red"
                        }-200 text-black-600 py-1 px-3 rounded-full text-xs`}
                        value={invoice.InvoiceStatus}
                    >
                        {invoice.InvoiceStatus}
                    </span>
                </td>
                <td className="py-3 px-6 text-left">
                    <div className="flex items-center">
                        <span>{invoice.dueDate.split("T")[0]}</span>
                    </div>
                </td>
                <td className="py-3 px-6 text-center flex flex-row  justify-evenly gap-4">
                    <select ref={selectRef}>
                        <option>Select</option>
                        <option>Approve</option>
                        <option>Decline</option>
                        <option>Paid</option>
                        <option>Reconcile</option>
                    </select>
                    <button
                        type="button"
                        className=" text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        onClick={() =>
                            handleDecision(
                                invoice.InvNum,
                                selectRef.current.value
                            )
                        }
                    >
                        Save
                    </button>
                </td>
                {/* <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center">
                        <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                            </svg>
                        </div>
                        <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                            </svg>
                        </div>
                        <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                            </svg>
                        </div>
                    </div>
                </td> */}
            </tr>
        </tbody>
        // <div class="text-gray-900 bg-gray-200">
        //     <div class="p-4 flex">
        //         <h1 class="text-3xl">Users</h1>
        //     </div>
        //     <div class="px-3 py-4 flex justify-center">
        //         <table class="w-full text-md bg-white shadow-md rounded mb-4">
        //             <tbody>
        //                 <tr class="border-b">
        //                     <th class="text-left p-3 px-5">Name</th>
        //                     <th class="text-left p-3 px-5">Email</th>
        //                     <th class="text-left p-3 px-5">Role</th>
        //                     <th></th>
        //                 </tr>
        //                 <tr class="border-b hover:bg-orange-100 bg-gray-100">
        //                     <td class="p-3 px-5">
        //                         <input
        //                             type="text"
        //                             value="user.name"
        //                             class="bg-transparent"
        //                         />
        //                     </td>
        //                     <td class="p-3 px-5">
        //                         <input
        //                             type="text"
        //                             value="user.email"
        //                             class="bg-transparent"
        //                         />
        //                     </td>
        //                     <td class="p-3 px-5">
        //                         <select
        //                             value="user.role"
        //                             class="bg-transparent"
        //                         >
        //                             <option value="user">user</option>
        //                             <option value="admin">admin</option>
        //                         </select>
        //                     </td>
        //                     <td class="p-3 px-5 flex justify-end">
        //                         <button
        //                             type="button"
        //                             class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
        //                         >
        //                             Save
        //                         </button>
        //                         <button
        //                             type="button"
        //                             class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
        //                         >
        //                             Delete
        //                         </button>
        //                     </td>
        //                 </tr>
        //                 <tr class="border-b hover:bg-orange-100">
        //                     <td class="p-3 px-5">
        //                         <input
        //                             type="text"
        //                             value="user.name"
        //                             class="bg-transparent"
        //                         />
        //                     </td>
        //                     <td class="p-3 px-5">
        //                         <input
        //                             type="text"
        //                             value="user.email"
        //                             class="bg-transparent"
        //                         />
        //                     </td>
        //                     <td class="p-3 px-5">
        //                         <select
        //                             value="user.role"
        //                             class="bg-transparent"
        //                         >
        //                             <option value="user">user</option>
        //                             <option value="admin">admin</option>
        //                         </select>
        //                     </td>
        //                     <td class="p-3 px-5 flex justify-end">
        //                         <button
        //                             type="button"
        //                             class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
        //                         >
        //                             Save
        //                         </button>
        //                         <button
        //                             type="button"
        //                             class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
        //                         >
        //                             Delete
        //                         </button>
        //                     </td>
        //                 </tr>
        //             </tbody>
        //         </table>
        //     </div>
        // </div>
    );
};

export default Table;
