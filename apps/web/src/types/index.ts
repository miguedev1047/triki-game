export type BoardTemplate = { index: number }

export type Player = 'X' | 'O'
export type GameStatus = 'WAITING' | 'PLAYING' | 'FINISHED' | 'NONE'
export type Winner = Player | 'DRAW' | 'NONE'
export type Cell = 'X' | 'O' | null

export type GameBoard = Cell[]
export type HistoryBoard = number[]

export interface DefaultValues {
  board: GameBoard
  dialogOpen: boolean
  history: HistoryBoard
  gameStatus: GameStatus
  winner: Winner
  turn: Player
}

export interface RemoveOldPlay {
  history: Cell[]
  updateHistory: (newHistory: Cell[]) => void
  updateBoard: (newBoard: HistoryBoard) => void
  newBoard: GameBoard
}

export type FadeState = 'FULL' | 'INTERMEDIATE' | 'FADING'

export interface Game {
  board: GameBoard
  history: HistoryBoard
  gameStatus: GameStatus
  winner: Winner
  turn: Player
  dialogOpen: boolean
  updateBoard: (newBoard: GameBoard) => void
  updateHistory: (newHistory: HistoryBoard) => void
  updateGameStatus: (status: GameStatus) => void
  updateWinner: (winner: Winner) => void
  updateTurn: (turn: Player) => void
  updateDialogOpen: (open: boolean) => void
  resetGame: () => void
}
