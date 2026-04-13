'use client'

export default function Itinerary() {
  const scrollToRSVP = () => {
    const rsvpSection = document.getElementById('rsvp-section')
    if (rsvpSection) {
      rsvpSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToTalentShow = () => {
    const talentSection = document.getElementById('talent-show-section')
    if (talentSection) {
      talentSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="w-full mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center" style={{ color: '#FFFFFF' }}>
        ITINERARY
      </h2>

      <div className="space-y-4">
        <div style={{ color: '#000000' }}>
          <span className="font-bold">7:30 PM</span> — Doors open. There WILL be a bouncer, so make sure you{' '}
          <button
            onClick={scrollToRSVP}
            className="underline hover:opacity-80 transition-opacity"
            style={{ color: '#0000EE' }}
          >
            RSVP
          </button>.
        </div>

        <div style={{ color: '#000000' }}>
          <span className="font-bold">9:00–9:30 PM</span> — Pizza arrives. Late-night Angie&apos;s — not dinner, a lifestyle.
        </div>

        <div style={{ color: '#000000' }}>
          <span className="font-bold">9:30–10:00 PM</span> — ✦ Talent Show ✦ — show us your dumb thing. let&apos;s rock today! Want to perform?{' '}
          <button
            onClick={scrollToTalentShow}
            className="underline hover:opacity-80 transition-opacity"
            style={{ color: '#0000EE' }}
          >
            Sign up here
          </button>.
        </div>

        <div style={{ color: '#000000' }}>
          <span className="font-bold">10:00 PM onward</span> — Dance floor takes over. DJ Slouch brings the heat until close.
        </div>
      </div>
    </div>
  )
}
