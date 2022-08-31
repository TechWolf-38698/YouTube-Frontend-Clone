import React, { useEffect } from "react";

export const WatchLater = () => {
  useEffect(() => {
    document.getElementById("title").innerText = "Watch Later - YouTube";
  }, []);
  return (
    <>
      <h1>WatchLater</h1>
    </>
  );
};
