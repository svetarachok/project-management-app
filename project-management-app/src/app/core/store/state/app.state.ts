import { BoardsState, initialBoardState } from './boards.state';
import { ColumnsState, initialColumnState } from './columns.state';
import { initialTasksState, TasksState } from './tasks.state';
import { initialUserState, UserState } from './user.state';
// Import USer state and initialState

// Add user state
export interface AppState {
  boards: BoardsState;
  columns: ColumnsState;
  tasks: TasksState;
  user: UserState;
}

//add user initial
export const initialAppState: AppState = {
  boards: initialBoardState,
  columns: initialColumnState,
  tasks: initialTasksState,
  user: initialUserState,
};

export function getAppState(): AppState {
  return initialAppState;
}
