import { createReducer, on } from '@ngrx/store';

import { BoardsState, initialBoardState } from "../state/boards.state";

export const boardsReducer = createReducer(
  initialBoardState,
);