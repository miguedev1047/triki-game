import type { Cell, FadeState } from '@/types'
import { useGame } from '@/store/use-game'
import { useEffect, useState } from 'react'
import { PLAYS_TO_REMOVE } from '@/constants'

export function useFadeState(index: number, symbol: Cell, history: number[]) {
  const [fadeState, setFadeState] = useState<FadeState>('FULL')
  const winnerStatus = useGame((s) => s.winner)

  useEffect(() => {
    if (winnerStatus !== 'NONE') {
      setFadeState('FULL')
      return
    }

    if (!symbol) {
      setFadeState('FULL')
      return
    }

    const symbolPositionInHistory = history.findIndex(
      (cellIndex) => cellIndex === (index as never)
    )

    if (symbolPositionInHistory === -1) {
      setFadeState('FULL')
      return
    }

    const isAboutToBeRemoved =
      symbolPositionInHistory === 0 && history.length >= PLAYS_TO_REMOVE
    const isNextToBeRemoved =
      symbolPositionInHistory === 1 && history.length >= PLAYS_TO_REMOVE
    const willBeRemovedSoon =
      symbolPositionInHistory === 0 && history.length === PLAYS_TO_REMOVE - 1

    if (isAboutToBeRemoved) {
      setFadeState('FADING')
    } else if (isNextToBeRemoved || willBeRemovedSoon) {
      setFadeState('INTERMEDIATE')
    } else {
      setFadeState('FULL')
    }
  }, [history, symbol, index, winnerStatus])

  return fadeState
}
