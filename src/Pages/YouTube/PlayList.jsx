import React, { useEffect } from "react";

export const PlayList = ({title}) => {
  useEffect(() => {
    document.getElementById("title").innerText = title + " - YouTube";
  }, []);
  return (
    <>
      <h1>PlayList</h1>
    </>
  );
};
