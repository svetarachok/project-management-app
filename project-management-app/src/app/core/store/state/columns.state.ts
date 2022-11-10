import { Column } from '../../../boards/models/column.interface';

export interface ColumnsState {
  columns: Column[];
  boardId: string;
}

export const initialColumnState: ColumnsState = {
  columns: [],
  boardId: '',
};
