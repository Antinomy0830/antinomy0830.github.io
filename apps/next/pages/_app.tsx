import '@tamagui/core/reset.css'
import '@tamagui/font-inter/css/400.css'
import '@tamagui/font-inter/css/700.css'
import 'raf/polyfill'

import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme'
import React, { startTransition, Suspense } from 'react'
import { AppProps } from 'next/app'
import { TamaguiProvider } from '@tamagui/web'
import config from '../tamagui.config'
import { useRouter } from 'next/router'

export default function App(props: AppProps) {
  const [theme, setTheme] = useRootTheme()

  return (
    <>
      <NextThemeProvider
        onChangeTheme={(next) => {
          startTransition(() => {
            setTheme(next)
          })
        }}
      >
        <TamaguiProvider
          config={config}
          disableInjectCSS
          disableRootThemeClass
          defaultTheme={theme}
        >
          <Suspense fallback={null}>
            <ContentInner {...props} />
          </Suspense>
        </TamaguiProvider>
      </NextThemeProvider>
    </>
  )
}

function ContentInner({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const isHome = router.pathname === '/'
  const isBlog = router.pathname.startsWith('/blog')

  // @ts-ignore
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <>
      <Component {...pageProps} />
    </>
  )
}
