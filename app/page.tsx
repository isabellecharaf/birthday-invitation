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
    <div className="min-h-screen bg-[#DA6BE5] relative overflow-hidden">
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
        {/* Me with Sunglasses Image */}
        <div className="flex justify-center mb-8">
          <Image
            src="/me.png"
            alt="Isabelle with sunglasses"
            width={600}
            height={400}
            className="object-contain w-full max-w-[600px] h-auto"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>

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

          {/* Itinerary under Save The Date */}
          <div className="w-full max-w-[600px] mt-8">
            <Itinerary />
          </div>

          {/* Dress Code under Itinerary */}
          <div className="w-full max-w-[600px] mt-8">
            <DressCode />
          </div>
        </div>

        {/* Desktop-style Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto mb-12">
          {/* Talent Show - centered */}
          <div id="talent-show-section" className="w-full lg:col-span-2 max-w-2xl mx-auto">
            <TalentShowSignup />
          </div>
        </div>

        {/* RSVP Form - Separate section with more space */}
        <div className="max-w-7xl mx-auto mt-16">
          <div id="rsvp-section" className="w-full">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#FFFFFF' }}>
                if you haven&apos;t already RSVP&apos;d.... do it now &gt;:(
              </h2>
            </div>
            <div className="max-w-2xl mx-auto">
              <RSVPForm />
            </div>
          </div>
        </div>

        {/* Bottom Images - Monkey and Drink */}
        <div className="max-w-7xl mx-auto mt-16 mb-12">
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Image
              src="/monkey.png"
              alt="Monkey"
              width={400}
              height={400}
              className="object-contain w-full md:w-1/2 max-w-[400px] h-auto"
              style={{ imageRendering: 'pixelated' }}
            />
            <Image
              src="/drink.png"
              alt="Drink"
              width={400}
              height={400}
              className="object-contain w-full md:w-1/2 max-w-[400px] h-auto"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
