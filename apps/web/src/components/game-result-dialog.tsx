import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/8bit/alert-dialog'
import { useGame } from '@/store/use-game'
import { Handshake, Trophy } from 'lucide-react'

export function GameResultDialog() {
  const winnerStatus = useGame((s) => s.winner)
  const resetGame = useGame((s) => s.resetGame)
  const dialogOpen = useGame((s) => s.dialogOpen)
  const updateDialogOpen = useGame((s) => s.updateDialogOpen)

  const gameResult = {
    X: {
      title: 'Player X Wins!',
      message: 'Congratulations to Player X!',
      icon: <Trophy className='h-12 w-12' />,
    },
    O: {
      title: 'Player O Wins!',
      message: 'Congratulations to Player O!',
      icon: <Trophy className='h-12 w-12' />,
    },
    DRAW: {
      title: "It's a Draw!",
      message: 'Good game! Nobody wins this time.',
      icon: <Handshake className='h-12 w-12' />,
    },
  }

  const currentResult = gameResult[winnerStatus as keyof typeof gameResult]

  const handleResetGame = () => {
    resetGame()
    updateDialogOpen(false)
  }

  const handleCloseDialog = () => {
    updateDialogOpen(false)
  }

  if (!currentResult) return null

  return (
    <AlertDialog
      open={dialogOpen}
      onOpenChange={handleCloseDialog}
    >
      <AlertDialogContent className='sm:max-w-md retro'>
        <AlertDialogHeader className='text-center space-y-4'>
          <div className='mx-auto w-20 h-20 rounded-full flex items-center justify-center'>
            {currentResult.icon}
          </div>
          <AlertDialogTitle className='text-2xl text-primary text-center'>
            {currentResult.title}
          </AlertDialogTitle>
        </AlertDialogHeader>

        <div className='text-center py-4'>
          <p className='text-lg'>{currentResult.message}</p>
        </div>

        <AlertDialogFooter className='grid grid-cols-2 gap-8'>
          <AlertDialogCancel>Close</AlertDialogCancel>

          <AlertDialogAction onClick={handleResetGame}>
            Play Again
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
