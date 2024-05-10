import { CircularProgress } from "@mui/material";
import React from "react";

function Loading({height = "80vh"}) {
  return (
    <div className={`flex justify-center place-items-center h-[70vh]`}>
      <CircularProgress />
    </div>
  );
}

export default Loading;