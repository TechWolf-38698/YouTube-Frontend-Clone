import React, { useEffect } from "react";

export const SendFeedback = () => {
  useEffect(()=>{
    document.getElementById("title").innerText="Send Feedback - TechTube";
  }, []);
  return (
    <>
      <h1>SendFeedback</h1>
    </>
  );
};
