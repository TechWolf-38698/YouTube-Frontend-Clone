import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";

export const SidebarItem = ({ icon, title, open, myClass }) => {
  return (
    <ListItem disablePadding sx={{ display: "block" }} className={`${myClass}`}>
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
          {icon}
        </ListItemIcon>
        <ListItemText primary={title} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  );
};
