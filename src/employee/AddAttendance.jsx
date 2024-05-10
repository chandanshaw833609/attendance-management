import React, { useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Input } from "@material-tailwind/react";
import axios from "axios";
import { getHeader, submitAttendance } from "../API/config";

function AddAttendance({ onClose }) {
  const [location, setLocation] = useState();
  const modalRef = useRef();
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await submitAttendance(location);
      window.location.reload()
      // Handle successful response
      console.log('Attendance submitted successfully', response);
    } catch (error) {
      // Handle error
      console.error('Error submitting attendance', error);
    }
  };

  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className="fixed inset-0 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="flex flex-col gap-5">
        <button onClick={onClose}>
          <CloseIcon />
        </button>
        <div className="bg-green-700 px-10 py-5  md:px-14 md:py-5 flex flex-col gap-5 items-center mx-4 rounded-md">
          <h1 className="text-white md:text-xl">Give Your Location</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <textarea
                name="location"
                type="text"
                rows={5}
                cols={30}
                id="location"
                value={location}
                onChange={handleLocationChange}
                className="rounded-md font-semibold outline-none p-1 md:p-2"
              />
            </div>

            <input
              type="submit"
              className="md:mt-4 mt-2 bg-black rounded-md text-white px-5 py-2"
              value="Save"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddAttendance;
