import React, { useState } from "react";
import { auth } from "../firebase";
import login from "../assets/login.jpg";
import { createUserWithEmailAndPassword } from "firebase/auth";
import coin from "/src/assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

const CreateWallet: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const showWelcomeNotification = () => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker.ready.then((registration) => {
        const title = "Welcome to Budget-Tracker";
        const options = {
          body: "You are now a registered user.",
          icon: coin, 
        };

        registration.showNotification(title, options);
      });
    }
  };

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/home");
        showWelcomeNotification();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="min-h-screen flex  ">
      <div
          className="sm:w-1/2 bg-cover"
          style={{
        
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${login})`,
        
          }}
        ></div>
      
      
        <div className="sm:w-1/2 p-10 mt-20  bg-white ">
          <h4 className="mb-4 heading text-black text-center">
            Welcome to 
            <br />
            Budget-Tracker !
          </h4>
          <form onClick={handleRegister}>
            <div className="mb-4 flex flex-col">
              <label htmlFor="email" className="text-left mb-2 text-black">
                Email
              </label>
              <input
                type="text"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg py-3 px-3 bg-white placeholder-white-500 text-black border border-black b-4"
                id="exampleFormControlInput1"
                placeholder="Username"
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label htmlFor="password" className="text-left mb-2 text-black">
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-lg py-3 px-3 bg-white placeholder-white-500 text-black border border-black b-4"
                id="exampleFormControlInput11"
                placeholder="Password"
              />
            </div>
            <div className="mb-12 pb-1 pt-1 text-center">
              <button
                className="button-64"
                onClick={handleRegister}
                role="button"
              >
                <span className="text"> Get Started</span>
              </button>
              <p className="text-black mt-4 py-3 px-4">
                <Link to="/">Already Registered ? Click here to Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
   
  );
};

export default CreateWallet;
