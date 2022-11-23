import { Column } from '../../../boards/models/column.interface';

export interface ColumnsState {
  columns: Column[];
  boardId: string;
  error: string;
}

export const initialColumnState: ColumnsState = {
  columns: [],
  boardId: '',
  error: '',
};
