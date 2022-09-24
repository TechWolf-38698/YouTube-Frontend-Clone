import React from "react";
import Image from "../images/black.png";
import {
  Avatar,
  Backdrop,
  Button,
  Checkbox,
  // CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  // DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Skeleton,
  Switch,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { MyAvatar } from "./MyAvatar";
import { useState } from "react";
import UploadIcon from "@mui/icons-material/Upload";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { baseUrl, contentUrl } from "../Services/myAxios";
import { Close } from "@mui/icons-material";
const hdate = require("human-date");

export const HomeCardPreLoader = () => {
  return (
    <div className="col-4 col-lg-3 my-3">
      <Skeleton
        variant="rectangular"
        width="100%"
        height="170px"
        animation={false}
      />
      <Box sx={{ display: "flex", alignItems: "center" }} className="my-2">
        <Box className="mr-2">
          <Skeleton variant="circular" animation={false}>
            <Avatar />
          </Skeleton>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Skeleton width="100%" animation={false} height="40px"></Skeleton>
          <Skeleton width="60%" animation={false} height="30px"></Skeleton>
        </Box>
      </Box>
    </div>
  );
};

export const HomeCard = ({ img, title, channel, views, createdAt, url }) => {
  let date = hdate.relativeTime(createdAt);
  return (
    <>
      <div className="col-12 col-sm-6 col-md-4 col-xl-3 my-3">
        <Link to={url}>
          <div
            className="d-flex justify-content-center"
            style={{
              width: "100%",
              height: "176.475px",
              backgroundColor: "black",
            }}
          >
            {/* <img
              src={img}
              style={{
                maxHeight: "176.475px",
              }}
            /> */}
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundImage: `url(${img ? img : Image})`,
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </div>
          <Box sx={{ display: "flex" }} className="my-2">
            <Box className="mr-2">
              {/* <Avatar /> */}
              <MyAvatar channel={channel} />
            </Box>
            <Box sx={{ width: "100%" }}>
              {" "}
              <Box sx={{ pr: 2 }}>
                <p className="home-video-title mb-2">{title}</p>
                <p className="home-channel-name m-0">{channel}</p>
                <p className="home-channel-name m-0">{`${views} ${
                  views === 1 ? "view" : "views"
                } • ${date}`}</p>
              </Box>
            </Box>
          </Box>
        </Link>
      </div>
    </>
  );
};

export const FileFormDialog = () => {
  // eslint-disable-next-line
  const [scroll, setScroll] = React.useState("paper");
  const [file, setFile] = useState(undefined);
  const disptach = useDispatch();
  const open = useSelector((state) => state.OpenVideoDialog);
  const user = useSelector((state) => state.LoggedInUser);
  var form = new FormData();

  const Input = styled("input")({
    display: "none",
  });

  const myFun = () => {
    form.append("video", file[0]);
    form.append("channelId", user._id);
    form.append("title", `${file[0].name}`);

    axios
      .post(`${baseUrl}/video/postVideo`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(
        (res) => {
          disptach({ type: "setVideoURL", payload: res.data.myVid });
          // disptach({ type: "openVideoDetailsDialog" });
          disptach({ type: "closeVideoDialog" });
          console.log(res.data);
        },
        (err) => {
          console.log(err);
        }
      );
  };
  const doNothing = () => {};
  useEffect(() => {
    file ? myFun() : doNothing();
  }, [file]);
  return (
    <>
      <Dialog fullWidth maxWidth="md" open={open}>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          <span>Upload a Video</span>
          <IconButton
            size="large"
            color="inherit"
            onClick={() => {
              disptach({ type: "closeVideoDialog", payload: false });
            }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <div className="container-fluid pt-3">
            <div className="row align-items-center" style={{ height: "65vh" }}>
              <div className="col-12">
                <div className="row justify-content-center">
                  <div
                    style={{
                      backgroundColor: "#161616",
                      borderRadius: "50%",
                      height: "136px",
                      width: "136px",
                    }}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <UploadIcon sx={{ fontSize: "80px", color: "#909090" }} />
                  </div>
                </div>
                <div className="row justify-content-center align-items-center">
                  <div
                    className=" col-12"
                    style={{
                      fontFamily: '"Roboto","Noto",sans-serif',
                      fontWeight: 400,
                      WebkitFontSmoothing: "antialiased",
                      fontSize: "15px",
                      lineHeight: "24px",
                      marginTop: "23px",
                      marginBottom: 0,
                      textAlign: "center",
                    }}
                  >
                    Upload your video
                  </div>
                  <div
                    className=" col-12"
                    style={{
                      fontFamily: '"Roboto","Noto",sans-serif',
                      fontWeight: 400,
                      WebkitFontSmoothing: "antialiased",
                      fontSize: "15px",
                      lineHeight: "5px",
                      marginTop: "5px",
                      marginBottom: 0,
                      color: "#aaa",
                      textAlign: "center",
                    }}
                  >
                    Select a video you want to upload
                  </div>
                </div>
                <div className="row justify-content-center align-items-center pt-4">
                  <label htmlFor="contained-button-file">
                    <Input
                      accept="video/*"
                      id="contained-button-file"
                      multiple
                      type="file"
                      onChange={(e) => {
                        setFile(e.target.files);
                      }}
                    />
                    <Button variant="contained" component="span">
                      Upload
                    </Button>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export const VideoDetailsFormDialog = ({ videoData }) => {
  const scroll = "paper";
  const disptach = useDispatch();
  const user = useSelector((state) => state.LoggedInUser);

  const validationSchema = yup.object({
    title: yup.string("Enter the title of video").required("Title is required"),
    description: yup
      .string("Enter a Description")
      .max(1000, "Please Enter less than 1000 characters"),
    visibility: yup.string("Select your Visibility").required("Select any one"),
    Playlist: yup.array("This should be an array"),
  });

  const formik = useFormik({
    initialValues: {
      _id: "" || videoData._id,
      title: "" || videoData.title,
      description: "" || videoData.description,
      visibility: "" || videoData.visibility,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (e) => {
      axios
        .post(`${baseUrl}/video/postDetails`, {
          formData: e,
          playlist: names,
        })
        .then(
          (res) => {
            disptach({ type: "setVideoURL", payload: null });
            disptach({ type: "closeVideoDetailsDialog" });
            disptach({ type: "reloadHome" });
            console.log(res);
            formik.resetForm();
          },
          (err) => {
            console.log(err);
          }
        );
    },
  });

  // Playlist Select box

  const [personName, setPersonName] = useState([]);
  const [names, setNames] = useState(undefined);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  // const names = ["Oliver Hansen", "Van Henry", "April Tucker"];

  const playlists = [
    {
      _id: "playlist1",
      title: "ABC",
    },
    {
      _id: "playlist2",
      title: "XYZ",
    },
  ];

  useEffect(() => {
    console.log(videoData);
    if (personName !== []) {
      var b = [];
      // eslint-disable-next-line
      personName.map((item) => {
        const c = playlists.filter((e) => item === e.title);
        b.push(c[0]._id);
      });
      setNames(b);
    }
  }, [personName, user]);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={true}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Details of video</DialogTitle>
          <DialogContent dividers={scroll === "paper"}>
            <div className="container-fluid pt-3 pb-5">
              <div className="row">
                <h3 style={{ marginLeft: "15px", marginBottom: "25px" }}>
                  Details
                </h3>
                <div className="col-12">
                  <TextField
                    id="title"
                    name="title"
                    label="Title*"
                    value={formik.values.title}
                    onChange={(e) => {
                      formik.handleChange(e);
                    }}
                    autoFocus
                    autoComplete="off"
                    spellCheck="false"
                    variant="outlined"
                    fullWidth
                    type="text"
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                  />
                </div>
                <div className="col-12 mt-3">
                  <TextField
                    id="description"
                    name="description"
                    label="Description"
                    autoComplete="off"
                    multiline={true}
                    fullWidth
                    type="text"
                    maxRows={5}
                    minRows={2}
                    value={formik.values.description}
                    error={Boolean(formik.errors.description)}
                    helperText={formik.errors.description}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="col-12 mt-3">
                  <FormControl fullWidth>
                    <InputLabel id="demo-multiple-checkbox-label">
                      Playlists
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      value={personName}
                      onChange={handleChange}
                      input={<OutlinedInput label="Playlists" />}
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}
                    >
                      {names
                        ? playlists.map((e, i) => (
                            <MenuItem key={i} value={e.title}>
                              <Checkbox
                                checked={personName.indexOf(e.title) > -1}
                              />
                              <ListItemText primary={e.title} />
                            </MenuItem>
                          ))
                        : null}
                    </Select>
                  </FormControl>
                </div>
                <div className="col-12 mt-3">
                  <h5 className="mt-2">Visibility</h5>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="visibility"
                      id="visibility"
                      value={formik.values.visibility}
                      onChange={formik.handleChange}
                    >
                      <FormControlLabel
                        value="public"
                        control={<Radio />}
                        label="Public"
                      />
                      <FormControlLabel
                        value="private"
                        control={<Radio />}
                        label="Private"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div className="col-12 mt-3 d-flex justify-content-end">
                  <Button
                    variant=""
                    type="button"
                    onClick={() => {
                      disptach({
                        type: "setVideoURL",
                        payload: null,
                      });
                    }}
                  >
                    Close
                  </Button>
                  <Button variant="contained" type="submit">
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};

export const SidebarVideoCard = ({
  title,
  channel,
  views,
  createdAt,
  url,
  img,
  height,
  colXl,
  colLg,
  colMd,
  colSm,
  col,
}) => {
  let fullDate = createdAt;
  let date = hdate.relativeTime(fullDate);
  return (
    <>
      <Link to={url}>
        <div className="row mt-2">
          <div
            className={`${col ? `col-${col}` : `col-5`} ${
              colSm ? `col-sm-${colSm}` : ``
            } ${colMd ? `col-md-${colMd}` : ``} ${
              colLg ? `col-lg-${colLg}` : ``
            } ${
              colXl ? `col-xl-${colXl}` : ``
            } p-0 d-flex justify-content-center`}
            style={{
              width: "100%",
              height: height ? height : "8vw",
              backgroundColor: "black",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundImage: `url(${img ? img : Image})`,
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </div>
          <div className="col-7">
            <p className="home-video-title mb-2">{title}</p>
            <p className="home-channel-name m-0">{channel}</p>
            <p className="home-channel-name m-0">{`${views} ${
              views === 1 ? "view" : "views"
            } • ${date}`}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export const SidebarVideoCardPreLoader = () => {
  return (
    <>
      <div className="row mt-2">
        <div className="col-5 p-0">
          <Skeleton
            variant="rectangular"
            width="100%"
            height="107*px"
            animation={false}
          />
        </div>
        <div className="col-7">
          <Skeleton width="100%" animation={false} height="30px"></Skeleton>
          <Skeleton width="60%" animation={false} height="20px"></Skeleton>
        </div>
      </div>
    </>
  );
};

export const CommentCard = ({ user, time, comment }) => {
  const [moreCom, setMoreCom] = useState(false);
  return (
    <>
      <div className="col-12 d-flex">
        <MyAvatar channel={user} />
        <div className="ml-2 mt-2">
          <h6 className="fw-500">
            {user} <span className="mars_003">{hdate.relativeTime(time)}</span>
          </h6>
          <pre
            className="text-white watch-description"
            style={{
              overflow: moreCom ? "auto" : "hidden",
              WebkitLineClamp: moreCom ? "inherit" : 3,
            }}
          >
            {comment}
          </pre>
          {comment.length > 200 ? (
            <>
              {moreCom ? (
                <Button
                  variant=""
                  type="button"
                  onClick={() => {
                    setMoreCom(false);
                  }}
                >
                  Show less
                </Button>
              ) : (
                <Button
                  variant=""
                  type="button"
                  onClick={() => {
                    setMoreCom(true);
                  }}
                >
                  Show More
                </Button>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export const SubscriptionCard = ({ channel, user, subs }) => {
  const [subscribed, setSubscribed] = useState(false);
  const [subCount, setSubCount] = useState(0);

  const SubsBtn = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#c00"),
    backgroundColor: "#c00",
    "&:hover": {
      backgroundColor: "rgb(204 0 0/0.8)",
    },
  }));
  const UnSubsBtn = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#c00"),
    backgroundColor: "rgb(255 255 255 / 10%)",
    "&:hover": {
      backgroundColor: "rgb(255 255 255 / 7%)",
    },
  }));
  const handleSub = () => {
    if (user) {
      if (!subscribed) {
        console.log("added");
        axios
          .post(`${baseUrl}/subs/add`, {
            channel: channel._id,
            user: user._id,
          })
          .then((res) => {
            setSubCount(res.data.subs);
            setSubscribed(!subscribed);
          })
          .catch((err) => console.log(err));
      } else if (subscribed) {
        console.log(user._id + "___" + channel._id);
        axios
          .post(`${baseUrl}/subs/delete`, {
            channel: channel._id,
            user: user._id,
          })
          .then((res) => {
            setSubCount(res.data.subs);
            setSubscribed(!subscribed);
          })
          .catch((err) => console.log(err));
      }
    }
  };
  useEffect(() => {
    setSubCount(subs.length);
    if (subs.length > 0) {
      for (let i = 0; i < subs.length; i++) {
        const e = subs[i];
        if (e.user === user._id) {
          setSubscribed(true);
          break;
        } else {
          setSubscribed(false);
        }
      }
    }
  }, []);
  return (
    <>
      <div className="row py-3">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <MyAvatar
              width="100px"
              height="100px"
              font="26px"
              channel={`${channel.f_name} ${channel.l_name}`}
            />
            <div className="px-5">
              <p
                className="mars_002"
                style={{ fontSize: "20px" }}
              >{`${channel.f_name} ${channel.l_name}`}</p>
              <p className="mars_003" style={{ fontSize: "16px" }}>
                {subCount} Subscribers
              </p>
            </div>
          </div>

          {user ? (
            <>
              {user._id === channel._id ? (
                <></>
              ) : (
                <>
                  {subscribed ? (
                    <UnSubsBtn variant="contained" onClick={handleSub}>
                      Subscribed
                    </UnSubsBtn>
                  ) : (
                    <SubsBtn variant="contained" onClick={handleSub}>
                      Subscribe
                    </SubsBtn>
                  )}
                </>
              )}
            </>
          ) : (
            <SubsBtn variant="contained" onClick={handleSub}>
              Subscribe
            </SubsBtn>
          )}
        </div>
      </div>
    </>
  );
};

export const HistoryCard = ({ title, channel, views, description, img }) => {
  return (
    <>
      <div className="row mb-5">
        <div className="col-4">
          <div
            className="d-flex justify-content-center"
            style={{
              width: "100%",
              height: "176.475px",
              backgroundColor: "black",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundImage: `url(${img ? `${contentUrl}${img}` : Image})`,
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </div>
        </div>
        <div className="col-8">
          <p className="home-video-title mb-2" style={{ fontSize: "20px" }}>
            {title}
          </p>
          <p className="home-channel-name mb-2" style={{ fontSize: "14px" }}>
            {channel.f_name + " " + channel.l_name} • {`${views.length} views`}
          </p>
          <p
            className="home-video-title"
            style={{ fontSize: "15px", color: "#9f9f9f" }}
          >
            {description}
          </p>
        </div>
      </div>
    </>
  );
};

export const PlaylistSideBar = ({
  img,
  playListTitle,
  videosCount,
  lastUpdated,
}) => {
  return (
    <>
      <div
        className="d-flex justify-content-center"
        style={{
          width: "100%",
          height: "176.475px",
          backgroundColor: "black",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${img ? img : Image})`,
            backgroundPosition: "center",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            position: "absolute",
            zIndex: 1,
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 2,
            textAlign: "center",
            padding: "5px 0px",
          }}
        >
          Play
        </div>
      </div>
      <h3 className="mt-3">{playListTitle}</h3>
      <p className="watch-views" style={{ fontSize: "14px" }}>
        {videosCount} videos • Updated{" "}
        {hdate.relativeTime(new Date(lastUpdated))}
      </p>
    </>
  );
};

export const PlaylistLayout = ({ videos, title, Updated }) => {
  useEffect(() => {
    document.getElementById("title").innerText = "Liked videos - YouTube";
  }, []);
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3">
            <PlaylistSideBar
              img={contentUrl + videos[0].video.thumbnailUrl}
              playListTitle={title}
              videosCount={videos.length}
              lastUpdated={Updated}
            />
          </div>
          <div className="col-lg-9">
            {videos.map((e, i) => (
              <SidebarVideoCard
                key={i}
                title={e.video.title}
                channel={e.video.channel.f_name + " " + e.video.channel.l_name}
                url={`/youtube/watch?v=${e.video._id}`}
                img={`${contentUrl}${e.video.thumbnailUrl}`}
                colLg={2}
                height={"100px"}
                views={e.video.views.length}
                createdAt={e.video.date}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export const MaterialUISwitch = () => {
  const [checked, setChecked] = useState(false);
  // eslint-disable-next-line
  const [autoPlay, setAutoPlay] = useState(false);

  useEffect(() => {
    if (
      localStorage.getItem("autoPlay") === null ||
      localStorage.getItem("autoPlay") === undefined
    ) {
      setChecked(true);
      setAutoPlay(true);
    }
  }, [localStorage.getItem("autoPlay")]);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    localStorage.setItem("autoPlay", event.target.checked);
  };

  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
};

export const PlaylistsModal = () => {
  const [data, setData] = useState([]);
  const [watchLater, setWatchLater] = useState(false);
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const open = useSelector((e) => e.PlaylistModal);
  const user = useSelector((e) => e.LoggedInUser);
  // const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    dispatch({ type: "PlaylistModal", payload: null });
  };

  useEffect(() => {
    getWatchLater();
    getPlaylistVideos();
  }, [open, user]);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const toggleWatchLater = () => {
    if (user && open) {
      let payload = {
        user: user._id,
        video: open,
      };
      axios
        .post(`${baseUrl}/watchLater/add`, payload)
        .then((res) => {
          getWatchLater();
        })
        .catch((err) => console.log(err));
    }
  };
  const getWatchLater = () => {
    if (user && open) {
      axios
        .get(`${baseUrl}/watchLater/getByUserId/${user._id}`)
        .then((res) => {
          if (res.data.length !== 0) {
            let a = res.data.filter(
              (e) => e.video === open && e.state === true
            );
            if (a.length !== 0) {
              setWatchLater(true);
            } else {
              setWatchLater(false);
            }
          } else {
            setWatchLater(false);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const getPlaylists = () => {
    if (user && open) {
      axios
        .get(`${baseUrl}/playlist/getByUserId/${user._id}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.log(err));
    }
  };
  const getPlaylistVideos = () => {
    if (user && open) {
      let payload = {
        user: user._id,
        video: open,
      };
      axios
        .post(`${baseUrl}/playlist/video/getByUserIdAndVIdeoId`, payload)
        .then((res) => {
          setChecked(res.data);
          getPlaylists();
        })
        .catch((err) => console.log(err));
    }
  };

  // List
  const [checked, setChecked] = React.useState([]);

  // console.log(checked);

  const handleToggle = (value) => () => {
    let payload = {
      video: open,
      playlist: value,
      user: user._id,
    };
    axios
      .post(`${baseUrl}/playlist/video/toggle`, payload)
      .then((res) => {
        getPlaylistVideos();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={Boolean(open)}
        // onClick={handleClose}
      >
        <List sx={{ width: "100%", maxWidth: 360, bgcolor: "#282828" }}>
          <ListItem
            key={500}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="close"
                onClick={handleClose}
                disableRipple
              >
                <Close />
              </IconButton>
            }
          >
            <ListItemText />
          </ListItem>
          <Divider style={{ marginTop: "5px" }} />
          <ListItem disablePadding>
            <ListItemButton
              role={undefined}
              onClick={() => {
                toggleWatchLater();
              }}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={watchLater}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": "WatchLater" }}
                />
              </ListItemIcon>
              <ListItemText
                id="checkbox-list-label-WatchLater"
                primary={`Watch later`}
              />
            </ListItemButton>
          </ListItem>
          {data.length !== 0 ? (
            <>
              {data.map((e, i) => {
                const labelId = `checkbox-list-label-${e._id}`;

                return (
                  <ListItem key={e._id} disablePadding>
                    <ListItemButton
                      role={undefined}
                      onClick={handleToggle(e._id)}
                      dense
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checked.indexOf(e._id) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={e.name} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </>
          ) : (
            <>{/* <h5 className="text-center">No Playlist Found</h5> */}</>
          )}
          <Divider style={{ marginBottom: "5px" }} />
          <ListItem disablePadding>
            <ListItemButton
              role={undefined}
              onClick={() => {
                dispatch({ type: "OpenPlaylistAdd" });
              }}
              dense
            >
              <ListItemText primary={`Add Playlist`} />
            </ListItemButton>
          </ListItem>
        </List>
      </Backdrop>
      <PlaylistAddForm />
    </>
  );
};

export const PlaylistAddForm = () => {
  const dispatch = useDispatch();
  const open = useSelector((e) => e.PlaylistAdd);
  const user = useSelector((e) => e.LoggedInUser);
  const handleClose = () => {
    dispatch({ type: "ClosePlaylistAdd" });
  };

  useEffect(() => {
    if (user) {
      form.setFieldValue("user", user._id);
    }
  }, [open]);

  const validationSchema = yup.object({
    name: yup.string("Enter the title of video").required("Name is required"),
    visibility: yup.string("Select your Visibility").required("Select any one"),
    user: yup.string("User").required("User is Required"),
  });

  const form = useFormik({
    validationSchema,
    initialValues: {
      name: "",
      visibility: "",
      user: "",
    },
    onSubmit: (e) => {
      console.log(e);
      axios
        .post(`${baseUrl}/playlist/create`, e)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      form.resetForm();
      handleClose();
    },
  });

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="sm">
        <DialogTitle>Add Playlist</DialogTitle>
        <DialogContent>
          <TextField
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            className="w-100 mb-3 mt-3"
            value={form.values.name}
            onChange={form.handleChange}
          />
          <FormControl fullWidth>
            <InputLabel id="visibility-label">Visibility</InputLabel>
            <Select
              labelId="visibility-label"
              id="visibility"
              name="visibility"
              value={form.values.visibility}
              label="Visibility"
              onChange={form.handleChange}
            >
              {/* <MenuItem value={"Public"}>Public</MenuItem> */}
              <MenuItem value={"public"}>Public</MenuItem>
              <MenuItem value={"private"}>Private</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={form.handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
