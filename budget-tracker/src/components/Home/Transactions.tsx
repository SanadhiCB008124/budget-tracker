import React from "react";
import food from "../../assets/food.svg";
import entertainment from "../../assets/entertainment.svg";
import shop from "../../assets/shopping.svg";


const Transactions: React.FC = () => {


    const Image={
        width:"40px",
        height:"40px",
        borderRadius:"50%",

    }


    return (

        <div
            className=" w-full bg-primary flex-auto items-center justify-center p-10 overflow-hidden text-black "
        >
            
              <h1 className="text-primary-500 font-mono font-size[300px] ">Recent Transactions</h1>
        <div className='w-full'>
              
                <ul role="list" className="divide-ymt-10">

                <li  className="flex shadow-xl rounded mt-5 p-10 justify-between gap-x-6 py-5">
                        <div className="flex min-w-0 gap-x-4">
                            <div className="min-w-0 flex flex-row space-x-2">
                               
                                    <div className="flex flex-left">
                                        <img src={shop}style={Image} alt="Food" />
                                    </div>
                                    <div>
                                    <p className="text-sm font-semibold leading-6 text-black">
                                            Christmas Shopping
                                    </p>
                                    <p className="text-sm leading-6 text-black font-bold">LKR 1000.00</p>

                                    </div>
                                  
  
                            </div>
                        </div>
                       

                    </li>

                    <li  className="flex shadow-xl rounded mt-5 p-10 justify-between gap-x-6 py-5">
                        <div className="flex min-w-0 gap-x-4">
                            <div className="min-w-0 flex flex-row space-x-2">
                               
                                    <div className="flex flex-left">
                                        <img src={food}style={Image} alt="Food" />
                                    </div>
                                    <div>
                                    <p className="text-sm font-semibold leading-6 text-black">
                                            Dinner
                                    </p>
                                    <p className="text-sm leading-6 text-black font-bold">LKR 1000.00</p>

                                    </div>
                                  
  
                            </div>
                        </div>
                       

                    </li>
                    <li  className="flex shadow-xl rounded mt-5 p-10 justify-between gap-x-6 py-5">
                        <div className="flex min-w-0 gap-x-4">
                            <div className="min-w-0 flex flex-row space-x-2">
                               
                                    <div className="flex flex-left">
                                        <img src={entertainment}style={Image} alt="Food" />
                                    </div>
                                    <div>
                                    <p className="text-sm font-semibold leading-6 text-black">
                                           Watched Wonka at the Cinema
                                    </p>
                                    <p className="text-sm leading-6 text-black font-bold">LKR 1000.00</p>

                                    </div>
                                  
  
                            </div>
                        </div>
                       

                    </li>

                </ul>
            </div>
        </div>

    )
}
export default Transactions;