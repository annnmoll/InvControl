import axios from 'axios';
import React, { useRef } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectedProduct } from '../redux/slices/productSlice';

function SellStock() {
    const { product } = useSelector(selectedProduct);

    const navigate = useNavigate();
    const formRef = useRef();
    const submitHandler = async (e) => {
        if (formRef.current.sold.value === '0') { return toast.warn("Enter a valid value") }
        e.preventDefault();
        const saleObj = {
            id: product._id,
            buyer: formRef.current.buyer.value,
            productsSold: formRef.current.sold.value
        };


        const token = localStorage.getItem('authToken')
        await axios({

            method: "post",
            url: "http://localhost:5000/api/sell/",
            data: saleObj,
            headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
        })
            .then(() => {
                toast.success("Sold successfully");
                navigate("/");
            })
            .catch((error) => {
                toast.warn(error.response.data.message);
            });

    }
    return (
        <section className="bg-[var(--background)]  md:h-[80vh]">
            <div className="flex flex-col items-center justify-center md:h-[100%] px-6 py-8 mx-auto  lg:py-0 ">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sell Product
                        </h1>
                        <form
                            ref={formRef}
                            onSubmit={submitHandler}
                            className="space-y-4 md:space-y-6"
                        >

                            <div>
                                <label
                                    htmlFor="buyer"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Buyer Name
                                </label>
                                <input
                                    type="text"
                                    name="buyer"
                                    id="buyer"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Rampal"
                                    required=""
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="sold"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Items to be sold
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    name="sold"
                                    id="sold"
                                    placeholder="Enter a number"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required=""
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full text-[var(--textColor)] bg-[var(--bgColor)] hover:scale-[1.025] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Sell Prdouct
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SellStock