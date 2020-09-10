import {GetterTree, MutationTree} from 'vuex'
import {Column} from '~/types'
import {PlayerColor} from '~/enums/player-color.enum'

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
  },
}
