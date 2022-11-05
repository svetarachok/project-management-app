import { ActionReducerMap } from "@ngrx/store";

import { AppState } from "../state/app.state";

import { boardsReducer } from "./boards.reducers";


export const appReducers: ActionReducerMap<AppState> = {
  boards: boardsReducer,
}