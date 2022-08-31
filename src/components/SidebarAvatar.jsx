import * as React from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";

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
    children: `${name.split(" ")[0][0]}`,
  };
}

export default function SidebarAvatar({ name, open, myClass, img }) {
  return (
    <>
      <ListItem disablePadding sx={{ display: "block" }} className={myClass}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
            color: "#fff",
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            {img ? (
              <Avatar src={img} sx={{ width: 30, height: 30 }} />
            ) : (
              <Avatar {...stringAvatar(name)} sx={{ width: 30, height: 30 }} />
            )}
          </ListItemIcon>
          <ListItemText primary={name} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
    </>
  );
}
