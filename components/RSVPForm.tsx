'use client'

import { useState } from 'react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

type RSVPStatus = 'going' | 'cant_go'

export default function RSVPForm() {
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
            phone,
            rsvp_status: rsvpStatus,
            plus_ones: plusOnes,
          }
        ])

      if (error) throw error

      setShowConfirmation(true)
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
      <div className="w-full max-w-lg mx-auto bg-white/90 backdrop-blur-sm border-4 border-black rounded-lg p-8 text-center shadow-2xl">
        <div className="text-6xl mb-4">★ﾟ.*･｡ﾟ</div>
        <h3 className="text-3xl font-bold text-purple-600 mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          OMG thank u!!!
        </h3>
        <p className="text-lg text-gray-700">Your RSVP has been submitted! See u there! ♥</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto space-y-4">
      {/* RSVP Status Buttons */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setRsvpStatus('going')}
          className={`flex-1 py-3 px-6 font-bold text-sm transition-all border-2 border-black ${
            rsvpStatus === 'going'
              ? 'bg-green-800 text-white'
              : 'bg-green-700 text-white hover:bg-green-800'
          }`}
        >
          Yes, I&apos;ll be there! :-)
        </button>
        <button
          type="button"
          onClick={() => setRsvpStatus('cant_go')}
          className={`flex-1 py-3 px-6 font-bold text-sm transition-all border-2 border-black ${
            rsvpStatus === 'cant_go'
              ? 'bg-gray-900 text-white'
              : 'bg-gray-800 text-white hover:bg-gray-900'
          }`}
        >
          NO sry can&apos;t make it :(
        </button>
      </div>

      {/* Phone Number Input */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
          Phone number
        </label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="w-full px-4 py-3 border-2 border-gray-300 focus:border-purple-500 focus:outline-none text-gray-600"
          placeholder="1+ 000 000 0000"
        />
      </div>

      {/* Plus Ones Input */}
      <div>
        <label htmlFor="plusOnes" className="block text-sm font-medium text-gray-900 mb-2">
          Bringing a plus 1? Plus 2?!?! If yes, say how many
        </label>
        <textarea
          id="plusOnes"
          value={plusOnes}
          onChange={(e) => setPlusOnes(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-300 focus:border-purple-500 focus:outline-none text-gray-600 h-20 resize-none"
          placeholder="I'm bringing everyone I know!!!!"
        />
      </div>

      {error && (
        <div className="p-3 bg-red-100 border-2 border-red-400 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gray-900 text-white font-bold py-4 px-6 border-2 border-black hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
      </button>
    </form>
  )
}
