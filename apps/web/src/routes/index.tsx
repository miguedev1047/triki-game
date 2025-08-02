import { Square } from '@/components/square'
import { createFileRoute } from '@tanstack/react-router'
import { useGame } from '@/store/use-game'
import { Button } from '@/components/ui/8bit/button'
import { Badge } from '@/components/ui/8bit/badge'
import { Box } from '@/components/ui/8bit/box'
import { ModeToggle } from '@/components/mode-toggle'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  const board = useGame((s) => s.board)
  const resetGame = useGame((s) => s.resetGame)

  const turn = useGame((s) => s.turn)
  const winnerStatus = useGame((s) => s.winner)

  const winnerX = winnerStatus === 'X'
  const winnerO = winnerStatus === 'O'
  const isDraw = winnerStatus === 'DRAW'
  const none = winnerStatus === 'NONE'

  return (
    <main className='p-4 md:p-8 flex items-center justify-center w-full h-svh'>
      <ModeToggle/>
      
      <Box className='w-[320px] sm:w-[480px] md:w-[640px] h-auto grid relative grid-cols-3 gap-4 md:gap-8 p-4 md:p-8'>
        <div className='absolute w-full h-20 top-0 -translate-y-[100%] flex items-center justify-center gap-2'>
          {none && <Badge>{turn}'s turn</Badge>}
          {winnerX && <Badge>The X is won!</Badge>}
          {winnerO && <Badge>The O is won!</Badge>}
          {isDraw && <Badge>The match is a draw!</Badge>}
        </div>

        {board.map((_, index) => (
          <Square
            index={index}
            key={crypto.randomUUID()}
          />
        ))}

        <div className='absolute w-full h-20 bottom-0 translate-y-[100%] flex items-center justify-center'>
          <Button onClick={resetGame}>Reset</Button>
        </div>
      </Box>
    </main>
  )
}
