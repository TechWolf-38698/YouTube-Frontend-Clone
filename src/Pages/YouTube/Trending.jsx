import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { HomeCardPreLoader, HomeCard } from "../../components/SmallComponents";
import img from "../../images/black.png";
import { baseUrl, contentUrl } from "../../Services/myAxios";

export const Trending = () => {
  const [data, setData] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const reload = useSelector((state) => state.ReloadHome);
  const dispatch = useDispatch();
  useEffect(() => {
    document.getElementById("title").innerText = "YouTube";
    getAllVideos();
  }, []);

  useEffect(() => {
    if (reload) {
      getAllVideos();
      dispatch({ type: "reloadHome" });
    }
  }, [reload]);

  const getAllVideos = () => {
    setPageLoading(true);
    axios.get(`${baseUrl}/videos/getTrending`).then((res) => {
      setData(res.data);
      setPageLoading(false);
    });
  };

  return (
    <>
      <div className="container-fluid">
        <h5 className="mb-4" style={{ fontWeight: 600 }}>
          Trending videos
        </h5>
        <div className="row">
          {pageLoading ? (
            Array.from(new Array(10)).map((e, i) => (
              <HomeCardPreLoader key={i} />
            ))
          ) : (
            <>
              {data.length !== 0 ? (
                data.map((item, index) => (
                  <HomeCard
                    img={
                      item.thumbnailUrl
                        ? `${contentUrl}${item.thumbnailUrl}`
                        : img
                    }
                    title={item.title}
                    key={index}
                    createdAt={item.date}
                    channel={item.channel.f_name + " " + item.channel.l_name}
                    url={`/youtube/watch?v=${item._id}`}
                    views={item.views.length}
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
            <p>These are most played videos...</p>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
