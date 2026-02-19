import AboutHero from '@/components/sections/about/AboutHero'
import CompanyStory from '@/components/sections/about/CompanyStory'
import ValuesGrid from '@/components/sections/about/ValuesGrid'

export default function AboutPage() {
  return (
    <div>
      <AboutHero />
      <CompanyStory />
      <ValuesGrid />
      {/* TeamSection and WhyChooseUs — added in Plan 04-02 */}
    </div>
  )
}
