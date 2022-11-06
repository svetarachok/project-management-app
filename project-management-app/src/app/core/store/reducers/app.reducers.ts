import { ActionReducerMap } from "@ngrx/store";

import { AppState } from "../state/app.state";

import { boardsReducer } from "./boards.reducers";
import { userReducer } from "./user.reducers";


export const appReducers: ActionReducerMap<AppState> = {
  boards: boardsReducer,
  user: userReducer,
}
