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

      setLeftEyePos(moveEye(150, 200))
      setRightEyePos(moveEye(280, 160))
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const Eye = ({ size, pupilSize, position }: { size: number; pupilSize: number; position: { x: number; y: number } }) => (
    <div
      className="rounded-full bg-white border-4 border-gray-300 shadow-lg flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <div
        className="rounded-full bg-black transition-transform duration-100"
        style={{
          width: pupilSize,
          height: pupilSize,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      />
    </div>
  )

  return (
    <div className="fixed top-8 left-8 z-10">
      <div className="relative">
        <div className="absolute top-8 left-0">
          <Eye size={100} pupilSize={45} position={leftEyePos} />
        </div>
        <div className="absolute top-0 left-24">
          <Eye size={120} pupilSize={55} position={rightEyePos} />
        </div>
      </div>
    </div>
  )
}
