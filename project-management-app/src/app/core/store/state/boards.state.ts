import { Board } from '../../../boards/models/board.interface';

export interface BoardsState {
  boards: Board[];
}

export const initialBoardState: BoardsState = {
  boards: [],
};
