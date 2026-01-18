import RSVPForm from '@/components/RSVPForm'
import MusicPlayer from '@/components/MusicPlayer'
import GooglyEyes from '@/components/GooglyEyes'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#DA9BD9] relative overflow-hidden">
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
        {/* Title */}
        <h1
          className="text-6xl md:text-7xl lg:text-8xl text-purple-900 mb-16 text-center"
          style={{
            fontFamily: 'Comic Sans MS, cursive',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          RSVP to my party
        </h1>

        {/* RSVP Form */}
        <div className="w-full max-w-2xl">
          <RSVPForm />
        </div>
      </div>
    </div>
  )
}
