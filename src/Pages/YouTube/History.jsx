import React, { useEffect } from "react";

export const History = () => {
  useEffect(() => {
    document.getElementById("title").innerText = "History - YouTube";
  }, []);
  return (
    <>
      <h1>History</h1>
    </>
  );
};
