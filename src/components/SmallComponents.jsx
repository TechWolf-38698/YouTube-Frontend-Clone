import React from "react";
import Image from "../images/black.png";
import {
  Avatar,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  // DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Skeleton,
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
import { baseUrl } from "../Services/myAxios";
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
  let fullDate = createdAt.split("T");
  let date = hdate.relativeTime(fullDate[0]);
  return (
    <>
      <div className="col-12 col-sm-6 col-md-4 col-xl-3 my-3">
        <Link to={url}>
          <div
            className="d-flex justify-content-center"
            style={{
              width: "100%",
              maxHeight: "176.475px",
              backgroundColor: "black",
            }}
          >
            <img
              src={img}
              style={{
                maxHeight: "176.475px",
              }}
            />
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
                <p className="home-channel-name m-0">{`${views} • ${date}`}</p>
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
    form.append("userId", user._id);
    form.append("channelName", `${user.f_name} ${user.l_name}`);
    form.append("title", `${file[0].name}`);
    console.log(user._id, `${user.f_name} ${user.l_name}`, file[0].name);

    axios
      .post(`${baseUrl}/video/postVideo`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(
        (res) => {
          disptach({ type: "setVideoURL", payload: res.data.details.myVid });
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
    description: yup.string("Enter a Description"),
    visibility: yup.string("Select your Visibility").required("Select any one"),
    Playlist: yup.array("This should be an array"),
    userId: yup.string().required(),
    videoURL: yup.string().required(),
    thumbnailUrl: yup.string().required(),
    channelName: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      title: "" || videoData.title,
      description: "" || videoData.description,
      visibility: "" || videoData.visibility,
      videoURL: videoData.videoURL,
      userId: videoData.userId,
      channelName: videoData.channelName,
      thumbnailUrl: videoData.thumbnailUrl,
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
      // formik.setFieldValue("title", videoData.title);
      // formik.setFieldValue("description", videoData.description);
      // formik.setFieldValue("visibility", videoData.visibility);
      // formik.setFieldValue("videoURL", videoData.videoURL);
      // formik.setFieldValue("userId", videoData.userId);
      // formik.setFieldValue("channelName", videoData.channelName);
      // formik.setFieldValue("thumbnailUrl", videoData.thumbnailUrl);
    }
  }, [personName, videoData, user]);

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
                    id="Title"
                    name="Title"
                    label="Title*"
                    value={formik.values.title}
                    onChange={formik.handleChange}
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
                    id="Description"
                    name="Description"
                    label="Description"
                    autoComplete="off"
                    fullWidth
                    type="text"
                    multiline
                    maxRows={4}
                    value={formik.values.description}
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
                      name="Visibility"
                      id="Visibility"
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
                  <Button variant="contained" type="submit">
                    upload
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

export const SidebarVideoCard = ({ title, channel, views, createdAt, url }) => {
  let fullDate = createdAt.split("T");
  let date = hdate.relativeTime(fullDate[0]);
  return (
    <>
      <Link to={url}>
        <div className="row mt-2">
          <div className="col-5 p-0">
            <img src={Image} alt="" width="100%" />
          </div>
          <div className="col-7">
            <p className="home-video-title mb-2">{title}</p>
            <p className="home-channel-name m-0">{channel}</p>
            <p className="home-channel-name m-0">{`${views} • ${date}`}</p>
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
