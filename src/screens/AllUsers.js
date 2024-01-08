import React from "react";
import UsersTable from "../components/UsersTable";

function AllUsers
  () {

  return (
    <div className=" relative w-[100vw] min-h-screen text-[var(--textColor)] md:w-[75vw] mx-auto pt-10">
      <UsersTable />

    </div>
  );
}

export default AllUsers
  ;
