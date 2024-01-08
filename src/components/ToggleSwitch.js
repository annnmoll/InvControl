import React, { useState } from "react";

const ToggleSwitch = ({setRole , role}) => {



const [isChecked, setIsChecked] = useState(false);



  const handleCheckboxChange = () => {
     
    if(role === "Salesman" ){ setRole("Admin") ; console.log("Admin")}
    else{ setRole("Salesman") ; console.log("Salesman")}  
    setIsChecked(!isChecked);
};

  return (
    <div className="">
      <label className="themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-transparent  ">
        <input
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span
          className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
            !isChecked
              ? "text-white bg-[var(--bgColor)] rounded-[50px]"
              : "text-black"
          }`}
        >
       
          Salesman
        </span>
        <span
          className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
            isChecked
              ? "text-white bg-[var(--bgColor)] rounded-[50px]"
              : "text-black"
          }`}
        >
          
          Admin
        </span>
      </label>
    </div>
  );
};

export default ToggleSwitch;