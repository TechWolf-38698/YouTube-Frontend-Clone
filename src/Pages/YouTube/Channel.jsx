import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../Services/myAxios";

export const Channel = () => {
  const { id } = useParams();
  const [channel, setChannel] = useState();
  useEffect(() => {
    axios
      .get(`${baseUrl}/users/finduser/byID/${id}`)
      .then((res) => {
        setChannel(res.data._user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  useEffect(() => {
    if (channel) {
      document.getElementById("title").innerText =
        channel.f_name + " " + channel.l_name + " - YouTube";
    }
  }, [channel]);
  return (
    <>
      {channel ? (
        <>
          <h1>{channel.f_name + " " + channel.l_name}</h1>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
