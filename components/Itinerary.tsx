'use client'

export default function Itinerary() {
  const scrollToRSVP = () => {
    const rsvpSection = document.getElementById('rsvp-section')
    if (rsvpSection) {
      rsvpSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="w-full mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold mb-8 text-left" style={{ color: '#FFB3D9' }}>
        ITINERARY
      </h2>

      <div className="space-y-4">
        <div style={{ color: '#FFB3D9' }}>
          <span className="font-bold">8:00 PM</span> — Doors open. There WILL be a bouncer, so make sure you{' '}
          <button
            onClick={scrollToRSVP}
            className="underline hover:opacity-80 transition-opacity"
            style={{ color: '#FFFF99' }}
          >
            RSVP
          </button>.
        </div>

        <div style={{ color: '#FFB3D9' }}>
          <span className="font-bold">9:00–9:30 PM</span> — Pizza arrives. Late-night Angie&apos;s — not dinner, a lifestyle.
        </div>

        <div style={{ color: '#FFB3D9' }}>
          <span className="font-bold">9:30–10:00 PM</span> — ✦ Talent Show ✦ — Performers, chaos, glory.
        </div>

        <div style={{ color: '#FFB3D9' }}>
          <span className="font-bold">10:00 PM onward</span> — Dance floor takes over. DJ Slouch brings the heat until close.
        </div>
      </div>
    </div>
  )
}
