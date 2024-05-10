import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {
  fetchAllEmployee,
  fetchAttendanceByDate,
  getAllEmployee,
} from "../API/config";
import DatePicker from "react-datepicker";
import { useQuery } from "react-query";
import "react-datepicker/dist/react-datepicker.css";
import Loading from "../components/Loading";

export function Dashboard() {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(
    month + "-" + currentDate.getDate() + "-" + currentDate.getFullYear()
  );

  const {
    data: attendances,
    isLoading: attendanceLoading,
    isError: attendanceError,
  } = useQuery(
    ["attendance", selectedDate], // Query key
    () => fetchAttendanceByDate(selectedDate)
  );

  // const token = localStorage.getItem("token")
  // if(token) {
  //   const decoded_token = jwtDecode(token)
  //   const role =
  //   if (decoded_token.rol !==)
  // }

  const {
    data: employees,
    isLoading,
    isError,
  } = useQuery("allEmployees", getAllEmployee);


  const handleDateChange = (date) => {
    const selectedDate = date;
    const formattedDate = selectedDate.toLocaleDateString("en-GB");
    setSelectedDate(formattedDate);
  };

  return (
    <>
      <Header />
      {/* <div>
        <div className="p-4 flex items-center justify-center">
          <DatePicker
          selected={selectedDate}
          className="cursor-pointer w-[100px] p-2 outline-none rounded-md border  border-1"
          onChange={handleDateChange}
          dateFormat="dd-MM-yyyy"
          />
        </div>
      </div> */}
      <div className="flex p-3 border border-1 rounded-md my-2 justify-between items-center">
        <p className="font-bold text-xl">Attendance Report</p>
        <p className="font-semibold">
          {currentDate.getDate() +
            "/" +
            `${month}` +
            "/" +
            currentDate.getFullYear()}
        </p>
      </div>

      {isLoading || attendanceLoading ? (
        <Loading height="50vh" />
      ) : (
        <table className="table-auto w-full shadow-md overflow-hidden rounded-md">
          <thead>
            <tr className="py-4 bg-green-800 text-white rounded-lg">
              <th className="py-4 w-1/5">Name</th>
              <th className="w-3/5">Location</th>
              <th className="w-1/5">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {employees?.data.map((employee) => {
              const attendance = attendances?.data.find(
                (att) => att.employee.id === employee.id
              );
              const admin = employee.roles === "ROLE_ADMIN";
              return (
                !admin &&
                employee.verified && ( // Check if not an admin
                  <tr key={employee.id} className="border-b">
                    <td className="p-4">{employee.name}</td>
                    <td className="p-4">
                      {attendance ? attendance.location : "~"}
                    </td>
                    <td className="p-4">
                      <div
                        className={`w-max rounded-md px-1 font-semibold m-auto ${
                          attendance ? "bg-green-200" : "bg-red-200"
                        }`}
                      >
                        <p className="text-center">
                          {attendance ? "Present" : "Absent"}
                        </p>
                      </div>
                    </td>
                  </tr>
                )
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
