import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import VideoPlayer from "../../components/VideoPlayer";
import { baseUrl, contentUrl } from "../../Services/myAxios";

import axios from "axios";
import {
  SidebarVideoCard,
  SidebarVideoCardPreLoader,
} from "../../components/SmallComponents";

export const Watch = () => {
  const search = useLocation().search;
  const videoId = new URLSearchParams(search).get("v");
  const theaterMode = useSelector((state) => state.TheaterMode);
  const [videoData, setVideoData] = useState(undefined);
  useEffect(() => {
    axios.get(`${baseUrl}/video/getbyid/${videoId}`).then(
      (res) => {
        setVideoData(res.data.Video);
        document.getElementById("title").innerText =
          res.data.Video.title + " - Youtube";
      },
      (err) => {
        console.log(err);
      }
    );
    document.documentElement.scrollTop = 0;

    document.body.scrollTop = 0;
  }, [videoId]);

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
                      <div className="col-12">
                        <span className="watch-views">{`${undefined}`}</span>
                        <span> views</span>
                      </div>
                    </div>
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
                        channel={item.channelName}
                        url={`/youtube/watch?v=${item._id}`}
                      />
                    ))
                  : Array.from(new Array(24)).map((item, index) => (
                      <SidebarVideoCardPreLoader key={index} />
                    ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
