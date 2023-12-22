import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';

type Crypto = {
    id: string;
    name: string;
    symbol: string;
    price: number;
    image: string;
};

const Buy = () => {
    const [cryptos, setCryptos] = useState<Crypto[]>([]);
    const [searchValue, setSearchValue] = useState<string>(''); // Add searchValue state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, 'cryptocurrencies'));
                const cryptoData: Crypto[] = [];

                querySnapshot.forEach((doc) => {
                    const data = doc.data() as Crypto;

                    cryptoData.push({
                        ...data,
                    });
                });

                setCryptos(cryptoData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Filter the cryptos based on the searchValue
    const filteredCryptos = cryptos.filter((crypto) =>
        crypto.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <div className="w-full bg-primary h-full flex-auto items-center justify-center p-10 overflow-hidden text-white">
            <div className="">
                {/* Pass the searchValue and setSearchValue to the SearchBar component */}
                <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
            </div>

            <div className="w-full">
                <h2 className="text-primary-500 text-lg">Cryptocurrencies</h2>
                <ul role="list" className="divide-ymt-10">
                    {filteredCryptos.map((crypto) => (
                        <li key={crypto.id} className="flex justify-between gap-x-6 py-5">
                            <div className="flex min-w-0 gap-x-4">
                                <img
                                    src={crypto.image}
                                    alt={crypto.name}
                                    className="h-12 w-12 flex-none rounded-full bg-primary"
                                />
                                <div className="min-w-0 flex-auto">
                                    <Link to={`/buy2/${crypto.name}`}>
                                        <p className="text-sm font-semibold leading-6 text-white">
                                            {crypto.name}
                                        </p>
                                    </Link>
                                    <p> {crypto.symbol}</p>
                                </div>
                            </div>
                            <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                                <p className="text-sm leading-6 text-white">$ {crypto.price}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Buy;
