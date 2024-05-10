import axios from "axios";

const url = "https://vimal-sakseria.onrender.com";

export const getHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export async function employeeDetails() {
  try {
    return await axios.get(url + "/current-employee", {
      headers: getHeader(),
    });
  } catch (error) {
    throw error;
  }
}

export async function getTodaysAttendance() {
  try {
    return await axios.get(url + "/attendance/today", {
      headers: getHeader(),
    });
  } catch (error) {
    throw error;
  }
}

export async function employeeTotalAttendance() {
  try {
    return await axios.get(url + "/attendance/employee", {
      headers: getHeader(),
    });
  } catch (error) {
    throw error;
  }
}
export async function getCustomAttendance(startingDate, endingDate) {
  try {
    return await axios.get(
      url + `/custom-attendance/${startingDate}/${endingDate}`,
      {
        headers: getHeader(),
      }
    );
  } catch (error) {
    throw error;
  }
}

export async function submitAttendance(location) {
  try {
    return await axios.post(
      url + `/attendance/${location}`,
      {},
      {
        headers: getHeader(),
      }
    );
  } catch (error) {
    throw error;
  }
}

export async function getUnverifiedEmployee() {
  try {
    return axios.get(url + "/employee/unverified", {
      headers: getHeader(),
    });
  } catch (error) {
    throw error;
  }
}




export async function getCustomAttendanceAllEmployee(
  employeeId,
  startingDate,
  endingDate
) {
  try {
    return await axios.get(
      url + `/custom-attendance/${employeeId}/${startingDate}/${endingDate}`,
      {
        headers: getHeader(),
      }
    );
  } catch (error) {
    throw error;
  }
}

export async function getAllEmployee() {
  try {
    return await axios.get(url + "/employee", {
      headers: getHeader(),
    }); 
  } catch (error) {
    throw error;
  }
}

export async function signUp(data) {
  try {
    return axios.post(url + "/sign-up", data);
  } catch (error) {
    console.log("Error while signup");
    console.log(error.response.data);
  }
}

export async function loginEmployee(data) {
  try {
    return axios.post(url + "/login", data);
  } catch (error) {
    console.log("Error while login");
    console.log(error.response.data);
  }
}

export async function fetchAttendanceByDate() {
  try {
    return await axios.get(
      `http://localhost:8080/attendance/today/all`,
      {
        headers: getHeader(),
      }
    );
  } catch (error) {
    throw error;
  }
}

export async function fetchAllEmployee(){
  try {
    return await axios.get("http://localhost:8080/employee", {
      headers: getHeader()
    });
  } catch (error) {
    throw error
  }
};