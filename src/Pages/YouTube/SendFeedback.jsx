import React, { useEffect } from "react";

export const SendFeedback = () => {
  useEffect(()=>{
    document.getElementById("title").innerText="Send Feedback - YouTube";
  }, []);
  return (
    <>
      <h1>SendFeedback</h1>
    </>
  );
};
