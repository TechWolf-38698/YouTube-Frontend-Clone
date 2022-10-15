import React, { useState } from "react";
import yt_logo from "../images/yt_logo.png";
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
import { Button } from "@mui/material";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
import { useEffect } from "react";
import { SidebarItem } from "./SidebarItem";
import { SidebarHeading } from "./SidebarHeading";
import SidebarAvatar from "./SidebarAvatar";
import axios from "axios";
import {
  FileFormDialog,
  PlaylistsModal,
  VideoDetailsFormDialog,
} from "./SmallComponents";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../Services/myAxios";
import AccountMenu from "./Test";
import { AccessTime, AccountCircleOutlined } from "@mui/icons-material";

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
  const [open, setOpen] = useState(true);
  const [hideMini, setHideMini] = useState(false);
  const disptach = useDispatch();
  const videoData = useSelector((state) => state.VideoURL);
  const user = useSelector((state) => state.LoggedInUser);
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
  const location =
    useLocation().pathname.split("/")[
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

  const [subscriptions, setSubscriptions] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [threePlaylists, setThreePlaylist] = useState(3);
  const reload = useSelector((e) => e.ReloadPlaylists);
  const dispatch = useDispatch();

  const getSubscriptions = (uId) => {
    axios
      .get(`${baseUrl}/subs/getSubscriptions/${uId}`)
      .then((res) => {
        setSubscriptions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (reload) {
      if (user) {
        getPlaylists(user._id);
      }
      dispatch({ type: "reloadPlaylists", payload: false });
    }
  }, [reload]);

  const getPlaylists = (uID) => {
    axios
      .get(`${baseUrl}/playlist/getByUserId/${uID}`)
      .then((res) => {
        setPlaylists(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    localStorage.getItem("_id")
      ? axios
          .get(`${baseUrl}/users/finduser/byID/${localStorage.getItem("_id")}`)
          .then(
            (res) => {
              disptach({ type: "setLogin", payload: res.data._user });
              getSubscriptions(res.data._user._id);
              getPlaylists(res.data._user._id);
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
          <Link to="/techtube">
            <img src={yt_logo} alt="" style={{ width: "100px" }} />
          </Link>
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search> */}
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
              </Box>

              {/* Avatar Starts here */}
              <AccountMenu />
            </>
          ) : (
            <Link to="/google/signin">
              <Button
                variant="outlined"
                style={{ fontSize: "16px", fontWeight: 600 }}
                type="submit"
                startIcon={<AccountCircleOutlined />}
              >
                Sign in
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
          <Link to="/techtube">
            <SidebarItem
              icon={<HomeIcon />}
              title="Home"
              open={open}
              myClass="SidebarLink techtube"
            />
          </Link>
          <Link to="/techtube/trending">
            <SidebarItem
              icon={<WhatshotIcon />}
              title="Trending"
              open={open}
              myClass="SidebarLink trending"
            />
          </Link>
          {/* <Link to="/techtube/shorts">
            <SidebarItem
              icon={<LocalPlayIcon />}
              title="Shorts"
              open={open}
              myClass="SidebarLink shorts"
            />
          </Link> */}
          <Link to="/techtube/subscriptions">
            <SidebarItem
              icon={<SubscriptionsOutlinedIcon />}
              title="Subsriptions"
              open={open}
              myClass="SidebarLink subscriptions"
            />
          </Link>
          <div style={{ display: open ? "none" : "" }}>
            <Link to="/techtube/library">
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
            <Link to="/techtube/library">
              <SidebarItem
                icon={<VideoLibraryOutlinedIcon />}
                title="Library"
                open={open}
                myClass="SidebarLink library"
              />
            </Link>
            <Link to="/techtube/history">
              <SidebarItem
                icon={<HistoryIcon />}
                title="History"
                open={open}
                myClass="SidebarLink history"
              />
            </Link>
            {user ? (
              <>
                <Link to="/techtube/your-videos">
                  <SidebarItem
                    icon={<PlayCircleOutlinedIcon />}
                    title="Your Videos"
                    open={open}
                    myClass="SidebarLink your-videos"
                  />
                </Link>
                <Link to="/techtube/liked-videos">
                  <SidebarItem
                    icon={<ThumbUpOutlinedIcon />}
                    title="Liked Videos"
                    open={open}
                    myClass="SidebarLink liked-videos"
                  />
                </Link>
                <Link to="/techtube/watch-later">
                  <SidebarItem
                    icon={<AccessTime />}
                    title="Watch Later"
                    open={open}
                    myClass="SidebarLink watch-later"
                  />
                </Link>
                {playlists.length !== 0 ? (
                  <>
                    {playlists.slice(0, threePlaylists).map((e, i) => (
                      <Link to={`/techtube/playlist/${e._id}`} key={i}>
                        <SidebarItem
                          icon={<PlaylistPlayOutlinedIcon />}
                          title={e.name}
                          open={open}
                          myClass={`SidebarLink ${e._id}`}
                        />
                      </Link>
                    ))}
                    {threePlaylists === 3 ? (
                      <>
                        {playlists.length > 3 ? (
                          <SidebarItem
                            // icon={<PlaylistPlayOutlinedIcon />}
                            title={"Show More"}
                            open={open}
                            myClass="SidebarLink"
                            onClick={() => {
                              setThreePlaylist(playlists.length);
                            }}
                          />
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <>
                        {playlists.length > 3 ? (
                          <SidebarItem
                            // icon={<PlaylistPlayOutlinedIcon />}
                            title={"Show Less"}
                            open={open}
                            myClass="SidebarLink"
                            onClick={() => {
                              setThreePlaylist(3);
                            }}
                          />
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}
          </List>
          <Divider />
          {subscriptions.length !== 0 ? (
            <>
              <List>
                <SidebarHeading title="SUBSCRIPTIONS" open={open} />
                {subscriptions.map((e, i) => (
                  <Link to={`/techtube/channel/${e.channel._id}?t=0`} key={i}>
                    <SidebarAvatar
                      name={e.channel.f_name + " " + e.channel.l_name}
                      open={open}
                      myClass={`SidebarLink ${e.channel._id}`}
                    />
                  </Link>
                ))}
              </List>
              {/* <Divider /> */}
            </>
          ) : (
            <></>
          )}
          {
            // <List>
            //   {/* <Divider />
            //   <Link to="/techtube/settings">
            //     <SidebarItem
            //       icon={<SettingsOutlinedIcon />}
            //       title="Settings"
            //       open={open}
            //       myClass="SidebarLink settings"
            //     />
            //   </Link> */}
            //   {/* <Link to="/techtube/send-feedback">
            //     <SidebarItem
            //       icon={<AnnouncementOutlinedIcon />}
            //       title="Send feedback"
            //       open={open}
            //       myClass="SidebarLink send-feedback"
            //     />
            //   </Link> */}
            // </List>
          }
        </div>
      </MyDrawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
        <FileFormDialog />
        <PlaylistsModal />
        {videoData ? (
          <VideoDetailsFormDialog videoData={videoData} user={user} />
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
}
