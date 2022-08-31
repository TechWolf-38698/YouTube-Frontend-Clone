import React, { useEffect } from "react";

export const LikedVideos = () => {
  useEffect(() => {
    document.getElementById("title").innerText = "Liked videos - YouTube";
  }, []);
  return (
    <>
      <h1>LikedVideos</h1>
    </>
  );
};
