import React, { useEffect } from "react";

export const Shorts = () => {
  useEffect(() => {
    document.getElementById("title").innerText = "YouTube";
  }, []);
  return (
    <>
      <h1>Shorts</h1>
    </>
  );
};
