import { HistoryOutlined } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HistoryCard, LoginToSee } from "../../components/SmallComponents";
import { baseUrl } from "../../Services/myAxios";

export const History = () => {
  const user = useSelector((state) => state.LoggedInUser);
  const [data, setData] = useState([]);
  useEffect(() => {
    document.getElementById("title").innerText = "History - TechTube";

    if (user) {
      axios
        .get(`${baseUrl}/video/history/get/${user._id}`)
        .then((res) => {
          setData(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);
  return (
    <>
      {user ? (
        <>
          <div className="container">
            <h5 className="mb-4" style={{ fontWeight: 600 }}>
              Watch History
            </h5>
            {data.length !== 0 ? (
              <>
                {data.map((e, i) => (
                  <Link to={`/techtube/watch?v=${e.video._id}`}>
                    <HistoryCard
                      title={e.video.title}
                      channel={e.video.channel}
                      views={e.video.views}
                      description={e.video.description}
                      img={e.video.thumbnailUrl}
                    />
                  </Link>
                ))}
              </>
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <>
          <LoginToSee
            title={"Keep track of what you watch"}
            subtitle="Watch history isn't viewable when signed out."
            icon={<HistoryOutlined sx={{ fontSize: "70px", marginBottom: "20px" }} />}
          />
        </>
      )}
    </>
  );
};
