import { GetterTree, MutationTree } from 'vuex'
import { Column } from '~/types'
import { PlayerColor } from '~/enums/player-color.enum'

export const FIELD_SIZE = 7

export const GettersType = {
  GET_WINNER: 'getWinner'
}

export const MutationType = {
  MAKE_STEP: 'makeStep'
}

export interface RootState {
  field: Column[],
  currentPlayerColor: PlayerColor,
  winnerColor: PlayerColor | null,
}

export const state = (): RootState => ({
  field: (new Array(FIELD_SIZE))
    .fill({})
    .map(() => ({
      occupied: 0,
      isFull: false,
      points: (new Array(FIELD_SIZE))
        .fill({})
        .map(() => ({ color: null }))
    })),
  currentPlayerColor: PlayerColor.Red,
  winnerColor: null
})

export const getters: GetterTree<RootState, RootState> = {
  [GettersType.GET_WINNER]: (state): PlayerColor | null => {
    const directions = [
      { x: 0, y: -1 },
      { x: 1, y: -1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
      { x: -1, y: 1 },
      { x: -1, y: 0 },
      { x: -1, y: -1 }
    ]

    const checkDirection = (x: number, y: number, direction: { x: number, y: number }, step = 2): boolean => {
      if (x + direction.x < 0 || x + direction.x >= FIELD_SIZE) {
        return false
      }

      if (y + direction.y < 0 || y + direction.y >= FIELD_SIZE) {
        return false
      }

      if (!state.field[x + direction.x].points[y + direction.y].color) {
        return false
      }

      if (state.field[x].points[y].color !== state.field[x + direction.x].points[y + direction.y].color) {
        return false
      }

      if (!step) {
        return true
      }

      return checkDirection(x + direction.x, y + direction.y, direction, --step)
    }

    for (let x = 0; x < state.field.length; x++) {
      for (let y = 0; y < state.field[x].points.length; y++) {

        if (directions.some(direction => checkDirection(x, y, direction))) {
          return state.field[x].points[y].color
        }
      }
    }

    return null
  }
}

export const mutations: MutationTree<RootState> = {
  [MutationType.MAKE_STEP]: (state: RootState, columnIndex: number) => {
    const column = state.field[columnIndex]

    if (column.occupied >= column.points.length) {
      throw new Error('Column is full')
    }

    const lowerPosition = column.points.length - column.occupied - 1

    column.points[lowerPosition].color = state.currentPlayerColor

    column.occupied++
    column.isFull = (column.occupied >= column.points.length)

    state.currentPlayerColor = state.currentPlayerColor === PlayerColor.Red ? PlayerColor.Yellow : PlayerColor.Red
  }
}
