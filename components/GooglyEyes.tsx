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
      className="rounded-full bg-white flex items-center justify-center"
      style={{
        width: size,
        height: size,
        border: '1px solid #000000',
        boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.1)'
      }}
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
    <div className="fixed top-8 left-8 z-10" style={{ transform: 'rotate(-8deg)' }}>
      <div className="relative flex gap-4">
        <Eye size={100} pupilSize={45} position={leftEyePos} />
        <Eye size={100} pupilSize={45} position={rightEyePos} />
      </div>
    </div>
  )
}
