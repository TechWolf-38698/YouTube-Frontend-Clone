import { useEffect, useState } from "react";
import { Slider, useTheme } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { MaterialUISwitch } from "./SmallComponents";

function VideoPlayer({ videoURL }) {
  const theme = useTheme();
  const [play, setPlay] = useState(false);
  // const [theaterMode, setTheaterMode] = useState(false);
  const [miniPlayer, setMiniPlayer] = useState(false);
  const [volume, setVolume] = useState(10);
  const [muteHover, setMuteHover] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volumeState, setVolumeState] = useState("high");
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [playBack, setPlayBack] = useState("1x");
  const [position, setPosition] = useState(0);
  const [maxPosition, setMaxPosition] = useState(0);
  const theaterMode = useSelector((state) => state.TheaterMode);
  const disptach = useDispatch();
  // Key Presses
  const keyFun = (e) => {
    let key = e.key.toLowerCase();
    switch (key) {
      case " ":
        togglePlay();
        break;
      case "k":
        togglePlay();
        break;
      case "t":
        toggleTheaterMode();
        break;
      case "f":
        toggleFullScreenMode();
        break;
      case "i":
        toggleMiniPlayerMode();
        break;
      case "arrowup":
        increaseVolume();
        break;
      case "arrowdown":
        decreaseVolume();
        break;
      case "m":
        setMuted(!muted);
        break;
      case "arrowleft":
        skip(-5);
        break;
      case "arrowright":
        skip(5);
        break;
      case "j":
        skip(-10);
        break;
      case "l":
        skip(10);
        break;
      case "f5":
        window.location.reload();
        break;
      default:
        console.log(key);
    }
  };

  // Volume Handling

  const handleVolume = (e) => {
    if (e > 0 && e <= 10) {
      setMuted(false);
    }
    setVolume(e);
    document.getElementById("video").volume = e / 10;
  };
  const decreaseVolume = () => {
    if (volume > 0) {
      handleVolume(volume - 1);
    }
  };
  const increaseVolume = () => {
    if (volume < 10) {
      handleVolume(volume + 1);
    }
  };

  // Play/Pause
  const togglePlay = () => {
    setPlay(!play);
  };

  // Screen Modes
  const toggleTheaterMode = () => {
    disptach({ type: "theaterMode" });
  };
  const toggleFullScreenMode = () => {
    if (document.fullscreenElement == null) {
      document.getElementById("video").requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };
  function toggleMiniPlayerMode() {
    setMiniPlayer(!miniPlayer);
    if (miniPlayer) {
      document.exitPictureInPicture();
    } else {
      document.getElementById("video").requestPictureInPicture();
    }
  }

  // Duration
  const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
  });
  function formatDuration(time) {
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600);
    if (hours === 0) {
      return `${minutes}:${leadingZeroFormatter.format(seconds)}`;
    } else {
      return `${hours}:${leadingZeroFormatter.format(
        minutes
      )}:${leadingZeroFormatter.format(seconds)}`;
    }
  }

  function skip(duration) {
    document.getElementById("video").currentTime += duration;
  }
  // Timeline

  const seek = (e) => {
    const newPosition = e;
    setPosition(newPosition);
    document.getElementById("video").currentTime = newPosition;
  };

  // Playback Speed
  function changePlaybackSpeed() {
    let newPlaybackRate = document.getElementById("video").playbackRate + 0.25;
    if (newPlaybackRate > 2) newPlaybackRate = 0.25;
    document.getElementById("video").playbackRate = newPlaybackRate;
    setPlayBack(`${newPlaybackRate}x`);
  }

  useEffect(() => {
    // Play/Pause
    play
      ? document.getElementById("video").play()
      : document.getElementById("video").pause();

    if (muted) {
      // Volume Handling
      document.getElementById("video").muted = true;
      setVolume(0);
    } else if (muted === false) {
      document.getElementById("video").muted = false;
      setVolume(document.getElementById("video").volume * 10);
    }
    if (volume > 5) {
      setVolumeState("high");
    } else if (muted || volume === 0) {
      setVolumeState("muted");
    } else if (volume < 5) {
      setVolumeState("low");
    }
  }, [play, muted, volume]);

  useEffect(() => {
    // document.getElementById("video").play();
  }, []);

  return (
    <>
      <div
        tabIndex={0}
        className={`video-container ${play ? "" : "paused"} ${
          theaterMode ? "theater" : ""
        }`}
        data-volume-level={volumeState}
      >
        <div className="video-controls-container">
          <div className="timeline-container">
            <Slider
              aria-label="time-indicator"
              size="small"
              value={position}
              min={0}
              step={1}
              max={maxPosition}
              onChange={(e) => {
                seek(e.target.value);
              }}
              sx={{
                color: "red",
                height: 4,
                "& .MuiSlider-thumb": {
                  width: 8,
                  height: 8,
                  transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                  "&:before": {
                    boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                  },
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: `0px 0px 0px 8px ${
                      theme.palette.mode === "dark"
                        ? "rgb(0 0 0 / 16%)"
                        : "rgb(255 255 255 / 16%)"
                    }`,
                  },
                  "&.Mui-active": {
                    width: 20,
                    height: 20,
                  },
                },
                "& .MuiSlider-rail": {
                  opacity: 0.28,
                },
              }}
            />
          </div>
          <div className="timeline-container"></div>
          <div className="controls">
            <button
              className="play-pause-btn"
              onClick={() => {
                togglePlay();
              }}
            >
              <svg className="play-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
              </svg>
              <svg className="pause-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
              </svg>
            </button>
            <div
              tabIndex="0"
              onMouseEnter={() => {
                setMuteHover(true);
              }}
              onMouseLeave={() => {
                setMuteHover(false);
              }}
              className="d-flex align-items-center justify-content-between volume-container"
            >
              <button
                className="mute-btn mr-3"
                style={{ width: "40px", paddingRight: "10px" }}
                onClick={() => {
                  setMuted(!muted);
                }}
                onMouseEnter={() => {
                  setMuteHover(true);
                }}
                onMouseLeave={() => {
                  setMuteHover(false);
                }}
              >
                <svg className="volume-high-icon" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"
                  />
                </svg>
                <svg className="volume-low-icon" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z"
                  />
                </svg>
                <svg className="volume-muted-icon" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z"
                  />
                </svg>
              </button>
              <div
                className="volume-container ml-1"
                tabIndex="0"
                onMouseEnter={() => {
                  setMuteHover(true);
                }}
                onMouseLeave={() => {
                  setMuteHover(false);
                }}
              >
                <Slider
                  className={`volume-slider  ${muteHover ? "hover" : ""}`}
                  size="small"
                  defaultValue={0}
                  aria-label="Small"
                  min={0}
                  max={10}
                  value={volume}
                  onChange={(e) => {
                    handleVolume(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="duration-container">
              <div className="current-time">{currentTime}</div>/
              <div className="total-time">{duration}</div>
            </div>
            <button
              onClick={() => {
                changePlaybackSpeed();
              }}
              className="speed-btn wide-btn"
            >
              {playBack}
            </button>
            {/* <MaterialUISwitch /> */}
            <button
              className="mini-player-btn"
              onClick={() => {
                toggleMiniPlayerMode();
              }}
            >
              <svg viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z"
                />
              </svg>
            </button>
            <button
              className="theater-btn"
              onClick={() => {
                toggleTheaterMode();
              }}
            >
              <svg className="tall" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z"
                />
              </svg>
              <svg className="wide" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M19 7H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H5V9h14v6z"
                />
              </svg>
            </button>
            <button
              className="full-screen-btn"
              onClick={() => {
                toggleFullScreenMode();
              }}
            >
              <svg className="open" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
                />
              </svg>
              <svg className="close" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
                />
              </svg>
            </button>
          </div>
        </div>
        <video
          tabIndex="0"
          autoPlay={true}
          onLoadedData={(e) => {
            setDuration(formatDuration(e.target.duration));
            setMaxPosition(e.target.duration);
            setTimeout(() => {}, (e.target.duration * 1000) / 2);
          }}
          onTimeUpdate={(e) => {
            setCurrentTime(formatDuration(e.target.currentTime));
            setPosition(document.getElementById("video").currentTime);

            document
              .querySelector(".timeline-container")
              .style.setProperty("--progress-position", position);
          }}
          onClick={() => {
            togglePlay();
          }}
          onKeyDown={(e) => {
            keyFun(e);
            e.preventDefault();
          }}
          onPlay={() => {
            setPlay(true);
          }}
          onPause={() => {
            setPlay(false);
          }}
          id="video"
          src={videoURL}
        ></video>
      </div>
    </>
  );
}

export default VideoPlayer;
