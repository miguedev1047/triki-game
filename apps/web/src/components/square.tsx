import type { BoardTemplate, GameBoard } from '@/types'
import { useGame } from '@/store/use-game'
import { SymbolIcon } from '@/components/symbol'
import { checkIsDraw, checkIsWinSquare, checkWinner } from '@/utils/board'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/8bit/button'
import { useFadeState } from '@/hooks/fade-state'
import { PLAYS_TO_REMOVE } from '@/constants'
import { playSound } from '@/utils/sound'

export function Square(props: BoardTemplate) {
  const { index } = props

  const board = useGame((s) => s.board)
  const updateBoard = useGame((s) => s.updateBoard)
  const symbol = board[index]

  const history = useGame((s) => s.history)
  const updateHistory = useGame((s) => s.updateHistory)

  const turn = useGame((s) => s.turn)
  const updateTurn = useGame((s) => s.updateTurn)

  const winnerStatus = useGame((s) => s.winner)
  const updateWinner = useGame((s) => s.updateWinner)

  const updateDialogOpen = useGame((s) => s.updateDialogOpen)

  const fadeState = useFadeState(index, symbol, history)

  const removeOldPlay = (history: number[], newBoard: GameBoard) => {
    if (history.length >= PLAYS_TO_REMOVE) {
      const oldestMoveIndex = history[0]
      const updatedBoard = [...newBoard]
      updatedBoard[oldestMoveIndex] = null
      const updatedHistory = history.slice(1)
      updateBoard(updatedBoard)
      updateHistory(updatedHistory)
    }
  }

  const handleChangeSymbol = () => {
    if (board[index] || winnerStatus !== 'NONE') return

    const newBoard = [...board]
    const newHistory = [...history]

    newBoard[index] = turn
    newHistory.push(index)

    updateBoard(newBoard)
    updateHistory(newHistory)

    const newTurn = turn === 'X' ? 'O' : 'X'
    updateTurn(newTurn)

    removeOldPlay(newHistory, newBoard)

    const newWinner = checkWinner(newBoard)
    const isDraw = checkIsDraw(newBoard)

    if (newWinner) {
      updateWinner(newWinner)
      playSound({ type: 'win' })
      updateDialogOpen(true)
      return
    }

    if (isDraw) {
      updateWinner('DRAW')
      return
    }

    playSound({ type: 'tap' })
  }

  const winSquare = checkIsWinSquare(board)
  const isHighlighted = winSquare?.includes(index)

  return (
    <Button
      className='aspect-square size-full grid place-items-center cursor-pointer p-2 md:p-6'
      size='icon'
      onClick={handleChangeSymbol}
    >
      <SymbolIcon
        symbol={symbol}
        className={cn(
          isHighlighted && 'text-secondary',
          'transition-opacity duration-500 size-full grid place-items-center',
          {
            'opacity-100': fadeState === 'FULL',
            'animate-pulse text-destructive': fadeState === 'INTERMEDIATE',
            'opacity-30': fadeState === 'FADING',
          }
        )}
      />
    </Button>
  )
}
