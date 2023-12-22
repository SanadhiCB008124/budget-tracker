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

            <div
                className="w-full bg-primary h-full  flex-auto items-center justify-center p-10 overflow-hidden text-white bg-no-repeat bg-cover "
                style={{
                  backgroundImage: `url(${bgImg})`
                }}
            >


              <div className="lg:text-left text-center">
                <div className="flex items-center justify-center">
                  <div className="bg-primary flex flex-col w-90 border-2 border-primary-500 rounded-3xl px-8 py-10">

                    <div className="text-center m-10">
                      <img
                          className="mx-auto w-38 rounded-full"
                          src={coin}
                          alt="logo"
                      />
                      <h4 className={styles.heading1}>
                       ZenithPay
                      </h4>
                    </div>
                    <form onClick={handleRegister}>
                      <p className="mb-4 text-white">Please Register your wallet</p>
                      <div className="mb-4 flex flex-col" >

                        <label
                            htmlFor="email"
                            className="text-left mb-2"

                        >
                          Email
                        </label>
                        <input
                            type="text"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className=" rounded-lg py-3 px-3 bg-black   placeholder-white-500 text-white"

                            id="exampleFormControlInput1"
                            placeholder="Username"
                        />

                      </div>
                      <div className="mb-4 flex flex-col">

                        <label
                            htmlFor="password"
                            className="text-left mb-2"

                        >
                          Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}

                            className=" rounded-lg py-3 px-3 bg-black   placeholder-white-500 text-white"
                            id="exampleFormControlInput11"
                            placeholder="Password"
                        />

                      </div>

                      <div className="mb-12 pb-1 pt-1 text-center">
                        <button
                            className=" text w-full white bg-black border-2 border-primary-500 py-3 px-4 rounded-xl"
                            type="button"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            onClick={handleRegister}
                        >
                          Create Your Wallet
                        </button><br/>
                        <button
                            className=" text w-full border-2 border-primary-500 hover:text-primary-500 white bg-green-950 mt-4 py-3 px-4 rounded-xl"
                        >
                          <Link to="/" >
                            Already Registered ? Login
                          </Link>
                        </button>

                      </div>

                    </form>
                  </div>
                </div>
              </div>


            </div>

          </div>
        </div>
      </div>















  );
}

export default CreateWallet;
