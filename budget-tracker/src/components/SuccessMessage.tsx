
import {NavLink} from "react-router-dom";
function successMessage(){
    return (
        <div className="bg-primary h-screen">
            <div className="bg-primary p-6 md:mx-auto">
                <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
                    <path
                        fill="white"
                        d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                    ></path>
                </svg>
                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-primary-500 font-semibold text-center">Payment Successful !</h3>
                    <p className="text-white my-2">Thank you for completing your secure online payment.</p>
                    <p>Have a great day!</p>
                    <div className="py-10 text-center">
                        <button  className="px-12 bg-black text-primary-500 border-2 border-primary-500  hover:text-white font-semibold py-3">
                            <NavLink to="/home" >
                                <label>Home</label>
                            </NavLink>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default successMessage;