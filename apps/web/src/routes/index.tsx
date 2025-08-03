import { Square } from '@/components/square'
import { createFileRoute } from '@tanstack/react-router'
import { useGame } from '@/store/use-game'
import { Box } from '@/components/ui/8bit/box'
import { ModeToggle } from '@/components/mode-toggle'
import { BoardHeader } from '@/components/board-header'
import { GameResultDialog } from '@/components/game-result-dialog'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  const board = useGame((s) => s.board)

  return (
    <main className='p-2 flex items-center justify-center w-full h-svh'>
      <Box className='size-full flex items-center justify-center p-4 md:p-8'>
        <ModeToggle />

        <div className='flex flex-col gap-4 z-50 p-2'>
          <BoardHeader />

          <Box className='w-[320px] sm:w-[480px] md:w-[640px] h-auto grid relative grid-cols-3 gap-4 md:gap-8 p-4 md:p-8'>
            {board.map((_, index) => (
              <Square
                index={index}
                key={crypto.randomUUID()}
              />
            ))}
          </Box>
        </div>

        <GameResultDialog />
      </Box>
    </main>
  )
}
