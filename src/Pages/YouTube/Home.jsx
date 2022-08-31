import axios from "axios";
import React, { useEffect, useState } from "react";
import { HomeCardPreLoader, HomeCard } from "../../components/SmallComponents";
import img from "../../images/black.png";
import { baseUrl } from "../../Services/myAxios";

export const Home = () => {
  const [data, setData] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  useEffect(() => {
    document.getElementById("title").innerText = "YouTube";
    getAllVideos();
  }, []);

  const getAllVideos = () => {
    setPageLoading(true);
    axios.get(`${baseUrl}/video/getall`).then((res) => {
      setPageLoading(false);
      if (res.data !== "No Data Found") {
        let shuffled = res.data
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value);
        setData(shuffled);
      }
    });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {pageLoading ? (
            Array.from(new Array(24)).map((e, i) => (
              <HomeCardPreLoader key={i} />
            ))
          ) : (
            <>
              {data.length !== 0 ? (
                data.map((item, index) => (
                  <HomeCard
                    img={item.thumbnail ? item.thumbnail : img}
                    title={item.title}
                    key={index}
                    createdAt={item.date}
                    channel={item.channelName}
                    url={`/youtube/watch?v=${item._id}`}
                  />
                ))
              ) : (
                <>
                  <div
                    className="col d-flex justify-content-center align-items-center"
                    style={{ height: "80vh" }}
                  >
                    <h1 className="text-center">No Videos Found</h1>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        {data.length !== 0 ? (
          <div className="col-12 text-center mt-5">
            <p>No More Videos</p>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
