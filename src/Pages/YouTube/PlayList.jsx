import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlaylistLayout } from "../../components/SmallComponents";
import { baseUrl } from "../../Services/myAxios";

export const PlayList = ({ title }) => {
  const { id } = useParams();
  const [data, setData] = useState();
  useEffect(() => {
    document.getElementById("title").innerText = title + " - TechTube";
    if (id) {
      axios
        .get(`${baseUrl}/playlist/videos/getByPlaylist?id=${id}`)
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    }
  }, [id]);
  return (
    <>
      {data ? (
        <>
          <PlaylistLayout
            videos={data.videos}
            title={data.playlistName}
            Updated={data.lastUpdated}
          />
        </>
      ) : (
        <>
          <div
            className="col d-flex justify-content-center align-items-center"
            style={{ height: "80vh" }}
          >
            <h1 className="text-center text-muted">No Videos Found</h1>
          </div>
        </>
      )}
    </>
  );
};
