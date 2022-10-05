import React, { useEffect } from "react";

export const Shorts = () => {
  useEffect(() => {
    document.getElementById("title").innerText = "TechTube";
  }, []);
  return (
    <>
      <div
        className="col d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <h1 className="text-center text-muted">Coming Soon...</h1>
      </div>
    </>
  );
};
