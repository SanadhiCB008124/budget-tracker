import React from 'react';
import { NavLink } from 'react-router-dom';

const Dashboard: React.FC = () => {
    return (
        <div  className="flex flex-row">
        <div className="w-full bg-primary h-full flex flex-row flex-wrap gap-6  justify-center p-10 overflow-hidden text-white">
        <NavLink to="/budget" >
        <a className="transform hover:scale-105 transition duration-300 shadow-xl  rounded-lg  " href="#">
                <div className="p-5 text-primary-500 rounded bg-purple-300 ">
                    <div className="mt-3  text-base font-bold text-center leading-8">Your Budget</div>
                    <div className="flex justify-center">
                        <div className="mt-3 text-3xl leading-8 text-white">LKR 6,200.34</div>
                    </div>
                </div>
            </a>                       
        </NavLink>
            

            <a className="transform hover:scale-105 transition duration-300 shadow-xl  rounded-lg " href="#">
                <div className="p-5 text-primary-500 rounded bg-purple-300 ">
                    <div className="mt-3  text-base font-bold text-center leading-8">Total Expenses</div>
                    <div className="flex justify-center">
                        <div className="mt-3 text-3xl leading-8 text-white">LKR  6,200.34</div>
                    </div>
                </div>
            </a>

            <a className="transform hover:scale-105 transition duration-300 shadow-xl  rounded-lg  " href="#">
                <div className="p-5 text-primary-500 rounded bg-purple-300">
                    <div className="mt-3  text-base font-bold text-center leading-8">Total Income</div>
                    <div className="flex justify-center">
                        <div className="mt-3 text-3xl leading-8 text-white">LKR 6,200.34</div>
                    </div>
                </div>
            </a>
        </div>
        </div>
    );
};

export default Dashboard;
