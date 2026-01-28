'use client'

import { useTheme } from '@/themes/theme-provider'
import { MainHero } from './MainHero'
import { BrutalistHero } from './BrutalistHero'
import { NeoBrutalHero } from './NeoBrutalHero'
import { MinimalistHero } from './MinimalistHero'

export function Hero() {
  const { theme } = useTheme()
  
  switch (theme) {
    case 'brutalist':
      return <BrutalistHero />
    case 'neo-brutalism':
      return <NeoBrutalHero />
    case 'minimalist':
      return <MinimalistHero />
    case 'main':
    default:
      return <MainHero />
  }
}
