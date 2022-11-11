/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, map } from 'rxjs/operators';

import * as BoardsActions from '../actions/boards.actions';

import { BoardService } from '../../../boards/services/board-service/board.service';
import { Board } from '../../../boards/models/board.interface';

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
          })
        );
      })
    );
  });

  constructor(private actions$: Actions, private boardsService: BoardService) {}
}
