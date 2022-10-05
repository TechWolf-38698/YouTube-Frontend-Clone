import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { HomeCardPreLoader, HomeCard } from "../../components/SmallComponents";
import img from "../../images/black.png";
import { baseUrl, contentUrl } from "../../Services/myAxios";

export const Home = () => {
  const [data, setData] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalVideos, setTotalVideos] = useState(0);
  const reload = useSelector((state) => state.ReloadHome);
  const dispatch = useDispatch();
  useEffect(() => {
    document.getElementById("title").innerText = "TechTube";
    getAllVideos();
  }, []);

  useEffect(() => {
    if (reload) {
      getAllVideos();
      dispatch({ type: "reloadHome", payload: false });
    }
  }, [reload]);

  const fetchMore = () => {
    console.log("Works");
    axios
      .get(`${baseUrl}/video/getall?limit=10&page=${page + 1}`)
      .then((res) => {
        console.log(res.data);
        setPage(res.data.page);
        setHasMore(res.data.hasMore);
        if (res.data.videos.length !== 0) {
          let shuffled = res.data.videos
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
          setData(data.concat(shuffled));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllVideos = () => {
    setPageLoading(true);
    axios.get(`${baseUrl}/video/getall?limit=10&page=${page}`).then((res) => {
      console.log(res.data);
      setTotalVideos(res.data.totalVideos);
      setPage(res.data.page);
      setHasMore(res.data.hasMore);
      if (res.data.videos.length !== 0) {
        let shuffled = res.data.videos
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value);
        setData(shuffled);
      }
      setPageLoading(false);
    });
  };

  return (
    <>
      <InfiniteScroll
        dataLength={data.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={
          <div className="col-12 text-center text-muted mt-5">
            <p>Loading...</p>
          </div>
        }
        endMessage={
          <div className="col-12 text-center text-muted mt-5">
            <p>No More Videos</p>
          </div>
        }
      >
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
                      img={
                        item.thumbnailUrl
                          ? `${contentUrl}${item.thumbnailUrl}`
                          : img
                      }
                      title={item.title}
                      key={index}
                      createdAt={item.date}
                      channel={item.channel.f_name + " " + item.channel.l_name}
                      url={`/techtube/watch?v=${item._id}`}
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
        </div>
      </InfiniteScroll>
    </>
  );
};
