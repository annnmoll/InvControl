import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"
import { useDispatch } from "react-redux";
import { setLogin } from "../redux/slices/loginSlice";
import Banner from "../images/Banner.png";


function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef();


  const submitHandler = async (e) => {
    e.preventDefault();

    const userObj = {
      email: formRef.current.email.value,
      password: formRef.current.password.value,
    };

    console.log(userObj);
    await axios({
      method: "post",
      url: "http://localhost:5000/api/user/login",
      data: userObj,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        toast.success("Login successfully");
        const userInfo = response?.data.user[0];
        dispatch(setLogin(true));
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        localStorage.setItem("authToken", response?.data?.token);
        navigate("/");
      })
      .catch((error) => {
        toast.warn(error.response.data.message);
      });
  };
  return (
   
    <div className=" w-full h-full  grid md:grid-cols-2  py-16  bg-[var(--background)]">
    <div className="hidden md:flex justify-center items-center gap-4  ">
      <img src={Banner} alt="Inventory Management" className="w-[80%] h-full object-contain"></img>
    </div>
    <div className="w-full text-[var(--textColor)]   text-center md:text-left  px-4 flex items-center justify-center">
    <div className="w-full bg-white rounded-lg shadow sm:max-w-md p-5 pb-10 ">
    <h1 className="text-xl mb-7 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
               Log in to your account
           </h1>
             <form
              ref={formRef}
              className="space-y-4 md:space-y-6"

              onSubmit={submitHandler}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div>
                <button
                  id="button"
                  type="submit"

                >
                  Sign in
                </button>
              </div>
            </form>
    </div>
    </div>
  </div>


    // <section className="w-full bg-[var(--background)]">
    //   <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto sm:min-h-[88vh]  ">
    //     <div className="w-full bg-white rounded-lg shadow sm:max-w-md ">
    //       <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
    //         <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
    //           Log in to your account
    //         </h1>
    //         <form
    //           ref={formRef}
    //           className="space-y-4 md:space-y-6"

    //           onSubmit={submitHandler}
    //         >
    //           <div>
    //             <label
    //               htmlFor="email"
    //               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //             >
    //               Your email
    //             </label>
    //             <input
    //               type="email"
    //               name="email"
    //               id="email"
    //               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //               placeholder="name@company.com"
    //               required=""
    //             />
    //           </div>
    //           <div>
    //             <label
    //               htmlFor="password"
    //               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //             >
    //               Password
    //             </label>
    //             <input
    //               type="password"
    //               name="password"
    //               id="password"
    //               placeholder="••••••••"
    //               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //               required=""
    //             />
    //           </div>
    //           <div>
    //             <button
    //               id="button"
    //               type="submit"

    //             >
    //               Sign in
    //             </button>
    //           </div>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
}

export default Login;