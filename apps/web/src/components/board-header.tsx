import { useGame } from '@/store/use-game'
import { Box } from '@/components/ui/8bit/box'
import { Button } from '@/components/ui/8bit/button'
import { ReloadIcon } from '@/assets/icons/reload-icon'

export function BoardHeader() {
  const resetGame = useGame((s) => s.resetGame)

  return (
    <div className='w-full'>
      <Box className='flex flex-1 items-end justify-between '>
       <h2 className='md:text-2xl'>Triki Game</h2>
        <Button
          onClick={resetGame}
          size='icon'
        >
          <ReloadIcon />
        </Button>
      </Box>
    </div>
  )
}
