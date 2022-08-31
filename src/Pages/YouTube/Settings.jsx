import React, { useEffect } from "react";

export const Settings = () => {
  useEffect(() => {
    document.getElementById("title").innerText = "Settings - YouTube";
  }, []);
  return (
    <>
      <h1>Settings</h1>
    </>
  );
};
