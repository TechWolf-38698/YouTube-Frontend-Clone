import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { PlaylistLayout } from "../../components/SmallComponents";
import { baseUrl } from "../../Services/myAxios";

export const WatchLater = () => {
  const user = useSelector((e) => e.LoggedInUser);
  const [data, setData] = useState([]);
  useEffect(() => {
    document.getElementById("title").innerText = "Watch Later - YouTube";
    if (user) {
      axios
        .get(`${baseUrl}/watchLater/getByUserIdWithRelation/${user._id}`)
        .then((res) => {
          setData(res.data.reverse());
        })
        .catch((err) => console.log(err));
    }
  }, [user]);
  return (
    <>
      {data.length !== 0 ? (
        <PlaylistLayout
          videos={data}
          title="Watch Later"
          Updated={data[0].date}
        />
      ) : (
        <>
          <h1>No Data Found</h1>
        </>
      )}
    </>
  );
};
