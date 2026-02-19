import AnimatedSection from '@/components/ui/AnimatedSection'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import GrainOverlay from '@/components/ui/GrainOverlay'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero section with grain overlay — tests FNDN-03 (colors), FNDN-04 (typography), FNDN-08 (grain) */}
      <section className="relative flex min-h-[60vh] items-center justify-center bg-forest overflow-hidden">
        <GrainOverlay />
        <div className="relative z-20 text-center px-6">
          <h1 className="font-display text-5xl md:text-7xl text-cream mb-4">
            Yard Weasels Inc.
          </h1>
          <p className="text-lg md:text-xl text-cream/80 max-w-2xl mx-auto">
            Premium landscaping services in Fergus, Ontario
          </p>
        </div>
      </section>

      {/* Color palette section — tests FNDN-03 */}
      <AnimatedSection className="py-16 px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-3xl text-forest mb-8">Brand Color Palette</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            <div className="flex flex-col items-center gap-2">
              <div className="w-full aspect-square rounded-lg bg-forest" />
              <span className="text-xs text-charcoal">Forest</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-full aspect-square rounded-lg bg-forest-light" />
              <span className="text-xs text-charcoal">Forest Light</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-full aspect-square rounded-lg bg-cream border border-charcoal/20" />
              <span className="text-xs text-charcoal">Cream</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-full aspect-square rounded-lg bg-terracotta" />
              <span className="text-xs text-charcoal">Terracotta</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-full aspect-square rounded-lg bg-terracotta-light" />
              <span className="text-xs text-charcoal">Terra Light</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-full aspect-square rounded-lg bg-charcoal" />
              <span className="text-xs text-charcoal">Charcoal</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-full aspect-square rounded-lg bg-sage" />
              <span className="text-xs text-charcoal">Sage</span>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Typography section — tests FNDN-04 */}
      <AnimatedSection className="py-16 px-6 bg-white" delay={0.1}>
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-3xl text-forest mb-8">Typography</h2>
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-wider text-charcoal/50 mb-2">DM Serif Display — Headings</p>
              <h3 className="font-display text-4xl text-charcoal">Crafting Outdoor Spaces That Inspire</h3>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-charcoal/50 mb-2">Plus Jakarta Sans — Body</p>
              <p className="text-lg text-charcoal leading-relaxed">
                Yard Weasels Inc. has been serving the Fergus, Ontario community with premium
                landscaping services. From design and build to maintenance, irrigation, and snow
                removal — we bring craftsmanship to every outdoor space.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* AnimatedSection demo — tests FNDN-06 with staggered delays */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-4xl">
          <AnimatedSection>
            <h2 className="font-display text-3xl text-forest mb-8">Scroll Animations</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedSection delay={0}>
              <div className="p-6 rounded-lg bg-forest text-cream">
                <h3 className="font-display text-xl mb-2">Design & Build</h3>
                <p className="text-sm text-cream/80">Complete landscape transformation from concept to installation.</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="p-6 rounded-lg bg-forest text-cream">
                <h3 className="font-display text-xl mb-2">Maintenance</h3>
                <p className="text-sm text-cream/80">Year-round care to keep your property looking its best.</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <div className="p-6 rounded-lg bg-forest text-cream">
                <h3 className="font-display text-xl mb-2">Snow Removal</h3>
                <p className="text-sm text-cream/80">Reliable winter services for residential and commercial properties.</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Image placeholder section — tests FNDN-07 */}
      <AnimatedSection className="py-16 px-6 bg-white" delay={0.1}>
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-3xl text-forest mb-8">Image Placeholders</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <ImagePlaceholder label="Hero — Completed residential project" aspectRatio="video" />
            <ImagePlaceholder label="Team photo — YWI crew on site" aspectRatio="video" />
            <ImagePlaceholder label="Product — Natural stone display" aspectRatio="square" />
            <ImagePlaceholder label="Gallery — Hardscaping detail shot" aspectRatio="portrait" />
          </div>
        </div>
      </AnimatedSection>

      {/* Grain overlay demo on terracotta — tests FNDN-08 */}
      <section className="relative py-16 px-6 bg-terracotta overflow-hidden">
        <GrainOverlay />
        <AnimatedSection className="relative z-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-3xl text-cream mb-4">Grain Texture Overlay</h2>
            <p className="text-cream/80 max-w-xl mx-auto">
              This section has the grain/noise texture overlay applied. Look closely at the
              background for the subtle film grain effect that adds depth and texture.
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* Spacing reference — tests FNDN-09 convention */}
      <AnimatedSection className="py-16 px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-3xl text-forest mb-8">Spacing Convention</h2>
          <p className="text-charcoal mb-6">
            Using Tailwind default 4px base with generous values. Section padding: py-16 (64px).
            Grid gaps: gap-8 (32px). Content flow: space-y-6 (24px).
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-4 bg-sage rounded" />
              <span className="text-sm text-charcoal/60">gap-4 (16px)</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-24 h-4 bg-sage rounded" />
              <span className="text-sm text-charcoal/60">gap-6 (24px)</span>
            </div>
            <div className="flex items-center gap-8">
              <div className="w-32 h-4 bg-sage rounded" />
              <span className="text-sm text-charcoal/60">gap-8 (32px)</span>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </main>
  )
}
