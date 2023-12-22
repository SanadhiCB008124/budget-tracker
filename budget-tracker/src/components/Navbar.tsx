
import logo from "../assets/logo.png";
import {useAuth} from "../AuthContext.tsx";

import close from "../assets/close.svg";
import menu from "../assets/menu.svg";

import {NavLink} from "react-router-dom";
import {useState} from "react";


export default function Navbar() {
    const [toggle, setToggle] = useState(false);
    const { user , logout } = useAuth();

    return (
        <nav className="w-full flex py-6  justify-between space-x-10 items-center navbar">
            <img src={logo} alt="BitWallet" className="w-[39px] h-[39px] rounded-full " />

            <ul className="list-none sm:flex hidden justify-end items-center flex-1 space-x-4">

                { user ?(
                    <>
                        <li

                            className="font-poppins text-primary-500 hover:text-white  font-small cursor-pointer text-[16px]  space-x-4"

                        >
                            <NavLink to="/home" >
                                <label>Home</label>
                            </NavLink>


                        </li>
                        <li

                            className="font-poppins active:text-white text-primary-500 hover:text-white active:text-white  font-small cursor-pointer text-[16px]  space-x-4"

                        >
                            <NavLink to="/profile" >
                                <label>Profile</label>
                            </NavLink>


                        </li>
                        <li

                            className="font-poppins active:text-white text-primary-500 hover:text-white active:text-white  font-small cursor-pointer text-[16px]  space-x-4"

                        >
                            <NavLink to="/aboutUs" >
                                <label>About Us</label>
                            </NavLink>


                        </li>




                        <li className="font-poppins text-primary-500 hover:text-white  font-small cursor-pointer text-[16px]
                                ">
                            <button onClick={logout}>
                                logout
                            </button>
                        </li>


                    </>
                ): (
                    <>





                        <li  className="font-poppins text-primary-500 hover:text-white  font-small cursor-pointer text-[16px]
                                "><NavLink to="/createWallet" >
                            <label>Register</label>
                        </NavLink>
                        </li>
                        <li  className="font-poppins text-primary-500 hover:text-white active:text-white font-small cursor-pointer text-[16px]
                                ">
                            <NavLink to="/" >
                            <label>Login</label>
                        </NavLink>
                        </li>

                    </>
                )  }




            </ul>

            <div className="sm:hidden flex flex-1 justify-end items-center">
                <img
                    src={toggle ? close : menu}
                    alt="menu"
                    className="w-[28px] h-[28px] object-contain"
                    onClick={() => setToggle(!toggle)}
                />

                <div
                    className={`${
                        !toggle ? "hidden" : "flex"
                    } p-6 bg-black bg-gradient-to-r from-black to-gray-800 absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
                >
                    <ul className="list-none flex justify-end items-start flex-1 flex-col m-3">


                        { user ?(
                            <>
                                <li

                                    className="font-poppins text-primary-500 hover:text-white font-medium cursor-pointer text-[16px] pr-4 pb-4 ml-0
                              "
                                >
                                    <NavLink to="/home" >
                                        <label>Home</label>
                                    </NavLink>


                                </li>
                                <li

                                    className="font-poppins  text-primary-500 hover:text-white font-medium cursor-pointer text-[16px] pr-4 pb-4 ml-0
                              "
                                >
                                    <NavLink to="/profile" >
                                        <label>Profile</label>
                                    </NavLink>


                                </li>
                                <li

                                    className="font-poppins  text-primary-500 hover:text-white font-medium cursor-pointer text-[16px] pr-4 pb-4 ml-0
                              "
                                >
                                    <NavLink to="/aboutUs" >
                                        <label>About Us</label>
                                    </NavLink>


                                </li>







                                <li className="font-poppins text-primary-500 hover:text-white font-medium cursor-pointer text-[16px] pr-4 pb-4 ml-0
                              ">
                                    <button onClick={logout}>
                                        logout
                                    </button>
                                </li>


                            </>
                        ): (
                            <>





                                <li  className="font-poppins text-primary-500 font-medium cursor-pointer text-[16px] pr-4 pb-4 ml-0
                              "><NavLink to="/createWallet" >
                                    <label>Register</label>
                                </NavLink></li>
                                <li className="font-poppins text-primary-500 font-medium cursor-pointer text-[16px] pr-4 pb-4 ml-0
                              "><NavLink to="/" >
                                    <label>Login</label>
                                </NavLink>

                                 </li>

                            </>
                        )  }




                    </ul>
                </div>
            </div>
        </nav>
    );
}


