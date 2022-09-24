import { Avatar } from "@mui/material";
import React from "react";

export const MyAvatar = ({ img, channel, width, height, font }) => {
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        height: height ? height : "40px",
        width: width ? width : "40px",
      },
      src: img,
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
      style: { fontSize: font ? font : "15px" },
    };
  }

  return (
    <>
      <Avatar {...stringAvatar(channel)} />
    </>
  );
};
