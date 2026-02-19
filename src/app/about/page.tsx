import AboutHero from '@/components/sections/about/AboutHero'
import CompanyStory from '@/components/sections/about/CompanyStory'
import ValuesGrid from '@/components/sections/about/ValuesGrid'
import TeamSection from '@/components/sections/about/TeamSection'
import WhyChooseUs from '@/components/sections/about/WhyChooseUs'

export default function AboutPage() {
  return (
    <div>
      <AboutHero />
      <CompanyStory />
      <ValuesGrid />
      <TeamSection />
      <WhyChooseUs />
    </div>
  )
}
