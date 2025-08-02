import type { DefaultValues, Game } from '@/types'
import { create } from 'zustand'

const TURNS = {
  x: 'X',
  o: 'O',
} as const

const DEFAULT_VALUES: DefaultValues = {
  board: [...Array(9).fill(null)],
  history: [],
  gameStatus: 'NONE',
  winner: 'NONE',
  turn: TURNS.x,
}

export const useGame = create<Game>((set) => ({
  ...DEFAULT_VALUES,
  updateBoard: (newboard) => set(() => ({ board: newboard })),
  updateHistory: (newhistory) => set(() => ({ history: newhistory })),
  updateGameStatus: (status) => set(() => ({ gameStatus: status })),
  updateWinner: (winner) => set(() => ({ winner })),
  updateTurn: (turn) => set(() => ({ turn })),
  resetGame: () => set(() => ({ ...DEFAULT_VALUES })),
}))
