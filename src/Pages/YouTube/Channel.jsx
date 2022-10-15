import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MyAvatar } from "../../components/MyAvatar";
import { baseUrl, contentUrl } from "../../Services/myAxios";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { HomeCard } from "../../components/SmallComponents";

export const Channel = () => {
  const { id } = useParams();
  const [channel, setChannel] = useState();
  const [subCount, setSubCount] = useState(0);
  const [subscribed, setSubscribed] = useState(false);
  const cUser = useSelector((e) => e.LoggedInUser);
  const search = useLocation().search;
  const cTab = new URLSearchParams(search).get("t");
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getChannel();
  }, [id]);

  const getChannel = () => {
    if (id) {
      axios
        .get(`${baseUrl}/users/finduser/byID/${id}`)
        .then((res) => {
          setChannel(res.data._user);
          getSubCount(res.data._user._id);
          getVideos(res.data._user._id);
          if (res.data._user && cUser) {
            let xyz = res.data._user.subscribers;
            for (let i = 0; i < xyz.length; i++) {
              const e = xyz[i];
              if (e.user === cUser._id) {
                setSubscribed(true);
                break;
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getSubCount = (_id) => {
    axios
      .get(`${baseUrl}/subs/getCount/${_id}`)
      .then((res) => {
        setSubCount(res.data.subs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getVideos = (_id) => {
    axios
      .get(`${baseUrl}/videos/getByChannelId?id=${_id}`)
      .then((res) => {
        setVideos(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const handleSub = () => {
    if (cUser) {
      if (!subscribed) {
        axios
          .post(`${baseUrl}/subs/add`, {
            channel: channel._id,
            user: cUser._id,
          })
          .then((res) => {
            setSubCount(res.data.subs);
            setSubscribed(!subscribed);
          })
          .catch((err) => console.log(err));
      } else if (subscribed) {
        console.log(cUser._id + "___" + channel._id);
        axios
          .post(`${baseUrl}/subs/delete`, {
            channel: channel._id,
            user: cUser._id,
          })
          .then((res) => {
            setSubCount(res.data.subs);
            setSubscribed(!subscribed);
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const handleChange = (e, n) => {
    navigate(`/techtube/channel/${id}?t=${n}`);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  useEffect(() => {
    if (channel) {
      document.getElementById("title").innerText =
        channel.f_name + " " + channel.l_name + " - TechTube";
    }
  }, [channel]);

  // Sub Button
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

  return (
    <>
      {channel ? (
        <>
          <div
            className="row"
            style={{
              background: "#202020",
              margin: "-24px",
              marginBottom: "0px",
            }}
          >
            <div className="col-12 d-flex align-items-center justify-content-between pt-4 pb-4">
              <div className="d-flex align-items-center">
                <MyAvatar
                  channel={`${channel.f_name} ${channel.l_name}`}
                  height="80px"
                  width="80px"
                  font="28px"
                />
                <div className="ml-4">
                  <h4 className="text-capitalize mb-0">{`${channel.f_name} ${channel.l_name}`}</h4>
                  <p
                    className="home-channel-name mb-0"
                    style={{ fontSize: "14px" }}
                  >
                    {subCount} Subscribers
                  </p>
                </div>
              </div>
              {subscribed ? (
                <UnSubsBtn
                  onClick={() => {
                    handleSub();
                  }}
                >
                  Subscribed
                </UnSubsBtn>
              ) : (
                <SubsBtn
                  onClick={() => {
                    handleSub();
                  }}
                >
                  Subscribe
                </SubsBtn>
              )}
            </div>
          </div>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={0}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Videos" {...a11yProps(0)} />
              {/* <Tab label="Playlists" {...a11yProps(1)} /> */}
            </Tabs>
          </Box>
          <div className="row">
            {cTab == 0 ? (
              <>
                {videos.length !== 0 ? (
                  <>
                    {videos.map((e, i) => (
                      <HomeCard
                        key={i}
                        title={e.title}
                        url={`/techtube/watch?v=${e._id}`}
                        channel={`${e.channel.f_name} ${e.channel.l_name}`}
                        img={`${contentUrl}${e.thumbnailUrl}`}
                        views={e.views.length}
                        createdAt={e.date}
                      />
                    ))}
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
