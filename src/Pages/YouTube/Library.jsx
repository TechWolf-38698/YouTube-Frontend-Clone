import {
  AccessTime,
  History,
  ThumbUpOffAlt,
  VideoLibrary,
} from "@mui/icons-material";
import { Divider } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { MyAvatar } from "../../components/MyAvatar";
import { LibraryDataGrid, LoginToSee } from "../../components/SmallComponents";
import { baseUrl } from "../../Services/myAxios";

export const Library = () => {
  const user = useSelector((e) => e.LoggedInUser);
  const [someData, setSomeData] = useState();
  const [historyData, setHistoryData] = useState();
  const [likedData, setLikedData] = useState();
  const [watchLaterData, setWatchLaterData] = useState();

  useEffect(() => {
    if (user) {
      axios
        .get(`${baseUrl}/library/CountByUser?id=${user._id}`)
        .then((res) => {
          setSomeData(res.data);
          getHistory();
          getLikedVideos();
          getWatchLater();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  const getHistory = () => {
    axios
      .get(`${baseUrl}/library/History?id=${user._id}`)
      .then((res) => {
        setHistoryData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getLikedVideos = () => {
    axios
      .get(`${baseUrl}/library/LikedVideos?id=${user._id}`)
      .then((res) => {
        setLikedData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getWatchLater = () => {
    axios
      .get(`${baseUrl}/library/WatchLater?id=${user._id}`)
      .then((res) => {
        setWatchLaterData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    document.getElementById("title").innerText = "Library - TechTube";
  }, []);
  return (
    <>
      {user ? (
        <>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-lg-9">
                {historyData ? (
                  <>
                    <LibraryDataGrid
                      title="History"
                      icon={<History />}
                      data={historyData.data}
                      count={historyData.count}
                    />
                  </>
                ) : (
                  <></>
                )}
                {likedData ? (
                  <>
                    <LibraryDataGrid
                      title="Liked Videos"
                      icon={<ThumbUpOffAlt />}
                      data={likedData.data}
                      count={likedData.count}
                    />
                  </>
                ) : (
                  <></>
                )}
                {watchLaterData ? (
                  <>
                    <LibraryDataGrid
                      title="Watch Later"
                      icon={<AccessTime />}
                      data={watchLaterData.data}
                      count={watchLaterData.count}
                    />
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="col-lg-3 d-md-none d-lg-block pt-5">
                <div className="row pt-3">
                  <div className="col-12 d-flex justify-content-center">
                    <MyAvatar
                      channel={`${user.f_name} ${user.l_name}`}
                      height={"100px"}
                      width={"100px"}
                      font="30px"
                    />
                  </div>
                  <div className="col-12 text-center mt-3">
                    <h5>{`${user.f_name} ${user.l_name}`}</h5>
                  </div>
                  {someData ? (
                    <>
                      <div className="col-12 mt-3">
                        <Divider />
                        <div
                          className="col-12 d-flex justify-content-between mt-2 mb-2"
                          style={{ flexWrap: "wrap", color: "#aaaaaa" }}
                        >
                          <span>Subscriptions</span>
                          <span>{someData.subs}</span>
                        </div>
                        <Divider />
                        <div
                          className="col-12 d-flex justify-content-between mt-2 mb-2"
                          style={{ flexWrap: "wrap", color: "#aaaaaa" }}
                        >
                          <span>Likes</span>
                          <span>{someData.likes}</span>
                        </div>
                        <Divider />
                        <div
                          className="col-12 d-flex justify-content-between mt-2 mb-2"
                          style={{ flexWrap: "wrap", color: "#aaaaaa" }}
                        >
                          <span>Uploads</span>
                          <span>{someData.videos}</span>
                        </div>
                        <Divider />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <LoginToSee
            title={"Enjoy your favorite videos"}
            subtitle="Sign in to access videos that you've liked or saved"
            icon={
              <VideoLibrary sx={{ fontSize: "70px", marginBottom: "20px" }} />
            }
          />
        </>
      )}
    </>
  );
};
