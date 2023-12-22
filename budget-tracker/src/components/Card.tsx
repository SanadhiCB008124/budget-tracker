
import bgImg from "../assets/splash4.jpg"

function Card() {
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
                        <div className="text-left ">
                            <div className="flex items-center justify-center">
                                <div className="bg-primary flex flex-col w-70 border-2 border-primary-500 rounded-3xl px-8 py-10">
                                    <h2 className="text-3xl sm:text-xl">
                                        Add Card
                                    </h2>
                                    <form className="flex flex-col space-y-4 mt-10">
                                        <label className="align-left">Card Name</label>
                                        <input
                                            type="text"
                                            placeholder="visa"
                                            className="border rounded-lg py-3 px-3 bg-black border-primary-500 placeholder-white-500 text-white"
                                        />
                                        <label className="text-left">Card Number</label>
                                        <input
                                            type="text"
                                            placeholder="XXXX XXXX XXXX XXXX"
                                            className="border rounded-lg py-3 px-3 bg-black border-primary-500 placeholder-white-500 text-white"
                                        />
                                        <div className="flex flex-row items-center space-x-4">
                                            <div >
                                                <label className=" text-left">Exp Month</label>
                                                <div className="relative mt-1 focus-within:text-gray-600  text-white">
                                                    <input type="text" className="pr-4 pl-10 bg-black py-2 border focus:ring-gray-500 focus:border-primary-500 w-full sm:text-sm border-primary-500 rounded-md focus:outline-none placeholder-white-500 text-white" placeholder="XX" />

                                                    <div className="absolute left-3 top-2">
                                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div >
                                                <label className="text-left">Exp Year</label>
                                                <div className="relative mt-1 focus-within:text-gray-600 text-white">
                                                    <input type="text" className="pr-4 pl-10 bg-black py-2 border focus:ring-gray-500 focus:border-primary-500 w-full sm:text-sm border-primary-500 rounded-md focus:outline-none placeholder-white-500 text-white" placeholder="XX" />

                                                    <div className="absolute left-3 top-2">
                                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <label className="text-left mb-0">CVV</label>
                                        <input
                                            type="text"
                                            placeholder="XXX"
                                            className="border rounded-lg py-3 px-3 bg-black border-primary-500 placeholder-white-500 text-white"
                                        />


                                    </form>
                                    <button
                                        className="border mt-6  border-primary-500 bg-green-950 text-white rounded-lg py-3 font-semibold"
                                        // onClick={onSubmit} // You can add your form submission logic here
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
