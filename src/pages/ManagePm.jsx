import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import axios from "../axios";
import { useStateContext } from "../context/CreateContext";
import Pagnation from "../components/Pagnation";
import CardPerson from "../components/CardPreson";

const ManagePm = () => {
  const [employees, setEmployees] = useState([]);
  const { token } = useStateContext();
  useEffect(() => {
    const getEmployees = async () => {
      try {
        const res = await axios.get("managers", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        console.log(res.data);
        setEmployees(res.data.content);
      } catch (err) {
        console.log(err);
      }
    };
    getEmployees();
  }, []);
  console.log(employees);
  return (
    <div className="py-10 w-full relative px-2">
      <SearchBar />
      <h3 className="text-[20px] font-bold text-[#0D425B] mt-6">
        Employees Info
      </h3>
      <div className="card__person mt-6">
        {employees.length > 0 &&
          employees.map((employee) => (
            <CardPerson
              firstName={employee.firstName}
              lastName={employee.lastName}
              staffId={employee.staffId}
              email={employee.email}
              phoneNo={employee.phoneNo}
              img={employee.imgSrc}
            />
          ))}
      </div>
      <Pagnation />
    </div>
  );
};

export default ManagePm;
