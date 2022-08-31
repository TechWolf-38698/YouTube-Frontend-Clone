import { combineReducers } from "redux";
import LoggedInUser from "./LoggedInUser";
import OpenVideoDetailsDialog from "./OpenVideoDetailsDialog";

import OpenVideoDialog from "./OpenVideoDialog";
import VideoURL from "./VideoURL";

import TheaterMode from "./TheaterMode";

export const rootReducer = combineReducers({
  OpenVideoDialog: OpenVideoDialog,
  VideoURL: VideoURL,
  OpenVideoDetailsDialog: OpenVideoDetailsDialog,
  LoggedInUser: LoggedInUser,
  TheaterMode: TheaterMode,
});
