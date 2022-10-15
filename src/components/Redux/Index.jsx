import { combineReducers } from "redux";
import LoggedInUser from "./LoggedInUser";
import OpenVideoDetailsDialog from "./OpenVideoDetailsDialog";

import OpenVideoDialog from "./OpenVideoDialog";
import VideoURL from "./VideoURL";

import TheaterMode from "./TheaterMode";
import { ReloadHome } from "./ReloadHome";
import { ReloadPlaylists } from "./ReloadPlaylists";
import OpenPlaylistModal from "./OpenPlaylistModal";
import OpenPlaylistAdd from "./OpenPlaylistAdd";
import LoginModal from "./LoginModal";
import { ReloadMyVideos } from "./ReloadMyVideos";

export const rootReducer = combineReducers({
  OpenVideoDialog: OpenVideoDialog,
  VideoURL: VideoURL,
  OpenVideoDetailsDialog: OpenVideoDetailsDialog,
  LoggedInUser: LoggedInUser,
  TheaterMode: TheaterMode,
  ReloadHome: ReloadHome,
  ReloadPlaylists: ReloadPlaylists,
  PlaylistModal: OpenPlaylistModal,
  PlaylistAdd: OpenPlaylistAdd,
  LoginModal: LoginModal,
  ReloadMyVideos: ReloadMyVideos,
});
