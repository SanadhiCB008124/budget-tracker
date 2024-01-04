import React, { useState } from "react";
import coin from "/src/assets/logo.png";
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
                const title = "Welcome to Zenith Pay";
                const options = {
                    body: "You are now logged in.",
                 icon:coin, // Replace with your icon path
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
    <div>
    <div className="min-h-screen grid bg-primary">
      <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0">

      
        <div className="w-full sm:w-1/2 bg-green-200 h-full flex-auto items-center justify-center p-10 overflow-hidden text-white bg-no-repeat bg-cover">
          
           
              
        </div>

     
        <div className="hidden sm:block sm:w-1/2 bg-white  h-full bg-cover">
        <form className="p-10">
        <h4 className="mb-4 heading text-black text-center">Log In to Budget-Tracker !</h4>
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
    </div>
  </div>
</div>
    





  );
};

export default Login;
