

import bgImg from "../assets/splash4.jpg"
import {Link, useParams} from 'react-router-dom';
import coin from "../assets/coin.jpg";

import {useState} from "react";

type Currency = "USD" | "EURO" | "YEN" | "EUD";



function Buy2() {
    const { cryptoName } = useParams();

    const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(null);

    const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCurrency(event.target.value as Currency);
    }

        const showNotification = () => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            navigator.serviceWorker.ready.then((registration) => {
                const title = "You have bought crypto successfully !";
                const options = {
                    body: "success",
                    icon:coin, // Replace with your icon path
                };

                registration.showNotification(title, options);
            });
        }
    };
    return (

        <div
            className=" w-full bg-primary h-full  flex-auto items-center justify-center p-10 overflow-hidden text-white bg-no-repeat bg-cover "
            style={{
                backgroundImage: `url(${bgImg})`
            }}
        >
            {/**}   <MobileNav/>**/}
            <div
                className=" w-full h-full  flex-auto items-center justify-center p-10 overflow-hidden text-white  ">
                <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0">


                    <div className="lg:text-left text-center">
                        <div className="flex items-center justify-center">
                            <div className="bg-primary flex flex-col w-70 border-2 border-primary-500 rounded-3xl px-8 py-10">

                                <form className="flex flex-col space-y-8 mt-10">
                                    <select
                                    className="dropdown mb-10 bg-black border-2 border-white p-2 rounded-full  text-black"
                                    value={selectedCurrency || ""}
                                    onChange={handleCurrencyChange}
                                >
                                    <option value="" className="m-1 bg-black py-2 px-4 rounded-2xl">
                                        Currency
                                    </option>
                                    {["USD", "EURO", "YEN", "EUD"].map((currency) => (
                                        <option key={currency} value={currency} className="hover:bg-white hover:text-black">
                                            {currency}
                                        </option>
                                    ))}
                                </select>

                                    <div className="text-xl font-bold" >
                                        <p>{cryptoName}</p>

                                    </div>

                                    <details className="dropdown mb-2 w-full border-2 border-white rounded-full ">
                                        <summary className="m-1 bg-black text-sm  py-2 px-4 rounded-2xl ">Select Payment Method</summary>
                                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-black rounded-box w-52">
                                            <Link to="/card" >
                                                <li><a className="hover:bg-white hover:text-black">MasterCard</a></li>
                                            </Link>
                                            <Link to="/card" >
                                                <li><a className="hover:bg-white hover:text-black">Debit/Credit Card</a></li>
                                            </Link>
                                            <li><a className="hover:bg-white hover:text-black">PayPal</a></li>
                                            <li><a className="hover:bg-white hover:text-black">Apple Pay</a></li>
                                        </ul>
                                    </details>


                                    <input
                                        type="text"
                                        placeholder="amount"
                                        className="border rounded-lg py-3 px-3 bg-black border-primary-500 placeholder-white-500 text-white"
                                    />
                                    <button
                                        className="border border-primary-500 bg-green-950 text-white rounded-lg py-3 font-semibold"
                                         onClick={showNotification}
                                    >
                                        Confirm
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>


                </div>

            </div>
        </div>


    );
}

export default Buy2;
