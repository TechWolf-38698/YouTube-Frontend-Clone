import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import VideoPlayer from "../../components/VideoPlayer";
import { baseUrl, contentUrl } from "../../Services/myAxios";

import axios from "axios";
import {
  CommentCard,
  SidebarVideoCard,
  SidebarVideoCardPreLoader,
  // VideoDetailsFormDialog,
} from "../../components/SmallComponents";
import { Divider, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
// import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import PlaylistAddRoundedIcon from "@mui/icons-material/PlaylistAddRounded";
import { MyAvatar } from "../../components/MyAvatar";
import { styled } from "@mui/material/styles";
// import { purple } from "@mui/material/colors";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

const hdate = require("human-date");
export const Watch = () => {
  const user = useSelector((state) => state.LoggedInUser);
  const dispatch = useDispatch();
  const search = useLocation().search;
  const videoId = new URLSearchParams(search).get("v");
  const theaterMode = useSelector((state) => state.TheaterMode);
  const [videoData, setVideoData] = useState(undefined);
  const [viewHitCount, setViewHitCount] = useState(true);
  const [viewCount, setViewCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disLiked, setDisLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [disLikesCount, setDisLikesCount] = useState(0);
  const [subscribed, setSubscribed] = useState(false);
  const [subCount, setSubCount] = useState(0);
  // const [editVideo, setEditVideo] = useState(false);
  const [moreDes, setMoreDes] = useState(false);
  const [commentFocus, setCommentFocus] = useState(false);
  const [comments, setComments] = useState([]);
  const handleLike = () => {
    if (user) {
      setLiked(!liked);
      setDisLiked(false);

      if (user && videoData) {
        let payLoad = {
          video: videoData._id,
          channel: videoData.channel._id,
          user: user._id,
          state: "none",
        };
        if (!liked) {
          payLoad.state = "liked";
          axios
            .post(`${baseUrl}/video/like`, payLoad)
            .then((res) => {
              console.log(res.data);
              getLikesCount();
            })
            .catch((err) => console.log(err));
        }
        if (liked) {
          payLoad.state = "none";
          axios
            .post(`${baseUrl}/video/like`, payLoad)
            .then((res) => {
              console.log(res.data);
              getLikesCount();
            })
            .catch((err) => console.log(err));
        }
      }
    }
  };
  const handleDisLike = () => {
    if (user) {
      setDisLiked(!disLiked);
      setLiked(false);
      if (user && videoData) {
        let payLoad = {
          video: videoData._id,
          channel: videoData.channel._id,
          user: user._id,
          state: "none",
        };
        if (!disLiked) {
          payLoad.state = "disLiked";
          axios
            .post(`${baseUrl}/video/like`, payLoad)
            .then((res) => {
              console.log(res.data);
              getLikesCount();
            })
            .catch((err) => console.log(err));
        }
        if (disLiked) {
          payLoad.state = "none";
          axios
            .post(`${baseUrl}/video/like`, payLoad)
            .then((res) => {
              console.log(res.data);
              getLikesCount();
            })
            .catch((err) => console.log(err));
        }
      }
    }
  };
  const handleSub = () => {
    if (user) {
      if (!subscribed) {
        console.log("added");
        axios
          .post(`${baseUrl}/subs/add`, {
            channel: videoData.channel._id,
            user: user._id,
          })
          .then((res) => {
            setSubCount(res.data.subs);
            setSubscribed(!subscribed);
          })
          .catch((err) => console.log(err));
      } else if (subscribed) {
        axios
          .post(`${baseUrl}/subs/delete`, {
            channel: videoData.channel._id,
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

  const getLikesCount = () => {
    axios
      .get(`${baseUrl}/video/like/getcount/${videoId}`)
      .then((res) => {
        let { likes, disLikes } = res.data;
        setLikesCount(likes);
        setDisLikesCount(disLikes);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getComments = (vId) => {
    axios
      .get(`${baseUrl}/comments/getByVId/${vId}`)
      .then((res) => {
        // console.log(res.data);
        setComments(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios.get(`${baseUrl}/video/getbyid/${videoId}`).then(
      (res) => {
        setVideoData(res.data.Video);
        document.getElementById(
          "title"
        ).innerText = `${res.data.Video.title} - Youtube`;
        getViewCount(res.data.Video._id);
        getComments(res.data.Video._id);
        let { likes, disLikes } = res.data;
        let { subs } = res.data;
        setSubCount(subs.length);
        if (user) {
          if (likes.length > 0) {
            for (let i = 0; i < likes.length; i++) {
              let e = likes[i];
              if (e.user === user._id) {
                setLiked(true);
                setDisLiked(false);
                break;
              } else {
                setLiked(false);
              }
            }
          } else {
            setLiked(false);
          }
          if (disLikes.length > 0) {
            for (let i = 0; i < disLikes.length; i++) {
              let e = disLikes[i];
              if (e.user === user._id) {
                setDisLiked(true);
                setLiked(false);
                break;
              } else {
                setDisLiked(false);
              }
            }
          } else {
            setDisLiked(false);
          }
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
        }
        getLikesCount();
      },
      (err) => {
        console.log(err);
      }
    );
    document.documentElement.scrollTop = 0;

    document.body.scrollTop = 0;
  }, [videoId, user]);

  useEffect(() => {
    if (viewHitCount && videoData !== undefined && videoData !== null) {
      addView(videoData._id, videoData.channel);
      setViewHitCount(false);
    }
    if (user && videoData) {
      addHistory(videoData._id, user._id);
    }
  }, [videoData, user]);

  // useEffect(() => {
  //   if (user) {
  //     if (user.subscriptions.length > 0) {
  //       for (let i = 0; i < user.subscriptions.length; i++) {
  //         let e = user.subscriptions[i];
  //         if (e.user === user._id) {
  //           setSubscribed(true);
  //           break;
  //         } else {
  //           setSubscribed(false);
  //         }
  //       }
  //     }
  //   }
  // }, [user, videoId]);

  const getViewCount = (vId) => {
    axios
      .get(`${baseUrl}/video/views/getCount/${vId}`)
      .then((res) => {
        setViewCount(res.data.count);
      })
      .catch((err) => console.log(err));
  };

  const addView = (vID, cID) => {
    axios.post(`${baseUrl}/video/views/add`, { vID, cID });
    setViewHitCount(false);
  };
  const addHistory = (vId, uId) => {
    let payload = {
      vId,
      uId,
    };
    axios
      .post(`${baseUrl}/video/history/add`, payload)
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [data, setData] = useState();
  useEffect(() => {
    axios.get(`${baseUrl}/video/getall`).then((res) => {
      // setData(res.data);
      let unshuffled = res.data;
      let shuffled = unshuffled
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
      let test = shuffled.filter((e) => e._id !== videoId);
      setData(test);
    });
  }, [videoId]);

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

  const VS = yup.object({
    user: yup.string().required(),
    video: yup.string().required(),
    comment: yup.string("Add a comment...").required("Please add a comment..."),
  });

  const formik = useFormik({
    initialValues: {
      user: "",
      video: "",
      comment: "",
    },
    validationSchema: VS,
    onSubmit: (e) => {
      setCommentFocus(false);
      formik.setFieldValue("comment", "");
      axios
        .post(`${baseUrl}/comments/add`, e)
        .then((res) => {
          getComments(videoData._id);
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <>
      {videoData ? (
        <>
          <div className="container-fluid">
            <div className="row">
              <div className={`${theaterMode ? "col-lg-12" : "col-lg-8"}`}>
                <VideoPlayer videoURL={contentUrl + videoData.videoURL} />

                <div className="row">
                  <div className={`${theaterMode ? "col-lg-8" : "col-lg-12"}`}>
                    <div className="row mt-3">
                      <div className="col-12">
                        <h1 className="watch-title">{videoData.title}</h1>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 d-flex justify-content-between align-items-center">
                        <div>
                          <span className="watch-views">
                            {" "}
                            {viewCount.toLocaleString(undefined, {
                              maximumFractionDigits: 2,
                            })}
                          </span>{" "}
                          <span className="watch-views">
                            {viewCount === 1 ? "view" : "views"}
                            {" • "}
                          </span>
                          <span className="watch-views">
                            {hdate.prettyPrint(videoData.date)}
                          </span>
                        </div>
                        <div>
                          <Button variant="" onClick={handleLike}>
                            {liked ? (
                              <ThumbUpIcon color="primary" className="mr-1" />
                            ) : (
                              <ThumbUpOffAltIcon className="mr-1" />
                            )}
                            {likesCount}
                          </Button>
                          <Button variant="" onClick={handleDisLike}>
                            {disLiked ? (
                              <ThumbDownAltIcon
                                color="primary"
                                className="mr-1"
                              />
                            ) : (
                              <ThumbDownOffAltIcon className="mr-1" />
                            )}
                            {disLikesCount}
                          </Button>
                          {/* <Button variant="">
                            <ShareOutlinedIcon className="mr-1" /> SHARE
                          </Button> */}
                          <Button
                            variant=""
                            onClick={() => {
                              if (user) {
                                dispatch({
                                  type: "PlaylistModal",
                                  payload: videoData._id,
                                });
                              }
                            }}
                          >
                            <PlaylistAddRoundedIcon className="mr-1" /> Save
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="row align-items-center">
                      <div className="col-12 col-lg-7">
                        <pre
                          className="watch-description"
                          style={{
                            overflow: moreDes ? "auto" : "hidden",
                            WebkitLineClamp: moreDes ? "inherit" : 2,
                          }}
                        >
                          {videoData.description}
                          {moreDes ? (
                            <Button
                              variant=""
                              type="button"
                              onClick={() => {
                                setMoreDes(false);
                              }}
                            >
                              Show less
                            </Button>
                          ) : (
                            <></>
                          )}
                        </pre>
                      </div>
                      {videoData.description.length > 80 ? (
                        <>
                          {moreDes ? (
                            <></>
                          ) : (
                            <Button
                              variant=""
                              type="button"
                              onClick={() => {
                                setMoreDes(true);
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
                    <Divider className="mt-2" />
                    <div className="row py-3">
                      <div className="col-12 d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <MyAvatar
                            width="48px"
                            height="48px"
                            font="18px"
                            channel={`${videoData.channel.f_name} ${videoData.channel.l_name}`}
                          />
                          <div className="px-2">
                            <p className="mars_002">{`${videoData.channel.f_name} ${videoData.channel.l_name}`}</p>
                            <p className="mars_003">{subCount} Subscribers</p>
                          </div>
                        </div>

                        {user ? (
                          <>
                            {user._id === videoData.channel._id ? (
                              <></>
                            ) : (
                              <>
                                {subscribed ? (
                                  <UnSubsBtn
                                    variant="contained"
                                    onClick={handleSub}
                                  >
                                    Subscribed
                                  </UnSubsBtn>
                                ) : (
                                  <SubsBtn
                                    variant="contained"
                                    onClick={handleSub}
                                  >
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
                    <div className="row">
                      <div className="col-12">
                        <h3
                          style={{
                            fontSize: "1.6rem",
                            fontFamily: '"Roboto","Arial",sans-serif',
                          }}
                        >
                          {comments.length} Comments
                        </h3>
                      </div>
                    </div>
                    {user ? (
                      <form onSubmit={formik.handleSubmit}>
                        <div className="row mb-5">
                          <div className="col-12 d-flex">
                            <div className="mt-2">
                              <MyAvatar
                                channel={user.f_name + " " + user.l_name}
                              />
                            </div>
                            <div
                              className="pl-3 pr-3 mb-3 d-flex"
                              style={{ flex: 1 }}
                            >
                              <TextField
                                label="Add a comment..."
                                variant="standard"
                                fullWidth
                                id="comment"
                                name="comment"
                                autoComplete="off"
                                multiline
                                value={formik.values.comment}
                                onChange={formik.handleChange}
                                onFocus={() => {
                                  formik.setFieldValue("user", user._id);
                                  formik.setFieldValue("video", videoData._id);
                                  setCommentFocus(true);
                                }}
                              />
                            </div>
                          </div>
                          {commentFocus ? (
                            <div className="col-12 d-flex justify-content-end">
                              <div className="pr-3">
                                <Button
                                  variant=""
                                  onClick={() => {
                                    setCommentFocus(false);
                                    formik.setFieldValue("comment", "");
                                  }}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  variant="contained"
                                  disabled={!Boolean(formik.values.comment)}
                                  type="submit"
                                >
                                  comment
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      </form>
                    ) : (
                      <></>
                    )}
                    {comments.length !== 0 ? (
                      <>
                        {comments.map((e) => (
                          <CommentCard
                            user={e.user.f_name + " " + e.user.l_name}
                            time={e.date}
                            comment={e.comment}
                          />
                        ))}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className={`${theaterMode ? "col-lg-4" : "d-none"} `}>
                    {data !== undefined
                      ? data.map((item, index) => (
                          <SidebarVideoCard
                            title={item.title}
                            key={index}
                            createdAt={item.date}
                            channel={item.channelName}
                            url={`/youtube/watch?v=${item._id}`}
                            img={contentUrl + item.thumbnailUrl}
                          />
                        ))
                      : Array.from(new Array(24)).map((item, index) => (
                          <SidebarVideoCardPreLoader key={index} />
                        ))}
                  </div>
                </div>
              </div>
              <div className={`${theaterMode ? "d-none" : "col-lg-4"} `}>
                {data !== undefined
                  ? data.map((item, index) => (
                      <SidebarVideoCard
                        title={item.title}
                        key={index}
                        createdAt={item.date}
                        channel={
                          item.channel.f_name + " " + item.channel.l_name
                        }
                        url={`/youtube/watch?v=${item._id}`}
                        img={contentUrl + item.thumbnailUrl}
                        views={item.views.length}
                      />
                    ))
                  : Array.from(new Array(24)).map((item, index) => (
                      <SidebarVideoCardPreLoader key={index} />
                    ))}
              </div>
            </div>
          </div>
          {/* <VideoDetailsFormDialog videoData={videoData} />  */}
        </>
      ) : (
        <></>
      )}
    </>
  );
};
