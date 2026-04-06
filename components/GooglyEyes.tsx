'use client'

import { useEffect, useState } from 'react'

export default function GooglyEyes() {
  const [leftEyePos, setLeftEyePos] = useState({ x: 0, y: 0 })
  const [rightEyePos, setRightEyePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const moveEye = (eyeX: number, eyeY: number) => {
        const deltaX = e.clientX - eyeX
        const deltaY = e.clientY - eyeY
        const angle = Math.atan2(deltaY, deltaX)
        const distance = Math.min(15, Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 10)

        return {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
        }
      }

      setLeftEyePos(moveEye(82, 82))
      setRightEyePos(moveEye(198, 82))
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const Eye = ({ size, pupilSize, position }: { size: number; pupilSize: number; position: { x: number; y: number } }) => (
    <div
      className="rounded-full bg-white flex items-center justify-center relative"
      style={{
        width: size,
        height: size,
        border: '1px solid #000000',
        boxShadow: 'inset -3px -3px 8px rgba(0,0,0,0.3), inset 3px 3px 8px rgba(255,255,255,0.8), 2px 2px 4px rgba(0,0,0,0.2)',
        background: 'radial-gradient(circle at 30% 30%, #ffffff, #f0f0f0)'
      }}
    >
      <div
        className="rounded-full bg-black transition-transform duration-100 relative"
        style={{
          width: pupilSize,
          height: pupilSize,
          transform: `translate(${position.x}px, ${position.y}px)`,
          boxShadow: 'inset -2px -2px 4px rgba(255,255,255,0.3), 2px 2px 3px rgba(0,0,0,0.4)'
        }}
      >
        {/* Glossy highlight on pupil */}
        <div
          className="rounded-full absolute"
          style={{
            width: pupilSize * 0.3,
            height: pupilSize * 0.3,
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), transparent)',
            top: '15%',
            left: '20%',
          }}
        />
      </div>

      {/* Main glossy highlight on eye */}
      <div
        className="rounded-full absolute pointer-events-none"
        style={{
          width: size * 0.4,
          height: size * 0.4,
          background: 'radial-gradient(circle at 40% 40%, rgba(255,255,255,0.9), rgba(255,255,255,0.3) 50%, transparent 70%)',
          top: '15%',
          left: '20%',
        }}
      />
    </div>
  )

  return (
    <div className="fixed top-8 left-8 z-50" style={{ transform: 'rotate(-8deg)' }}>
      <div className="relative flex gap-4">
        <Eye size={100} pupilSize={45} position={leftEyePos} />
        <Eye size={100} pupilSize={45} position={rightEyePos} />
      </div>
    </div>
  )
}
