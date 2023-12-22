import React from "react";
import  coin from "/src/assets/images/coin.jpg"

const ImportWallet: React.FC = () => {
  return (
      <section className="gradient-form h-full bg-white">
        <div className="container h-full p-10">
          <div className="g-6 flex h-full flex-wrap items-center justify-center text-black ">
            <div className="w-full">
              <div className="block rounded-lg bg-white shadow-lg bg-white">
                <div className="g-0 lg:flex lg:flex-wrap">
                  <div className="px-4 md:px-0 lg:w-6/12">
                    <div className="md:mx-6 md:p-12">
                      <div className="text-center">
                        <img
                            className="mx-auto w-48"
                            src={coin}
                            alt="logo"
                        />
                        <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                          Bit Wallet
                        </h4>
                      </div>
                      <form>
                        <p className="mb-4 text-black">Please login to your account</p>
                        <div className="relative mb-4" data-te-input-wrapper-init>
                          <input
                              type="text"
                              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder-opacity-100 peer-data-[te-input-state-active]:placeholder-opacity-100 motion-reduce:transition-none dark:placeholder-text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder-opacity-0"
                              id="exampleFormControlInput1"
                              placeholder="Username"
                          />
                          <label
                              htmlFor="exampleFormControlInput1"
                              className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                          >
                            Username
                          </label>
                        </div>
                        <div className="relative mb-4 border-1 border-black" data-te-input-wrapper-init>
                          <input
                              type="password"
                              className="peer  block min-h-[auto] w-full rounded border-1 border-black bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder-opacity-100 peer-data-[te-input-state-active]:placeholder-opacity-100 motion-reduce:transition-none dark:placeholder-text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder-opacity-0"
                              id="exampleFormControlInput11"
                              placeholder="Password"
                          />
                          <label
                              htmlFor="exampleFormControlInput11"
                              className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                          >
                            Password
                          </label>
                        </div>
                        <div className="mb-12 pb-1 pt-1 text-center">
                          <button
                              className="mb-3 inline-block w-2/5 bg-purple-400 rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                              type="button"
                              data-te-ripple-init
                              data-te-ripple-color="light"
                          >
                            Import Your Wallet
                          </button><br/>

                        </div>

                      </form>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}

export default ImportWallet;
