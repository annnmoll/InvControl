import axios from "axios";
import React, { useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
    const navigate = useNavigate();
    const inputRef = useRef();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const addToStockHandler = async (e) => {


        e.preventDefault();
        if (inputRef.current.value === "0") { return toast.warn("Please enter a valid value") }
        const token = localStorage.getItem("authToken");

        await axios({
            method: "post",
            url: "http://localhost:5000/api/product/addstock",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
            data: {
                id: product._id,
                stockAdded: inputRef.current.value,
            },
        })
            .then(() => {
                toast.success("Stock added successfully");
                navigate("/");
            })
            .catch((error) => {
                toast.warn(error.response.data.message);
            });
    };
    const deleteHandler = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("authToken");

        await axios({
            method: "post",
            url: "http://localhost:5000/api/product/deletestock",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
            data: {
                id: product._id,

            },
        })
            .then(() => {
                toast.success("Stock deleted successfully");
                navigate("/");
            })
            .catch((error) => {
                toast.warn(error.response.data.message);
            });
    }


    return (
        <div className="   text-black grid md:grid-cols-2 rounded-[20px] ">
            <div className="overflow-hidden bg-cover bg-no-repeat flex items-center ">
                <img
                    className="rounded-t-sm  w-[100%] object-cover p-10"
                    src={product.image}
                    alt=""
                />
            </div>

            <div className="flex flex-col text-center md:text-left   md:pl-10 md:pt-10 gap-10 m-14 rounded-[20px] text-white p-10 ">
                <p className="text-[2rem] font-bold mt-10">{product.name}</p>
                <div className="flex flex-col gap-5 ">
                    <p className="text-lg text-white dark:text-neutral-200">
                        {product.description}
                    </p>

                    <div>
                        <div className=" text-lg   flex justify-between  mb-2">
                            <span>Price</span>{" "}
                            <span className="font-bold">Rs.{product.price}/-</span>
                        </div>
                        <div className=" text-lg  flex justify-between mb-2">
                            <span>Left in stock</span>{" "}
                            <span className="font-bold">{product.quantityLeft} out of {product.stock}</span>
                        </div>
                        <div className=" text-lg  flex justify-between mb-2">
                            <span>Quantity sold</span>{" "}
                            <span className="font-bold">{product.soldQuantity} out of {product.stock}</span>
                        </div>
                        <div className=" text-lg  flex justify-between mb-2">
                            <span>Total Value</span>{" "}
                            <span className="font-bold">
                                Rs.{product.quantityLeft * product.price}
                            </span>
                        </div>
                    </div>

                    <div className="container w-100 flex items-center">
                        <input
                            ref={inputRef}
                            type="number"
                            min="0"
                            defaultValue="0"
                            className=" py-2 m-2   bg-[var(--textColor)] text-black outline-none border-none rounded-md p-2"
                        />
                        <div className="w-full">
                            <button
                                id="button"
                                onClick={addToStockHandler}
                            >
                                Add
                            </button>
                        </div>

                    </div>
                    <hr className="-m-3"></hr>
                    <button id="button"
                        onClick={() => navigate('/sellstock')}
                    >
                        Sell
                    </button>
                    {userInfo.role === 'Admin' ?
                        <button id="button" className="del"
                            onClick={deleteHandler}
                        >
                            Delete
                        </button> : ""
                    }                </div>
            </div>
        </div>
    );
}

export default ProductCard;
