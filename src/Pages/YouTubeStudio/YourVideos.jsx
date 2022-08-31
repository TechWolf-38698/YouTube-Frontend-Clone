import React, { useEffect } from "react";

export const YourVideos = () => {
  useEffect(() => {
    document.getElementById("title").innerText = "Your Videos - YouTube";
  }, []);
  return (
    <>
      <h1>YourVideos</h1>
    </>
  );
};
