// Routing for techtube
import React, { useEffect, useState } from "react";
import UI from "../UI";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../../Pages/YouTube/Home";
import { Trending } from "../../Pages/YouTube/Trending";
import { Shorts } from "../../Pages/YouTube/Shorts";
import { Subscriptions } from "../../Pages/YouTube/Subscriptions";

import { Library } from "../../Pages/YouTube/Library";
import { History } from "../../Pages/YouTube/History";
import { YourVideos } from "../../Pages/YouTubeStudio/YourVideos";
import { WatchLater } from "../../Pages/YouTube/WatchLater";
import { PlayList } from "../../Pages/YouTube/PlayList";
import { LikedVideos } from "../../Pages/YouTube/LikedVideos";

import { Watch } from "../../Pages/YouTube/Watch";

import { Channel } from "../../Pages/YouTube/Channel";

import { Settings } from "../../Pages/YouTube/Settings";
import { SendFeedback } from "../../Pages/YouTube/SendFeedback";

import { Email } from "../../Pages/Google/Signin/Email";
import { Password } from "../../Pages/Google/Signin/Password";
import { Signup } from "../../Pages/Google/Signup/Signup";

export const MyRouter = () => {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    setUser(localStorage.getItem("_id"));
  });
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/techtube" />} />
      <Route path="techtube" element={<UI />}>
        <Route index element={<Home />} />
        <Route path="trending" element={<Trending />} />
        {/* <Route path="shorts" element={<Shorts />} /> */}
        <Route path="your-videos" element={<YourVideos />} />
        <Route path="subscriptions" element={<Subscriptions />} />
        <Route path="library" element={<Library />} />
        <Route path="history" element={<History />} />
        <Route path="playlist/:id" element={<PlayList />} />

        {user ? (
          <>
            <Route path="watch-later" element={<WatchLater />} />
            <Route path="liked-videos" element={<LikedVideos />} />
          </>
        ) : (
          <></>
        )}

        <Route path="channel/:id" element={<Channel />} />
        {/* <Route path="settings" element={<Settings />} /> */}
        {/* <Route path="send-feedback" element={<SendFeedback />} /> */}
        <Route path="watch" element={<Watch />} />
      </Route>
      {user ? (
        <Route path="google">
          <Route
            path="*"
            element={
              <div
                className="col d-flex justify-content-center align-items-center"
                style={{ height: "100vh" }}
              >
                <h1 className="text-center text-danger text-uppercase">
                  You are already Logged in.
                </h1>
              </div>
            }
          />
        </Route>
      ) : (
        <Route path="google">
          <Route path="signin">
            <Route index element={<Email />} />
            <Route path="password" element={<Password />} />
          </Route>
          <Route path="signup" element={<Signup />} />
        </Route>
      )}
      <Route
        path="*"
        element={
          <div
            className="col d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <h1 className="text-center text-danger text-uppercase">
              404 Page Not Found
            </h1>
          </div>
        }
      />
    </Routes>
  );
};
