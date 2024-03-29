import './App.css';

import Navbar from "./components/Navbar.tsx";
import Home from "./components/Home/Home.tsx"; // Import your Home component
import {Routes, Route, } from "react-router-dom";

import styles from './style.tsx';
import Send from "./components/Send.tsx";

import Buy from "./components/Buy.tsx";
import Buy2 from "./components/Buy2.tsx";
import Login from "./components/Login.tsx";
import CreateWallet from "./components/CreateWallet.tsx";
import Camera from "./components/Camera.tsx";
import BarcodeScanner from "./components/BarcodeScanner.tsx";
import Profile from "./components/Profile.tsx";
import Get from "./components/Get.tsx";

import Test from "./components/Test.tsx";

import { useAuth } from './AuthContext.tsx';
import AboutUs from "./components/About.tsx";
import Budget from './components/Budget.tsx';
import Income from './components/Income.tsx';
import Expenses from './components/Expenses.tsx';
import SetBudget from './components/SetBudget.tsx';



function App() {
    const { user } = useAuth();



    return (
        <div className="bg-primary w-full  h-screen">



             {user && (
                <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                    <div className={`${styles.boxWidth}`}>
                        <Navbar />
                    </div>
                </div>
             )}
                

            <div>
               
            </div>




            <div className={`bg-primary ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/send" element={<Send />} />
                        
                        <Route path="/buy" element={<Buy />} />
                        <Route path="/get" element={<Get/>} />
                        <Route path="/budget" element={<Budget/>} />
                        <Route path="/income" element={<Income/>} />
                        <Route path="/expenses" element={<Expenses/>} />
                        <Route path="/setBudget" element={<SetBudget/>} />
                    
                        <Route path="/createWallet" element={<CreateWallet/>} />
                        <Route path="/camera" element={<Camera/>} />
                        <Route path="/barcodescanner" element={<BarcodeScanner/>} />
                        <Route path="/profile" element={<Profile/>} />
                        
                        <Route path="/buy2/:cryptoName" element={<Buy2/>} />
                        
                        <Route path="/test" element={<Test/>} />
                        <Route path="/aboutUs" element={<AboutUs/>} />
                      
                    </Routes>
                </div>
            </div>
        </div>

    );
}

export default App;