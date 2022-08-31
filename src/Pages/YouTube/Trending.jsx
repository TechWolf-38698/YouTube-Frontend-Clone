import React, { useEffect } from "react";

export const Trending = () => {
  useEffect(() => {
    document.getElementById("title").innerText = "Trending - YouTube";
  }, []);
  return (
    <>
      <h1>Trending</h1>
    </>
  );
};
