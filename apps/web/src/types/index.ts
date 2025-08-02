export type BoardTemplate = { index: number }

export type Player = 'X' | 'O'
export type GameStatus = 'WAITING' | 'PLAYING' | 'FINISHED' | 'NONE'
export type Winner = Player | 'DRAW' | 'NONE'
export type Cell = 'X' | 'O' | null

export type GameBoard = Cell[]

export interface DefaultValues {
  board: GameBoard
  history: GameBoard
  gameStatus: GameStatus
  winner: Winner
  turn: Player
}

export interface RemoveOldPlay {
  history: Cell[]
  updateHistory: (newHistory: Cell[]) => void
  updateBoard: (newBoard: GameBoard) => void
  newBoard: GameBoard
}

export type FadeState = 'FULL' | 'INTERMEDIATE' | 'FADING'

export interface Game {
  board: GameBoard
  history: GameBoard
  gameStatus: GameStatus
  winner: Winner
  turn: Player
  updateBoard: (newBoard: GameBoard) => void
  updateHistory: (newHistory: GameBoard) => void
  updateGameStatus: (status: GameStatus) => void
  updateWinner: (winner: Winner) => void
  updateTurn: (turn: Player) => void
  resetGame: () => void
}
