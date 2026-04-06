'use client'

import Image from 'next/image'

export default function ImageMarquee() {
  const images = [
    '/marquee1.png',
    '/marquee2.png',
    '/marquee3.png',
  ]

  return (
    <div className="w-full overflow-hidden mb-8">
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .marquee-container {
          display: flex;
          animation: scroll 20s linear infinite;
          width: fit-content;
        }

        .marquee-container:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="flex">
        <div className="marquee-container">
          {/* First set of images */}
          {images.map((src, index) => (
            <div key={`first-${index}`} className="flex-shrink-0 px-4">
              <Image
                src={src}
                alt={`Marquee image ${index + 1}`}
                width={300}
                height={200}
                className="object-contain"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {images.map((src, index) => (
            <div key={`second-${index}`} className="flex-shrink-0 px-4">
              <Image
                src={src}
                alt={`Marquee image ${index + 1}`}
                width={300}
                height={200}
                className="object-contain"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
