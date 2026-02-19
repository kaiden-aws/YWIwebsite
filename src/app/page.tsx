export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-4xl font-bold text-forest mb-8">
          Yard Weasels Inc.
        </h1>
        <p className="text-lg text-charcoal mb-6">
          Design tokens are working. This text is charcoal on cream.
        </p>
        <div className="flex gap-4 flex-wrap">
          <div className="w-24 h-24 rounded-lg bg-forest flex items-center justify-center text-cream text-xs">Forest</div>
          <div className="w-24 h-24 rounded-lg bg-cream border-2 border-charcoal flex items-center justify-center text-charcoal text-xs">Cream</div>
          <div className="w-24 h-24 rounded-lg bg-terracotta flex items-center justify-center text-cream text-xs">Terracotta</div>
          <div className="w-24 h-24 rounded-lg bg-charcoal flex items-center justify-center text-cream text-xs">Charcoal</div>
          <div className="w-24 h-24 rounded-lg bg-sage flex items-center justify-center text-forest text-xs">Sage</div>
          <div className="w-24 h-24 rounded-lg bg-forest-light flex items-center justify-center text-cream text-xs">Forest Light</div>
          <div className="w-24 h-24 rounded-lg bg-terracotta-light flex items-center justify-center text-cream text-xs">Terra Light</div>
        </div>
      </div>
    </main>
  )
}
