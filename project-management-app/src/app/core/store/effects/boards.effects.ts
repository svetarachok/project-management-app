import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, map } from 'rxjs/operators';

import * as BoardsActions from '../actions/boards.actions';

import { BoardService } from 'src/app/boards/services/board-service/board.service';
import { Board } from 'src/app/boards/models/board.interface';

@Injectable()
export class BoardsEffects {
  createBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardsActions.CREATE_BOARD),
      mergeMap((action: Board) => {
        return this.boardsService
          .createNewBoard({
            title: action.title,
            description: action.description,
          })
          .pipe(
            map(boards => {
              return BoardsActions.createNewBoardSuccess({ boards: boards });
            })
          );
      })
    );
  });

  deleteBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardsActions.DELETE_BOARD),
      mergeMap((action: Board) => {
        return this.boardsService.deleteBoard(action.id!).pipe(
          map(() => {
            return BoardsActions.deleteBoardsSuccess({ id: action.id! });
          })
        );
      })
    );
  });

  constructor(private actions$: Actions, private boardsService: BoardService) {}
}
