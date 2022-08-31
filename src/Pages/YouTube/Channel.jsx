import React, { useEffect } from "react";

export const Channel = ({name}) => {
  useEffect(()=>{
    document.getElementById("title").innerText=name + " - YouTube";
  }, []);
  return (
    <>
      <h1>Channel</h1>
    </>
  );
};
