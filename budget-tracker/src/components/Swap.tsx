


import bgImg from "../assets/splash4.jpg"
import { collection, getDocs } from 'firebase/firestore';

import { firestore } from '../firebase';
import {useEffect, useState} from "react";

type Crypto = {
    id: string;
    name: string; // Add the 'name' property here (and other properties you have)
    symbol: string;
    price: number;
    image: string;

};
function Swap() {

    const [cryptos, setCryptos] = useState<Crypto[]>([]);
    const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, 'cryptocurrencies'));
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

    return (
        <div
    className=" w-full bg-primary h-full  flex-auto items-center justify-center p-10 overflow-hidden text-white bg-no-repeat bg-cover "
    style={{
        backgroundImage: `url(${bgImg})`
    }}
>
            {/**}  <MobileNav/>**/}
            <div
                className=" w-full h-full  flex-auto items-center justify-center p-10 overflow-hidden text-white  ">
                <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0">

                    <div>
                        <div className="lg:text-left text-center">
                            <div className="flex items-center justify-center">
                                <div className="bg-primary flex flex-col w-70 border-2 border-primary-500 rounded-3xl px-8 py-10">
                                    <h2 className="text-2xl font-bold text-white text-center">
                                        Swap Crypto
                                    </h2>
                                    <form className="flex flex-col space-y-8 mt-10">


                                        <label className="font-bold text-md text-left text-white">
                                            From :
                                        </label>
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
                                            className="border rounded-lg py-3 px-3 mt-4 bg-black border-primary-500  placeholder-white-500 text-white"
                                        />

                                        <div className="flex flex-row  justify-center">
                                            <svg width="26px" height="26px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" version="1.1" fill="none" stroke="#2de0c2" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="m7.75 5.75-3-3-3 3m3 7.5v-10.5m9.5 7.5-3 3-3-3m3-7.5v10.5"></path> </g></svg>
                                        </div>
                                        <label className="font-bold text-md text-left text-white">To:</label>

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


                                        <button
                                            className="border border-primary-500 bg-green-950 text-white rounded-lg py-3 font-semibold"
                                            // onClick={onSubmit} // You can add your form submission logic here
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
        </div>
    );
}

export default Swap;
