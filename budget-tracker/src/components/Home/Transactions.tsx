import React from "react";


const Transactions: React.FC = () => {
    return (

        <div
            className=" w-full bg-primary h-full  flex-auto items-center justify-center p-10 overflow-hidden text-black "
        >


            <div className='w-full'>
                <h2 className="text-primary-500">Recent Transactions</h2>
                <ul role="list" className="divide-ymt-10">

                        <li  className="flex justify-between gap-x-6 py-5">
                            <div className="flex min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto">
                                     <p className="text-sm font-semibold leading-6 text-black">
                                        Food
                                    </p>
                                    <p> <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#2f5da7"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 17L17 7M17 7H8M17 7V16" stroke="#2f5da7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></p>
                                </div>
                            </div>
                            <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                                <p className="text-sm leading-6 text-black">LKR 500.00</p>

                            </div>

                        </li>

                    <li  className="flex justify-between gap-x-6 py-5">
                        <div className="flex min-w-0 gap-x-4">
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-black">
                                    Uber 
                                </p>
                                <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#2f5da7"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="arrow-down-left"> <g> <polyline data-name="Right" fill="none" id="Right-2" points="5.3 11.6 5.3 18.7 12.4 18.7" stroke="#2f5da7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline> <line fill="none" stroke="#2f5da7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="18.7" x2="6.9" y1="5.3" y2="17.1"></line> </g> </g> </g> </g></svg>
                            </div>
                        </div>
                        <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-red-400">LKR 1000.00</p>

                        </div>

                    </li>
                    <li  className="flex justify-between gap-x-6 py-5">
                        <div className="flex min-w-0 gap-x-4">
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-black">
                                    Shopping
                                </p>
                                <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#2f5da7"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="arrow-down-left"> <g> <polyline data-name="Right" fill="none" id="Right-2" points="5.3 11.6 5.3 18.7 12.4 18.7" stroke="#2f5da7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline> <line fill="none" stroke="#2f5da7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="18.7" x2="6.9" y1="5.3" y2="17.1"></line> </g> </g> </g> </g></svg>
                            </div>
                        </div>
                        <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-red-400">LKR 15,000.00</p>

                        </div>

                    </li>

                </ul>
            </div>
        </div>

    )
}
export default Transactions;