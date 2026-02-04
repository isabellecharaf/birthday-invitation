import RSVPForm from '@/components/RSVPForm'
import MusicPlayer from '@/components/MusicPlayer'
import GooglyEyes from '@/components/GooglyEyes'
import CursorTrail from '@/components/CursorTrail'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#31012C] relative overflow-hidden">
      {/* Cursor Trail */}
      <CursorTrail />

      {/* Googly Eyes */}
      <GooglyEyes />

      {/* Music Player */}
      <div className="fixed bottom-4 left-4 z-40">
        <MusicPlayer />
      </div>

      {/* Teddy Bear Image - Add your image to public/teddy-bear.png */}
      {/* Uncomment when you add your image:
      <div className="fixed bottom-0 right-0 z-10 hidden md:block">
        <Image
          src="/teddy-bear.png"
          alt="Party teddy"
          width={400}
          height={400}
          className="object-contain"
        />
      </div>
      */}

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Header Image */}
        <div className="mb-8">
          <Image
            src="/header.png"
            alt="Party header"
            width={400}
            height={400}
            className="object-contain"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>

        {/* Title */}
        {/* <h1
          className="text-6xl md:text-7xl lg:text-8xl mb-16 text-center"
          style={{
            color: '#FFB3D9',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}
        >
          RSVP to my party
        </h1> */}

        {/* Subheader Image */}
        <div className="mb-4">
          <Image
            src="/subheader.png"
            alt="Subheader"
            width={400}
            height={200}
            className="object-contain"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>

        {/* Save The Date Image - Links to Kilowatt Bar */}
        <a
          href="https://maps.app.goo.gl/XYXP467EgGFAYZ1x8"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-16 block"
        >
          <Image
            src="/savethedate.png"
            alt="Save The Date"
            width={400}
            height={200}
            className="object-contain hover:opacity-80 transition-opacity"
            style={{ imageRendering: 'pixelated' }}
          />
        </a>

        {/* RSVP Form */}
        <div className="w-full max-w-2xl">
          <RSVPForm />
        </div>
      </div>
    </div>
  )
}
