import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { PlaylistLayout } from "../../components/SmallComponents";
import { baseUrl } from "../../Services/myAxios";

export const LikedVideos = () => {
  const user = useSelector((state) => state.LoggedInUser);
  const [data, setData] = useState([]);
  useEffect(() => {
    document.getElementById("title").innerText = "Liked videos - YouTube";
    if (user) {
      axios
        .get(`${baseUrl}/videos/getLikedVideos/${user._id}`)
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    }
  }, [user]);
  return (
    // <>
    //   <div className="container-fluid">
    //     <div className="row">
    //       <div className="col-lg-3">
    //         <PlaylistSideBar />
    //       </div>
    //       <div className="col-lg-9">
    //         <SidebarVideoCard
    //           title={"Hello World"}
    //           channel={"Test 001"}
    //           url="abc"
    //           colLg={2}
    //           height={"100px"}
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </>
    <>
      {data.videos ? (
        <PlaylistLayout
          videos={data.videos.reverse()}
          title="Liked Videos"
          Updated={data.lastUpdated}
        />
      ) : (
        <h1>No Videos Found</h1>
      )}
    </>
  );
};
