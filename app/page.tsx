import RSVPForm from '@/components/RSVPForm'
import MusicPlayer from '@/components/MusicPlayer'
import GooglyEyes from '@/components/GooglyEyes'
import TalentShowSignup from '@/components/TalentShowSignup'
import Itinerary from '@/components/Itinerary'
import DressCode from '@/components/DressCode'
import ImageMarquee from '@/components/ImageMarquee'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#31012C] relative overflow-hidden">
      {/* Googly Eyes - Hidden on mobile */}
      <div className="hidden md:block z-50">
        <GooglyEyes />
      </div>

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
      <div className="relative z-20 min-h-screen px-4 sm:px-6 py-8">
        {/* Marquee Section */}
        <ImageMarquee />

        {/* Header Section - Centered */}
        <div className="flex flex-col items-center mb-12">
          <div className="mb-4 w-full max-w-[300px]">
            <Image
              src="/subheader.png"
              alt="Subheader"
              width={400}
              height={200}
              className="object-contain w-full h-auto"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>

          <a
            href="https://maps.app.goo.gl/XYXP467EgGFAYZ1x8"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full max-w-[300px]"
          >
            <Image
              src="/savethedate.png"
              alt="Save The Date"
              width={400}
              height={200}
              className="object-contain w-full h-auto hover:opacity-80 transition-opacity"
              style={{ imageRendering: 'pixelated' }}
            />
          </a>
        </div>

        {/* Desktop-style Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto mb-12">
          {/* Top Left: Talent Show */}
          <div className="w-full">
            <TalentShowSignup />
          </div>

          {/* Top Right: Itinerary + Dress Code */}
          <div className="w-full space-y-12">
            <Itinerary />
            <DressCode />
          </div>
        </div>

        {/* RSVP Form - Separate section with more space */}
        <div className="max-w-7xl mx-auto mt-16">
          <div id="rsvp-section" className="w-full">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#FFB3D9' }}>
                if you haven&apos;t already RSVP&apos;d.... do it now &gt;:(
              </h2>
            </div>
            <div className="max-w-2xl mx-auto">
              <RSVPForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
