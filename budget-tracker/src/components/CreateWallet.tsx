import React, {useState} from "react";

import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import  coin from "/src/assets/logo.png"
import {Link, useNavigate} from "react-router-dom";
import bgImg from "../assets/splash4.jpg"
import styles from "../style.tsx";

const CreateWallet: React.FC = () => {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const showWelcomeNotification = () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.ready.then((registration) => {
        const title = "Welcome to Zenith Pay";
        const options = {
          body: "You are now a registered user.",
          icon:coin, // Replace with your icon path
        };

        registration.showNotification(title, options);
      });
    }
  };


  const handleRegister=async()=>{
        event?.preventDefault();
        await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      
        const user = userCredential.user;
        console.log(user);
        navigate("/home");
        showWelcomeNotification();
       
      
      })
      .catch((error) => {
        console.log(error.message)
      });

    }

    return (
      <div>
        <div className="min-h-screen grid bg-primary">
          <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0">
    
          
            <div className="w-full sm:w-1/2 bg-green-200 h-full flex-auto items-center justify-center p-10 overflow-hidden text-white bg-no-repeat bg-cover">
              
               
                  
            </div>
    
         
            <div className="hidden sm:block sm:w-1/2 bg-white  h-full bg-cover">
            <form onClick={handleRegister} className="p-10">
                      <h4 className="mb-4 heading text-black text-center">Welcome to Budget-Tracker !</h4>
                      <div className="mb-4 flex flex-col" >
                      
                        <label
                            htmlFor="email"
                            className="text-left mb-2  text-black"
                           

                        >
                          Email
                        </label>
                        <input
                            type="text"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className=" rounded-lg py-3 px-3 bg-white   placeholder-white-500 text-black border border-black b-4"

                            id="exampleFormControlInput1"
                            placeholder="Username"
                        />

                      </div>
                      <div className="mb-4 flex flex-col">

                        <label
                            htmlFor="password"
                            className="text-left mb-2  text-black"

                        >
                          Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}

                            className=" rounded-lg py-3 px-3 bg-white   placeholder-white-500 text-black border border-black b-4"
                            id="exampleFormControlInput11"
                            placeholder="Password"
                        />

                      </div>

                      <div className="mb-12 pb-1 pt-1 text-center">
                        <button className="button-64"   onClick={handleRegister}  role="button"><span className="text"> Get Started</span></button>

                        
                        <p
                            className=" text-black  mt-4 py-3 px-4"
                        >
                          <Link to="/" >
                            Already Registered  ? click here to Login
                          </Link>
                        </p>

                      </div>

                    </form>
            </div>
    
          </div>
        </div>
      </div>
    );
    
}

export default CreateWallet;
