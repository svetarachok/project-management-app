import * as fromColumns from '../state/columns.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getColumnsSelector =
  createFeatureSelector<fromColumns.ColumnsState>('columns');

export const getColumns = createSelector(
  getColumnsSelector,
  columns => columns.columns
);

export const getColumnsQuantity = createSelector(
  getColumnsSelector,
  columns => columns.columns.length
);
