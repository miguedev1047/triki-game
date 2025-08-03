import type { GameBoard } from '@/types'
import { WINNER_COMBOS } from '@/constants'

export function checkWinner(boardToCheck: GameBoard) {
  for (const combos of WINNER_COMBOS) {
    const [a, b, c] = combos
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a]
    }
  }
  return null
}

export function checkIsDraw(boardToCheck: GameBoard) {
  const isDraw = boardToCheck.every((square) => square !== null)
  return isDraw
}

export function checkIsWinSquare(boardToCheck: GameBoard) {
   for (const combos of WINNER_COMBOS) {
    const [a, b, c] = combos
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return combos
    }
  }
  return null
}