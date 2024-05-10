import axios from "axios";
import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import {
  employeeDetails,
  employeeTotalAttendance,
  getAllEmployee,
  getCustomAttendance,
  getCustomAttendanceAllEmployee,
  getHeader,
  getTodaysAttendance,
  getUnverifiedEmployee,
} from "../API/config";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import AddAttendance from "./AddAttendance";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Header from "../components/Header";
import { useQuery } from "react-query";
import Loading from "../components/Loading";

function Employee() {
  // const [employee, setEmployee] = useState([]);
  // const [totalAttendance, setTotalAttendance] = useState([]);
  // const [todaysAttendance, setTodaysAttendnce] = useState([]);
  const url = "https://vimal-sakseria.onrender.com"
  const [employeeId, setEmployeeId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [modal, setModal] = useState(false);
  const [loadingRemove, setLoadingRemove] = useState(false)
  const [loadingVerify, setLoadingVerify] = useState(false)
  const [loadingCustomAttendance, setLoadingCustomAttendance] = useState(false)
  // const [unverifiedEmployee, setUnverifiedEmployee] = useState([]);
  const [customAttendance, setCustomAttendance] = useState([]);
  // const [allEmployee, setAllEmployee] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let role;
  const currentDate = new Date();
  if (token) {
    const decoded_token = jwtDecode(token);
    role = decoded_token.role.authority;
  }

  const { data: allEmployee, isLoading } = useQuery(
    "allEmployee",
    getAllEmployee
  );

  const { data: unverifiedEmployee } =
    role === "ROLE_ADMIN"
      ? useQuery("unverifiedEmployees", getUnverifiedEmployee)
      : { data: null };
  const { data: totalAttendance, isLoading: totalAttendanceLoading } = useQuery(
    "totalAttendance",
    employeeTotalAttendance
  );
  const { data: employee, isLoading: employeeLoading } = useQuery(
    "employee",
    employeeDetails
  );
  const { data: todaysAttendance } = useQuery(
    "todaysAttendance",
    getTodaysAttendance
  );

  // const fetchEmployee = async () => {
  //   const response = await employeeDetails();
  //   setEmployee(response.data);
  // };

  // const fetchAttendance = async () => {
  //   const response = await employeeTotalAttendance();
  //   setTotalAttendance(response.data);
  // };

  // const fetchTodaysAttendance = async () => {
  //   const response = await getTodaysAttendance();
  //   if (response.data) setTodaysAttendnce(response.data);
  // };

  const fetchCustomAttendance = async () => {
    if (startDate !== "" && endDate !== "" && employeeId === "") {
      setLoadingCustomAttendance(true)
      const response = await getCustomAttendance(startDate, endDate);
      setCustomAttendance(response.data);
    }
    if (startDate !== "" && endDate !== "" && employeeId !== "") {
      setLoadingCustomAttendance(true)
      const response = await getCustomAttendanceAllEmployee(
        employeeId,
        startDate,
        endDate
      );
      setCustomAttendance(response.data);
    }
    setLoadingCustomAttendance(false)
  };

  // const fetchAllEmployee = async () => {
  //   const response = await getAllEmployee();
  //   setAllEmployee(response.data);
  // };

  // const fetchUnverifiedEmployee = async () => {
  //   const response = await getUnverifiedEmployee();
  //   setUnverifiedEmployee(response.data);
  // };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    location.reload();
  };

  const handleVerification = async (employeeId)  => {
    try {
      setLoadingVerify(true)
      await axios.put(
        url + `/employee/verify/${employeeId}`,
        {},
        {
          headers: getHeader(),
        }
      );
      location.reload();
    } catch (error) {
      throw error;
    } finally {
      setLoadingVerify(false)
    }
  }

  const removeEmployee = async(employeeId) => {
    try {
      setLoadingRemove(true)
      await axios.delete(url + `/employee/${employeeId}`, {
        headers: getHeader(),
      });
      location.reload();
    } catch (error) {
      throw error;
    } finally {
      setLoadingRemove(false)
    }
  }
  



  // useEffect(() => {
  // fetchEmployee();
  // fetchAttendance();
  // fetchTodaysAttendance();
  // fetchAllEmployee();
  //   if (role === "ROLE_ADMIN")
  //     fetchUnverifiedEmployee();
  // }, []);

  if (totalAttendanceLoading || employeeLoading) {
    return (
      <>
        <Header />
        <Loading />
      </>
    );
  }
  return (
    <>
      <Header />
      <div className="text-left p-2 border shadow-md my-2 md:text-center">
        <p className="font-semibold text-xl">Hello,</p>
        <p className="text-2xl font-bold mb-5">{employee?.data.name}</p>
        {role === "ROLE_USER" && (
          <>
            <p className="font-semibold text-xl">
              Total Attendances: {totalAttendance?.data.length}
            </p>
            <div className="my-5">
              {todaysAttendance?.data.present ? (
                <button className="py-2 px-3 mb-2 md:text-xl border border-1 rounded-md bg-green-700 text-white p-4">
                  <PlaylistAddIcon />{" "}
                  <span className="ms-1">Attendance Submited</span>
                </button>
              ) : (
                currentDate.getHours() < 16 && (
                  <button
                    onClick={() => setModal(true)}
                    className="py-2 px-1 mb-2 md:text-xl border border-1 rounded-md bg-green-900 text-white p-4"
                  >
                    <PlaylistAddIcon />{" "}
                    <span className="ms-1">Submit Todays Attendance</span>
                  </button>
                )
              )}

              {modal && <AddAttendance onClose={() => setModal(false)} />}
            </div>
          </>
        )}
      </div>
      {role === "ROLE_ADMIN" && unverifiedEmployee?.data.length > 0 && (
        <div className="border rounded-md py-2">
          <p className="text-red-600 font-bold text-2xl">
            Pending Verification
          </p>
          {unverifiedEmployee?.data.map((emp) => (
            <div
              key={emp.id}
              className="border m-5 p-2 flex flex-col md:flex-row gap-2 md:justify-between"
            >
              <p className="text-xl">{emp.name}</p>
              <p className="text-xl">{emp.email}</p>
              <div className="flex  justify-center text-white gap-3">
                <button
                  onClick={() => handleVerification(emp.id)}
                  className="h-10 w-24 border bg-green-700 rounded-md"
                >
                  {loadingVerify ? <CircularProgress size={20} color="warning"/> : "Verify"}
                </button>
                <button
                  onClick={() => removeEmployee(emp.id)}
                  className="h-10 w-24 border bg-red-700 rounded-md"
                >
                  {loadingRemove ? <CircularProgress size={20} color="warning"/> : "Remove"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {customAttendance.length > 0 ? (
        <table className="table-auto w-full shadow-md overflow-hidden rounded-md">
          <thead>
            <tr className="py-4 bg-green-700 text-white rounded-lg">
              <th className="py-4 w-1/3">Date</th>
              <th className="w-2/3">Location</th>
            </tr>
          </thead>
          <tbody>
            {customAttendance.map((attendance) => {
              return (
                // Check if not an admin
                <tr key={attendance.id} className="border-b">
                  <td className="p-4">{attendance.date}</td>
                  <td className="p-4">{attendance.location}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <>
          <div className="shadow-md border p-2 font-semibold flex flex-col gap-5 my-5">
            <p className="text-2xl border-b-2 mb-2">Custom Attendance Data</p>
            {role === "ROLE_ADMIN" && (
              <div>
                <select
                  name=""
                  id=""
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="border p-2 px-6 rounded-md"
                >
                  <option value="">Select employee</option>
                  {allEmployee?.data.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div>
              <label htmlFor="" className="p-1">
                From:{" "}
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border rounded-md bg-green-200 p-1"
                name=""
                id=""
              />
            </div>
            <div>
              <label htmlFor="" className="p-4">
                To:{" "}
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border rounded-md bg-green-200 p-1"
                name=""
                id=""
              />
            </div>

            {/* {customAttendance.length > 0 && (
        <>
          <div>
            <p className="py-2 font-semibold text-xl border rounded-md">
              No. of days Present : {customAttendance.length}
            </p>
          </div>
          <table className="table-auto w-ful overflow-hidden rounded-md">
            <thead>
              <tr className="p-4 border">
                <th>Date</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {customAttendance.map((att) => (
                <tr key={att.id} className="p-4 border">
                  <td className="w-1/3">{att.date}</td>
                  <td className="w-2/3">{att.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )} */}
            <div>
              <button
                onClick={fetchCustomAttendance}
                className="border rounded-md md:w-[200px] bg-green-700 w-full h-10 text-white"
              >
                {loadingCustomAttendance ? <CircularProgress size={20} color="error"/> : "Get"}
              </button>
            </div>
          </div>
          <div>
            <button
              onClick={handleLogout}
              className="bg-green-700 p-3 px-5 rounded-md text-white"
            >
              Logout
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default Employee;
