import { Avatar } from "@mui/material";
import React from "react";

export const MyAvatar = ({ img, channel, width, height }) => {
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
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  return (
    <>
      {img ? (
        <Avatar src={img} sx={{ width: 24, height: 24 }} />
      ) : (
        <Avatar
          style={{
            fontSize: "14px",
            height: "36px",
            width: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          {...stringAvatar(channel)}
        />
      )}
    </>
  );
};
