import '@/styles/retro.css'
import '@/styles/index.css'

import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
  useRouterState,
} from '@tanstack/react-router'
import { Loader } from '@/components/loader'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export type RouterAppContext = {}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: RootComponent,
  head: () => ({
    meta: [
      {
        title: 'Triki Game',
      },
      {
        name: 'description',
        content: 'This a simple tictactoe game.',
      },
    ],
    links: [
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
    ],
  }),
})

function RootComponent() {
  const isFetching = useRouterState({ select: (s) => s.isLoading })

  return (
    <>
      <HeadContent />
      <ThemeProvider
        attribute='class'
        defaultTheme='dark'
        disableTransitionOnChange
        storageKey='vite-ui-theme'
      >
        <div className='grid grid-rows-[auto_1fr] h-svh retro'>
          {isFetching ? <Loader /> : <Outlet />}
        </div>
        <Toaster
          richColors
          position='top-center'
        />
      </ThemeProvider>
      <TanStackRouterDevtools position='bottom-left' />
    </>
  )
}
