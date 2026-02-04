'use client'

import { useState } from 'react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

type RSVPStatus = 'going' | 'cant_go'

export default function RSVPForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [plusOnes, setPlusOnes] = useState('')
  const [rsvpStatus, setRsvpStatus] = useState<RSVPStatus>('going')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isSupabaseConfigured()) {
      setError('Supabase is not configured. Please check SETUP.md for instructions.')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const { error } = await supabase
        .from('rsvps')
        .insert([
          {
            name,
            phone,
            rsvp_status: rsvpStatus,
            plus_ones: plusOnes,
          }
        ])

      if (error) throw error

      setShowConfirmation(true)
      setName('')
      setPhone('')
      setPlusOnes('')
      setRsvpStatus('going')

      setTimeout(() => {
        setShowConfirmation(false)
      }, 5000)
    } catch (err) {
      setError('Failed to submit RSVP. Please try again.')
      console.error('Error submitting RSVP:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (showConfirmation) {
    return (
      <div className="w-full max-w-lg mx-auto p-8 text-center">
        <div className="text-6xl mb-4">★ﾟ.*･｡ﾟ</div>
        {rsvpStatus === 'going' ? (
          <>
            <h3 className="text-3xl font-bold mb-2" style={{ color: '#FFB3D9' }}>
              OMG thank u!!!
            </h3>
            <p className="text-lg" style={{ color: '#FFB3D9' }}>Your RSVP has been submitted! See u there! ♥</p>
          </>
        ) : (
          <>
            <h3 className="text-3xl font-bold mb-2" style={{ color: '#FFB3D9' }}>
              bummer!
            </h3>
            <p className="text-lg" style={{ color: '#FFB3D9' }}>lmk if you change your mind &lt;3 ily</p>
          </>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto space-y-4">
      {/* RSVP Status Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={() => setRsvpStatus('going')}
          style={{
            background: rsvpStatus === 'going' ? '#014B49' : '#012A29',
            border: '1px solid #013635',
            borderRadius: '8px',
            padding: '12px 20px',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#ffffff',
            boxShadow: rsvpStatus === 'going'
              ? 'inset -2px -2px 0px rgba(0,0,0,0.3), inset 2px 2px 0px rgba(255,255,255,0.2)'
              : 'inset -3px -3px 0px rgba(0,0,0,0.4), inset 3px 3px 0px rgba(255,255,255,0.3)',
            textShadow: '1px 1px 0px rgba(0,0,0,0.3)',
            transition: 'all 0.1s',
            cursor: 'pointer',
            flex: 1,
            imageRendering: 'pixelated' as const,
            opacity: rsvpStatus === 'going' ? 1 : 0.4,
          }}
          className="hover:translate-y-[1px]"
        >
          Yes, I&apos;ll be there! :-)
        </button>
        <button
          type="button"
          onClick={() => setRsvpStatus('cant_go')}
          style={{
            background: rsvpStatus === 'cant_go' ? '#6B2B29' : '#4B1B19',
            border: '1px solid #5B2321',
            borderRadius: '8px',
            padding: '12px 20px',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#ffffff',
            boxShadow: rsvpStatus === 'cant_go'
              ? 'inset -2px -2px 0px rgba(0,0,0,0.3), inset 2px 2px 0px rgba(255,255,255,0.2)'
              : 'inset -3px -3px 0px rgba(0,0,0,0.4), inset 3px 3px 0px rgba(255,255,255,0.3)',
            textShadow: '1px 1px 0px rgba(0,0,0,0.3)',
            transition: 'all 0.1s',
            cursor: 'pointer',
            flex: 1,
            imageRendering: 'pixelated' as const,
            opacity: rsvpStatus === 'cant_go' ? 1 : 0.4,
          }}
          className="hover:translate-y-[1px]"
        >
          NO sry can&apos;t make it :(
        </button>
      </div>

      {/* Name Input */}
      <div>
        <label htmlFor="name" className="block text-xs font-bold mb-1" style={{ color: '#FFB3D9' }}>
          Your name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={(e) => e.currentTarget.style.borderBottom = '2px solid #000000'}
          onBlur={(e) => e.currentTarget.style.borderBottom = '1px solid #000000'}
          required
          style={{
            width: '100%',
            background: '#ffffff',
            border: '1px solid #000000',
            borderRadius: '8px',
            padding: '10px 14px',
            fontSize: '14px',
            color: '#000000',
            outline: 'none',
            boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.1)',
            imageRendering: 'pixelated' as const,
            transition: 'border-bottom 0.1s, box-shadow 0.1s'
          }}
          placeholder="Your name here!"
        />
      </div>

      {/* Phone Number Input */}
      <div>
        <label htmlFor="phone" className="block text-xs font-bold mb-1" style={{ color: '#FFB3D9' }}>
          Phone number
        </label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onFocus={(e) => e.currentTarget.style.borderBottom = '2px solid #000000'}
          onBlur={(e) => e.currentTarget.style.borderBottom = '1px solid #000000'}
          required
          style={{
            width: '100%',
            background: '#ffffff',
            border: '1px solid #000000',
            borderRadius: '8px',
            padding: '10px 14px',
            fontSize: '14px',
            color: '#000000',
            outline: 'none',
            boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.1)',
            imageRendering: 'pixelated' as const,
            transition: 'border-bottom 0.1s, box-shadow 0.1s'
          }}
          placeholder="1+ 000 000 0000"
        />
      </div>

      {/* Plus Ones Input */}
      <div>
        <label htmlFor="plusOnes" className="block text-xs font-bold mb-1" style={{ color: '#FFB3D9' }}>
          Bringing a plus 1? Plus 2?!?! If yes, say how many
        </label>
        <textarea
          id="plusOnes"
          value={plusOnes}
          onChange={(e) => setPlusOnes(e.target.value)}
          onFocus={(e) => e.currentTarget.style.borderBottom = '2px solid #000000'}
          onBlur={(e) => e.currentTarget.style.borderBottom = '1px solid #000000'}
          style={{
            width: '100%',
            background: '#ffffff',
            border: '1px solid #000000',
            borderRadius: '8px',
            padding: '10px 14px',
            fontSize: '14px',
            color: '#000000',
            outline: 'none',
            boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.1)',
            imageRendering: 'pixelated' as const,
            height: '60px',
            resize: 'none' as const,
            transition: 'border-bottom 0.1s, box-shadow 0.1s'
          }}
          placeholder="I'm bringing everyone I know!!!!"
        />
      </div>

      {error && (
        <div className="p-3 bg-red-100 border-2 border-red-400 text-sm" style={{ color: '#FF6B9D' }}>
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          width: '100%',
          background: isSubmitting ? '#b8b8b8' : '#d4d4d4',
          border: '1px solid #000000',
          borderRadius: '8px',
          padding: '12px 24px',
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#000000',
          boxShadow: isSubmitting
            ? 'inset -2px -2px 0px rgba(0,0,0,0.3), inset 2px 2px 0px rgba(255,255,255,0.5)'
            : 'inset -3px -3px 0px rgba(0,0,0,0.4), inset 3px 3px 0px rgba(255,255,255,0.7)',
          textShadow: '1px 1px 0px rgba(0,0,0,0.1)',
          transition: 'all 0.1s',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          opacity: isSubmitting ? 0.7 : 1,
          imageRendering: 'pixelated' as const,
        }}
        className="hover:translate-y-[1px]"
      >
        {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
      </button>
    </form>
  )
}
