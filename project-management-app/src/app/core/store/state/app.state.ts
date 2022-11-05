import { BoardsState, initialBoardState } from "./boards.state";
// Import USer state and initialState

// Add user state
export interface AppState {
  boards: BoardsState,
}

//add user initial 
export const initialAppState: AppState = {
  boards: initialBoardState,
}

export function getAppState(): AppState {
  return initialAppState;
}