

import bgImg from "../assets/splash4.jpg"
import {Link, useNavigate} from 'react-router-dom';
import styles from "../style.tsx";
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';
import {useEffect, useState} from "react";
import coin from "../assets/coin.jpg";


type Crypto = {
    id: string;
    name: string;
    symbol: string;
    image: string;
    amount:string;

};

function Send() {
    const [cryptos, setCryptos] = useState<Crypto[]>([]);
    const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, 'Mycrypto'));
                const cryptoData: Crypto[] = [];

                querySnapshot.forEach((doc) => {
                    const data = doc.data() as Crypto; // Cast data as Crypto type

                    cryptoData.push({
                        ...data, // Remove 'id' from here
                    });
                });


                setCryptos(cryptoData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    const navigate = useNavigate();


    const showSuccessNotification = () => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            navigator.serviceWorker.ready.then((registration) => {
                const title = "Your transaction is successful";
                const options = {

                    icon:coin,
                };

                registration.showNotification(title, options);
            });
        }
    };
    const showSuccessMessage = () => {

        showSuccessNotification();
        navigate("/successMessage");
    }

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
                            <div className="flex items-center justify-center ">
                                <div className="bg-primary flex flex-col  w-70 border-2 border-primary-500 rounded-3xl px-8 py-10">
                                <h2 className={styles.heading1}>
                                        Send
                                    </h2>
                                    <form className="flex flex-col space-y-8 mt-4">
                                        <label className="font-bold text-lg text-left text-white">
                                            Send To:
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Send to"
                                            className="border rounded-lg py-3 px-3 mt-2 bg-black border-primary-500 placeholder-white-500 text-white"
                                        />
                                        <Link to="/BarcodeScanner">
                                        <div style={{ position: 'relative', display: 'inline-block', left:"40%",}}>
                                            <svg viewBox="0 0 1024 1024" height="30px" className="icon" version="1.1"
                                                 xmlns="http://www.w3.org/2000/svg" fill="#000000">
                                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                                   stroke-linejoin="round"></g>
                                                <g id="SVGRepo_iconCarrier">
                                                    <path
                                                        d="M234.510695 141.605388h132.553218c12.769898 0 23.103972-10.344313 23.103972-23.103972s-10.333051-23.103972-23.103972-23.103973H234.510695c-76.441231 0-138.62281 62.18158-138.62281 138.622811v554.491241c0 76.441231 62.18158 138.62281 138.62281 138.62281h132.553218c12.769898 0 23.103972-10.345337 23.103972-23.103972 0-12.758635-10.333051-23.103972-23.103972-23.103973H234.510695c-50.967988 0-92.414866-41.458141-92.414866-92.414865V234.020254c-0.001024-50.956725 41.445854-92.414866 92.414866-92.414866zM789.000912 95.397443H656.447694c-12.769898 0-23.103972 10.344313-23.103972 23.103973s10.333051 23.103972 23.103972 23.103972h132.553218c50.967988 0 92.414866 41.458141 92.414865 92.414866v554.491241c0 50.956725-41.446878 92.414866-92.414865 92.414865H656.447694c-12.769898 0-23.103972 10.344313-23.103972 23.103973 0 12.758635 10.333051 23.103972 23.103972 23.103972h132.553218c76.441231 0 138.62281-62.18158 138.62281-138.62281V234.020254c0-76.441231-62.18158-138.62281-138.62281-138.622811z"
                                                        fill="#22C67F"></path>
                                                    <path
                                                        d="M731.241493 545.921321H269.166141c-19.139488 0-34.655447-15.515958-34.655446-34.655447s15.515958-34.655447 34.655446-34.655446H731.241493c19.139488 0 34.655447 15.515958 34.655447 34.655446s-15.514934 34.655447-34.655447 34.655447z"
                                                        fill="#74E8AE"></path>
                                                </g>
                                            </svg>
                                        </div></Link>



                                        <label className="font-bold text-left text-lg text-white">Amount</label>
                                        <select
                                            className="border rounded-lg py-3 px-3 mb-4 bg-black border-primary-500 placeholder-white-500 text-white"
                                            value={selectedCrypto || ''}
                                            onChange={(e) => setSelectedCrypto(e.target.value)}
                                        >
                                            <option value="" disabled>Select a cryptocurrency</option>
                                            {cryptos.map((crypto) => (
                                                <option key={crypto.id} value={crypto.name}>
                                                    {crypto.name}
                                                </option>
                                            ))}
                                        </select>
                                        <input
                                            type="text"
                                            placeholder="amount"
                                            className="border rounded-lg py-3 px-3 bg-black border-primary-500 placeholder-white-500 text-white"
                                        />

                                        <button
                                            className="border border-primary-500 bg-green-950 text-white rounded-lg py-3 font-semibold"
                                           onClick={showSuccessMessage}
                                        >
                                            Continue
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

export default Send;
