
const SideNav: React.FC = () => {


    return (
        <div className={` w-80  bg-white sidebar h-screen  `}>
            <div className="text-black-100 text-xl">

                <div className="my-2 bg-black-600 h-[1px]"></div>
            </div>

            <div className="p-2.5 w-2/3  ml-10 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-purple-400 text-black">
                <i className="bi bi-house-door-fill"></i>
                <span className="text-[15px] ml-4 text-black-200 font-bold">Dashboard</span>
            </div>
            <div className="p-2.5 mt-3 w-2/3  ml-10  flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-purple-400 text-black">
                <i className="bi bi-bookmark-fill"></i>
                <span className="text-[15px] ml-4 text-black-200 font-bold">My Wallet</span>
            </div>
            <div className="p-2.5 mt-3 w-2/3  ml-10  flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-purple-400 text-black">
                <i className="bi bi-bookmark-fill"></i>
                <span className="text-[15px] ml-4 text-black-200 font-bold">Transfers</span>
            </div>
            <div className="p-2.5 mt-3 w-2/3  ml-10  flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-purple-400 text-black">
                <i className="bi bi-bookmark-fill"></i>
                <span className="text-[15px] ml-4 text-black-200 font-bold">My Profile</span>
            </div>

            <div className="p-2.5 mt-3 w-2/3  ml-10  flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-purple-400 text-black">
                <i className="bi bi-box-arrow-in-right"></i>
                <span className="text-[15px] ml-4 text-black font-bold">Logout</span>
            </div>

        </div>

    );
};

export default SideNav;
