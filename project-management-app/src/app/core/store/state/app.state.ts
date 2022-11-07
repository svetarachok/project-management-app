import { BoardsState, initialBoardState } from './boards.state';
import { initialUserState, UserState } from './user.state';
// Import USer state and initialState

// Add user state
export interface AppState {
  boards: BoardsState;
  user: UserState;
}

//add user initial
export const initialAppState: AppState = {
  boards: initialBoardState,
  user: initialUserState,
};

export function getAppState(): AppState {
  return initialAppState;
}
