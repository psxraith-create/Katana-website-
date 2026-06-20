import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { Navigation } from '@/components/nav/Navigation'
import { ScrollVideoHero } from '@/components/hero/ScrollVideoHero'
import { HeritageSection } from '@/components/sections/HeritageSection'
import { CraftSection } from '@/components/sections/CraftSection'
import { CollectionSection } from '@/components/sections/CollectionSection'
import { AtelierSection } from '@/components/sections/AtelierSection'
import { Footer } from '@/components/footer/Footer'

export default function Home() {
  return (
    <SmoothScrollProvider>
      <div id="top" />
      <Navigation />
      <main id="main-content">
        <ScrollVideoHero />
        <HeritageSection />
        <CraftSection />
        <CollectionSection />
        <AtelierSection />
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}
