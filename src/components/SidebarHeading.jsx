import React from "react";
import { ListItem, ListItemText } from "@mui/material";

export const SidebarHeading = ({ title, open }) => {
  return (
    <ListItem>
      <ListItemText sx={{ opacity: open ? 0.5 : 0 }}>{title}</ListItemText>
    </ListItem>
  );
};
