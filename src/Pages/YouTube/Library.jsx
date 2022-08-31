import React, { useEffect } from "react";

export const Library = () => {
  useEffect(()=>{
    document.getElementById("title").innerText="Library - YouTube";
  }, []);
  return (
    <>
      <h1>Library</h1>
    </>
  );
};
