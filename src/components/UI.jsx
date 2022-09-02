import React, { useState } from "react";
import yt_logo from "../images/yt_logo.png";
// Imports for the Sidebar component
import { styled, useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InputBase from "@mui/material/InputBase";
import Tooltip from "@mui/material/Tooltip";
// eslint-disable-next-line
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import LocalPlayIcon from "@mui/icons-material/LocalPlay";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryIcon from "@mui/icons-material/History";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import PlaylistPlayOutlinedIcon from "@mui/icons-material/PlaylistPlayOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";
import { Link, Outlet, useLocation } from "react-router-dom";
import WhatshotIcon from "@mui/icons-material/Whatshot";
// Imports for header component

import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
// eslint-disable-next-line
import { Badge, Button } from "@mui/material";
// eslint-disable-next-line
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
// eslint-disable-next-line
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
import { useEffect } from "react";

// Custom comopnents
import { SidebarItem } from "./SidebarItem";
import { SidebarHeading } from "./SidebarHeading";
import SidebarAvatar from "./SidebarAvatar";
import axios from "axios";
import { MyAvatar } from "./MyAvatar";
import { FileFormDialog, VideoDetailsFormDialog } from "./SmallComponents";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { baseUrl } from "../Services/myAxios";

// Funtion for Drawer...

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function UI() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [hideMini, setHideMini] = useState(false);
  // const [user, setUser] = useState(undefined);
  const disptach = useDispatch();
  const videoData = useSelector((state) => state.VideoURL);
  const user = useSelector((state) => state.LoggedInUser);
  // const [user, setUser] = useState(undefined);

  const MyDrawer = hideMini
    ? Drawer
    : styled(MuiDrawer, {
        shouldForwardProp: (prop) => prop !== "open",
      })(({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        ...(open && {
          ...openedMixin(theme),
          "& .MuiDrawer-paper": openedMixin(theme),
        }),
        ...(!open && {
          ...closedMixin(theme),
          "& .MuiDrawer-paper": closedMixin(theme),
        }),
      }));

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Drawer function ends here...

  // Setting things for header Starts
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  // Setting things for avatar menu

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Setting things for header Ends

  // Setting things for SidebarLinks starts
  const location = useLocation().pathname.split("/")[
    useLocation().pathname.split("/").length - 1
  ];
  var myLink = document.getElementsByClassName("SidebarLink");
  useEffect(() => {
    for (let i = 0; i < myLink.length; i++) {
      if (myLink[i].classList.contains(location)) {
        myLink[i].classList.add("gray");
      } else {
        myLink[i].classList.remove("gray");
      }
    }

    if (location === "watch") {
      setHideMini(true);
    } else if (location !== "watch") {
      setHideMini(false);
    }
  }, [location, hideMini, myLink, []]);

  useEffect(() => {
    localStorage.getItem("_id")
      ? axios
          .get(`${baseUrl}/users/finduser/byID/${localStorage.getItem("_id")}`)
          .then(
            (res) => {
              disptach({ type: "setLogin", payload: res.data._user });
            },
            (err) => {
              console.log(err);
            }
          )
      : disptach({ type: "setLogin", payload: null });
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          {/* Header starts here */}
          <Link to="/youtube">
            <img src={yt_logo} alt="" style={{ width: "100px" }} />
          </Link>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          {user ? (
            <>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={() => {
                    disptach({ type: "openVideoDialog" });
                  }}
                >
                  <UploadOutlinedIcon />
                </IconButton>
                {/* <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={5} color="error">
                    <NotificationsOutlinedIcon />
                  </Badge>
                </IconButton> */}
              </Box>

              {/* Avatar Starts here */}
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ ml: "12px", p: 0 }}
                  >
                    <MyAvatar channel={`${user.f_name} ${user.l_name}`} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      disptach({ type: "openVideoDialog" });
                    }}
                    style={{ width: "300px" }}
                    sx={{ display: { sm: "flex", md: "none" } }}
                  >
                    <div className="mars_001">
                      <UploadOutlinedIcon />
                    </div>
                    <Typography textAlign="center">Upload Video</Typography>
                  </MenuItem>
                  <Divider sx={{ display: { sm: "flex", md: "none" } }} />
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      window.location.reload();
                      localStorage.removeItem("_id");
                    }}
                    style={{ width: "300px" }}
                  >
                    <div className="mars_001">
                      <LogoutIcon />
                    </div>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </>
          ) : (
            <Link to="/google/signin">
              <Button
                variant="outlined"
                style={{ textTransform: "none" }}
                type="submit"
              >
                Signin
              </Button>
            </Link>
          )}
          {/* Avatar Ends here */}
          {/* Header ends here */}
        </Toolbar>
      </AppBar>
      <MyDrawer
        variant={hideMini ? "persistent" : "permanent"}
        sx={
          hideMini
            ? {
                width: open ? drawerWidth : 0,
                transition: theme.transitions.create("width"),
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                  width: open ? drawerWidth : 0,
                  transition: theme.transitions.create("width"),
                  boxSizing: "border-box",
                },
              }
            : {}
        }
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <Link to="/youtube">
            <SidebarItem
              icon={<HomeIcon />}
              title="Home"
              open={open}
              myClass="SidebarLink youtube"
            />
          </Link>
          <Link to="/youtube/trending">
            <SidebarItem
              icon={<WhatshotIcon />}
              title="Trending"
              open={open}
              myClass="SidebarLink trending"
            />
          </Link>
          <Link to="/youtube/shorts">
            <SidebarItem
              icon={<LocalPlayIcon />}
              title="Shorts"
              open={open}
              myClass="SidebarLink shorts"
            />
          </Link>
          <Link to="/youtube/subscriptions">
            <SidebarItem
              icon={<SubscriptionsOutlinedIcon />}
              title="Subsriptions"
              open={open}
              myClass="SidebarLink subscriptions"
            />
          </Link>
          <div style={{ display: open ? "none" : "" }}>
            <Link to="/youtube/library">
              <SidebarItem
                icon={<VideoLibraryOutlinedIcon />}
                title="Library"
                open={open}
                myClass="SidebarLink library"
              />
            </Link>
          </div>
        </List>
        <div style={{ display: open ? "" : "none" }}>
          <Divider />
          <List>
            <Link to="/youtube/library">
              <SidebarItem
                icon={<VideoLibraryOutlinedIcon />}
                title="Library"
                open={open}
                myClass="SidebarLink library"
              />
            </Link>
            <Link to="/youtube/history">
              <SidebarItem
                icon={<HistoryIcon />}
                title="History"
                open={open}
                myClass="SidebarLink history"
              />
            </Link>
            {user ? (
              <Link to="/youtube/your-videos">
                <SidebarItem
                  icon={<PlayCircleOutlinedIcon />}
                  title="Your Videos"
                  open={open}
                  myClass="SidebarLink your-videos"
                />
              </Link>
            ) : (
              <></>
            )}
            <Link to="/youtube/watch-later">
              <SidebarItem
                icon={<WatchLaterOutlinedIcon />}
                title="Watch Later"
                open={open}
                myClass="SidebarLink watch-later"
              />
            </Link>
            <Link to="/youtube/liked-videos">
              <SidebarItem
                icon={<ThumbUpOutlinedIcon />}
                title="Liked Videos"
                open={open}
                myClass="SidebarLink liked-videos"
              />
            </Link>
            <Link to="/youtube/playlist">
              <SidebarItem
                icon={<PlaylistPlayOutlinedIcon />}
                title="Playlists"
                open={open}
                myClass="SidebarLink playlist"
              />
            </Link>
          </List>
          <Divider />
          <List>
            <SidebarHeading title="SUBSCRIPTIONS" open={open} />
            <Link to="/youtube/channel">
              <SidebarAvatar
                name="Funky Wolf"
                open={open}
                myClass="SidebarLink channel "
              />
            </Link>
          </List>
          <Divider />
          <List>
            <Link to="/youtube/settings">
              <SidebarItem
                icon={<SettingsOutlinedIcon />}
                title="Settings"
                open={open}
                myClass="SidebarLink settings"
              />
            </Link>
            <Link to="/youtube/send-feedback">
              <SidebarItem
                icon={<AnnouncementOutlinedIcon />}
                title="Send feedback"
                open={open}
                myClass="SidebarLink send-feedback"
              />
            </Link>
          </List>
        </div>
      </MyDrawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
        <FileFormDialog />
        {videoData ? (
          <VideoDetailsFormDialog videoData={videoData} user={user} />
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
}
