import React, { useState } from "react";
import coin from "/src/assets/logo.png";
import login from "/src/assets/login.jpg";
import { signInWithEmailAndPassword } from "firebase/auth";
import {Link, useNavigate} from "react-router-dom";
import { auth } from "../firebase";


const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError]=useState<string|null>(null);
    const navigate = useNavigate();

     const showWelcomeNotification = () => {
         if ('serviceWorker' in navigator && 'PushManager' in window) {
            navigator.serviceWorker.ready.then((registration) => {
                const title = "You have successfully logged into budget-tracker ";
                const options = {
                    body: "You are now logged in.",
                 icon:coin, 
                };

                registration.showNotification(title, options);
         });
         }
     };
  const handleLogin = async () => {
    event?.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;
      console.log(user);

      showWelcomeNotification();
      navigate("/home");

    } catch (error) {
     console.log(error);
     setError('Invalid Email or password ');
    }
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

    
    
        <form className="p-10 sm:w-1/2  mt-20  bg-white">
        <h4 className="mb-4 heading text-black text-center">
          Log In to Budget-Tracker !</h4>
             {error &&(
            <div className="mb-4 text-red-500 text center"> {error}</div>
             )}
                                      <p className="mb-4 text-white">Please login to your account</p>
                                      <div className="mb-4 flex flex-col" >

                                          <label
                                              htmlFor="email"
                                              className="text-left mb-2 text-black"
                                          >
                                              Email
                                          </label>
                                          <input
                                              type="text"
                                              onChange={(e) => setEmail(e.target.value)}
                                              id=""
                                              placeholder="Email"
                                              className=" rounded-lg py-3 px-3 bg-white   placeholder-white-500 text-black border border-black b-4"                                          />


                                      </div>
                                      <div className="mb-4 flex flex-col" >
                                          <label
                                              htmlFor="password"
                                              className=" text-left mb-2 text-black "

                                          >
                                              Password
                                          </label>
                                          <input
                                              type="password"
                                              onChange={(e) => setPassword(e.target.value)}

                                              id=""
                                              placeholder="Password"
                                              className=" rounded-lg py-3 px-3 bg-white   placeholder-white-500 text-black border border-black b-4"             
                                            />


                                      </div>
                                      <div className="mb-12 pt-1 text-center">
                                       
                                          <button className="button-64"   onClick={handleLogin}  role="button"><span className="text">Log In</span></button>


                                          <p className=" text-black mt-4 py-3 px-4 ">
                                              <Link to="/createWallet" >
                                                  No account? Click here to register
                                              </Link>
                                          </p>

                                      </div>

                                  </form>
                                  </div>
 


  );
};

export default Login;
