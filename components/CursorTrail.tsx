'use client'

import { useEffect, useState } from 'react'

interface Trail {
  x: number
  y: number
  id: number
}

export default function CursorTrail() {
  const [trails, setTrails] = useState<Trail[]>([])

  useEffect(() => {
    let trailId = 0

    const handleMouseMove = (e: MouseEvent) => {
      const newTrail: Trail = {
        x: e.clientX,
        y: e.clientY,
        id: trailId++
      }

      setTrails((prevTrails) => {
        const updated = [...prevTrails, newTrail]
        // Keep only last 8 trail dots
        return updated.slice(-8)
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {trails.map((trail, index) => {
        const age = trails.length - index
        const opacity = 1 - (age / trails.length)

        return (
          <div
            key={trail.id}
            style={{
              position: 'fixed',
              left: trail.x,
              top: trail.y,
              width: '20px',
              height: '20px',
              transform: 'translate(0, 0)',
              opacity: opacity * 0.6,
              pointerEvents: 'none',
              transition: 'opacity 0.2s ease-out',
            }}
          >
            {/* SVG cursor arrow */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ imageRendering: 'pixelated' }}
            >
              <path
                d="M0 0 L0 16 L5 11 L8 18 L10 17 L7 10 L13 10 L0 0Z"
                fill="white"
                stroke="black"
                strokeWidth="1"
              />
            </svg>
          </div>
        )
      })}
    </div>
  )
}
