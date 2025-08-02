import { TapSound, DrawSound, WinSound } from '@/assets/audio-effects/_index'

export interface typeSound {
  type: 'change' | 'win' | 'draw'
}

export const playSound = (props: typeSound) => {
  const { type } = props

  if (type === 'change') {
    const audio = new Audio(TapSound)
    audio.play()
    return
  }

  if (type === 'win') {
    const audio = new Audio(WinSound)
    audio.play()
    return
  }

  if (type === 'draw') {
    const audio = new Audio(DrawSound)
    audio.play()
    return
  }
}
