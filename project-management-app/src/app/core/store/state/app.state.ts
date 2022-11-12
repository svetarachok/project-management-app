import { BoardsState, initialBoardState } from './boards.state';
import { ColumnsState, initialColumnState } from './columns.state';
import { initialUserState, UserState } from './user.state';
// Import USer state and initialState

// Add user state
export interface AppState {
  boards: BoardsState;
  columns: ColumnsState;
  user: UserState;
}

//add user initial
export const initialAppState: AppState = {
  boards: initialBoardState,
  columns: initialColumnState,
  user: initialUserState,
};

export function getAppState(): AppState {
  return initialAppState;
}
