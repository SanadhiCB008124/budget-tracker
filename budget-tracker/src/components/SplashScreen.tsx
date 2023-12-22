
import { useNavigate } from 'react-router-dom';
import image from '../assets/splash.jpg';

function SplashScreen() {
    const navigate = useNavigate();

    const login = () => {
        console.log('login');
        navigate('/');
    };

    const register = () => {
        console.log('reg');
        navigate('/createWallet');
    };

    return (
        <div className="relative h-screen grid bg-primary">
            <div className="flex flex-col sm:flex-row justify-center items-center flex-auto min-w-0">
                <div
                    className="w-full bg-primary h-full object-fill flex-auto items-center justify-center p-10 overflow-hidden text-white bg-no-repeat bg-cover"
                    style={{
                        backgroundImage: `url(${image})`,
                    }}
                >
                    <div className="container mx-auto flex flex-row justify-end">
                        <div className="flex flex-col w-full lg:w-1/3 justify-center items-start p-8">
                            <h1 className="text-3xl md:text-5xl p-2 text-primary-500 tracking-loose">
                                ZenithPay
                            </h1>
                            <h2 className="text-1xl  leading-relaxed md:leading-snug mb-2">
                                Seamless crypto, secure transactions
                            </h2>
                            <button
                                className="mt-2 bg-black text-primary-500 rounded shadow hover:shadow-lg py-2 px-4 border border-white hover:text-white"
                                onClick={register}
                            >
                                Create Your Wallet
                            </button>
                            <button
                                className="mt-2 bg-black text-primary-500 rounded shadow hover:shadow-lg py-2 px-4 border border-white hover:text-white"
                                onClick={login}
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SplashScreen;
