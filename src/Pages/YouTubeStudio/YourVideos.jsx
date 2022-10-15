import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { MyCount } from "../../components/SmallComponents";
import img from "../../images/black.png";
import { baseUrl, contentUrl } from "../../Services/myAxios";
import DeleteIcon from "@mui/icons-material/Delete";
import { Edit } from "@mui/icons-material";
import { useDispatch } from "react-redux";
const hdate = require("human-date");

export const YourVideos = () => {
  const user = useSelector((e) => e.LoggedInUser);
  const [videos, setVideos] = useState([]);
  const dispatch = useDispatch();
  const reload = useSelector((e) => e.ReloadMyVideos);

  useEffect(() => {
    console.log(reload);
    if (reload) {
      getVideos(user._id);
      console.log("World", user._id);
      dispatch({ type: "reloadMyVideos", payload: false });
    }
  }, [reload]);

  useEffect(() => {
    document.getElementById("title").innerText = "Your Videos - TechTube";
  }, []);

  useEffect(() => {
    if (user) {
      getVideos(user._id);
    }
  }, [user]);

  const getVideos = (id) => {
    if (id) {
      axios
        .get(`${baseUrl}/videos/getAllByChannelId?id=${id}`)
        .then((res) => {
          setVideos(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const deleteVideo = (id) => {
    axios
      .delete(`${baseUrl}/videos/deleteById?id=${id}`)
      .then((res) => {
        console.log(res.data);
        getVideos(user._id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container-fluid">
        <h5 className="mb-4" style={{ fontWeight: 600 }}>
          Your Channel Content
        </h5>
        <div className="row">
          <div className="col-12">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Thumb</TableCell>
                    <TableCell>Video</TableCell>
                    <TableCell>Visibility</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Views</TableCell>
                    <TableCell align="right">Likes</TableCell>
                    <TableCell align="right">Dislikes</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {videos.length !== 0 ? (
                    <>
                      {videos.map((e, i) => (
                        <TableRow
                          key={i}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>
                            <img
                              src={`${contentUrl}${e.thumbnailUrl}`}
                              alt=""
                              style={{
                                width: "120px",
                                height: "68px",
                                borderRadius: "5px",
                                marginRight: "16px",
                              }}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <div>
                              <span className="yVideos-video-title mb-1">
                                {e.title}
                              </span>
                              <span
                                className="watch-description text-muted"
                                style={{
                                  fontSize: "12px",
                                  WebkitLineClamp: 2,
                                  textOverflow: "ellipsis",
                                  overflow: "hidden",
                                }}
                              >
                                {e.description}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{e.visibility.toUpperCase()}</TableCell>
                          <TableCell style={{ minWidth: "200px" }}>
                            {hdate.prettyPrint(e.date)}
                          </TableCell>
                          <TableCell align="right">{e.views.length}</TableCell>
                          <TableCell align="right">
                            <MyCount arr={e.likes} state="liked" />
                          </TableCell>
                          <TableCell align="right">
                            <MyCount arr={e.likes} state="disLiked" />
                          </TableCell>
                          <TableCell>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <IconButton
                                aria-label="edit"
                                onClick={() => {
                                  dispatch({ type: "setVideoURL", payload: e });
                                }}
                              >
                                <Edit />
                              </IconButton>
                              <IconButton
                                aria-label="delete"
                                onClick={() => {
                                  deleteVideo(e._id);
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  ) : (
                    <></>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </>
  );
};
