import type { Cell } from '@/types'
import { cn } from '@/lib/utils'
import { XIcon } from '@/assets/icons/X-icon'
import { OIcon } from '@/assets/icons/O-icon'

interface SymbolIconProps extends React.ComponentProps<'svg'> {
  symbol: Cell
}

export function SymbolIcon({ symbol, className, ...props }: SymbolIconProps) {
  if (symbol === 'X')
    return (
      <XIcon
        className={cn('size-full', className)}
        {...props}
      />
    )
  if (symbol === 'O')
    return (
      <OIcon
        className={cn('size-full', className)}
        {...props}
      />
    )
  return null
}
