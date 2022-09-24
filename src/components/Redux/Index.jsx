import { combineReducers } from "redux";
import LoggedInUser from "./LoggedInUser";
import OpenVideoDetailsDialog from "./OpenVideoDetailsDialog";

import OpenVideoDialog from "./OpenVideoDialog";
import VideoURL from "./VideoURL";

import TheaterMode from "./TheaterMode";
import { ReloadHome } from "./ReloadHome";
import OpenPlaylistModal from "./OpenPlaylistModal";
import OpenPlaylistAdd from "./OpenPlaylistAdd";

export const rootReducer = combineReducers({
  OpenVideoDialog: OpenVideoDialog,
  VideoURL: VideoURL,
  OpenVideoDetailsDialog: OpenVideoDetailsDialog,
  LoggedInUser: LoggedInUser,
  TheaterMode: TheaterMode,
  ReloadHome: ReloadHome,
  PlaylistModal: OpenPlaylistModal,
  PlaylistAdd: OpenPlaylistAdd,
});
