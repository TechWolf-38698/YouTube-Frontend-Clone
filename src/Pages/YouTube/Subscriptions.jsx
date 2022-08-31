import React, { useEffect } from "react";

export const Subscriptions = () => {
  useEffect(() => {
    document.getElementById("title").innerText = "Subscriptions - YouTube";
  }, []);
  return (
    <>
      <h1>Subscriptions</h1>
    </>
  );
};
