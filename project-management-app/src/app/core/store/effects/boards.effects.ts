/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';

import * as BoardsActions from '../actions/boards.actions';

import { BoardService } from '../../../boards/services/board-service/board.service';
import { Board } from '../../../boards/models/board.interface';
import { of } from 'rxjs';
import { ErrorService } from 'src/app/boards/services/error-service/error.service';
import { Action } from '@ngrx/store';

@Injectable()
export class BoardsEffects {
  createBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardsActions.CREATE_BOARD),
      mergeMap((action: Board) => {
        return this.boardsService
          .createNewBoard({
            title: action.title,
            owner: action.owner,
            users: action.users,
          })
          .pipe(
            map(board => {
              return BoardsActions.createNewBoardSuccess({ board });
            }),
            catchError(resp => {
              const errorMessage: string = this.errorService.getErrorMessage(
                resp.error
              );
              return of(
                BoardsActions.catchBoardsError({ message: errorMessage })
              );
            })
          );
      })
    );
  });

  deleteBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardsActions.DELETE_BOARD),
      mergeMap((action: Board) => {
        return this.boardsService.deleteBoard(action._id!).pipe(
          map(boards => {
            return BoardsActions.deleteBoardsSuccess({ _id: action._id! });
          })
        );
      })
    );
  });

  getBoards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardsActions.GET_BOARDS),
      mergeMap((action: { id: string }) => {
        return this.boardsService.getBoards(action.id!).pipe(
          map(boards => {
            return BoardsActions.getBoardsSuccess({ boards: boards });
          }),
          catchError(resp => {
            const errorMessage: string = this.errorService.getErrorMessage(
              resp.error
            );
            return of(
              BoardsActions.catchBoardsError({ message: errorMessage })
            );
          })
        );
      })
    );
  });

  deleteUserFromBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardsActions.UPDATE_BOARD),
      mergeMap((action: { board: Board; boardId: string; type: string }) => {
        return this.boardsService
          .updateBoard(action.board, action.boardId)
          .pipe(
            map(board => {
              return BoardsActions.upadteBoardSuccess({ board });
            }),
            catchError(resp => {
              const errorMessage: string = this.errorService.getErrorMessage(
                resp.error
              );
              return of(
                BoardsActions.catchBoardsError({ message: errorMessage })
              );
            })
          );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private boardsService: BoardService,
    private errorService: ErrorService
  ) {}
}
