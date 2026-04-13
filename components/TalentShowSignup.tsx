'use client'

import { useState } from 'react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export default function TalentShowSignup() {
  const [name, setName] = useState('')
  const [actTitle, setActTitle] = useState('')
  const [actDescription, setActDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
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
        .from('talent_show_signups')
        .insert([
          {
            name,
            act_title: actTitle,
            act_description: actDescription,
          }
        ])

      if (error) throw error

      setShowSuccess(true)
      setName('')
      setActTitle('')
      setActDescription('')

      setTimeout(() => {
        setShowSuccess(false)
      }, 5000)
    } catch (err) {
      setError('Failed to submit. Please try again.')
      console.error('Error submitting talent show signup:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (showSuccess) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="p-8 text-center">
          <div className="text-5xl mb-4" style={{ color: '#FFFFFF' }}>✦</div>
          <h3 className="text-2xl font-bold mb-2" style={{ color: '#FFFFFF' }}>
            you&apos;re in.
          </h3>
          <p className="text-lg" style={{ color: '#FFFFFF' }}>
            can&apos;t wait to see it
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
          TALENT SHOW
        </h2>
        <p className="text-sm md:text-base leading-relaxed" style={{ color: '#000000' }}>
          show us your dumb thing. let&apos;s rock today! 2–3 minutes. anything goes. comedy, dance, magic, a heartfelt poem about turning 30, a kazoo solo. low pressure. high stakes. maximum glory.
        </p>
      </div>

      {/* DOS Window Form */}
      <div
        style={{
          background: '#d4d4d4',
          border: '2px solid #000000',
          boxShadow: '4px 4px 0px rgba(0,0,0,0.3)',
        }}
      >
        {/* Title Bar */}
        <div
          style={{
            background: 'linear-gradient(to right, #000080, #1084d0)',
            padding: '4px 8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '2px solid #000000',
          }}
        >
          <div className="text-white text-sm font-bold">talent_show_signup.exe</div>
          <div className="flex gap-1">
            <div
              style={{
                width: '16px',
                height: '16px',
                background: '#c0c0c0',
                border: '1px solid #000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
              }}
            >
              _
            </div>
            <div
              style={{
                width: '16px',
                height: '16px',
                background: '#c0c0c0',
                border: '1px solid #000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '8px',
              }}
            >
              □
            </div>
            <div
              style={{
                width: '16px',
                height: '16px',
                background: '#c0c0c0',
                border: '1px solid #000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
              }}
            >
              ×
            </div>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name Input */}
          <div>
            <label htmlFor="talent-name" className="block text-sm font-bold mb-1" style={{ color: '#000000' }}>
              your name
            </label>
            <input
              type="text"
              id="talent-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: '100%',
                background: '#ffffff',
                border: '2px inset #808080',
                padding: '8px',
                fontSize: '14px',
                color: '#000000',
                fontFamily: 'Courier New, monospace',
              }}
            />
          </div>

          {/* Act Title Input */}
          <div>
            <label htmlFor="act-title" className="block text-sm font-bold mb-1" style={{ color: '#000000' }}>
              act title
            </label>
            <input
              type="text"
              id="act-title"
              value={actTitle}
              onChange={(e) => setActTitle(e.target.value)}
              required
              style={{
                width: '100%',
                background: '#ffffff',
                border: '2px inset #808080',
                padding: '8px',
                fontSize: '14px',
                color: '#000000',
                fontFamily: 'Courier New, monospace',
              }}
            />
          </div>

          {/* Act Description Textarea */}
          <div>
            <label htmlFor="act-description" className="block text-sm font-bold mb-1" style={{ color: '#000000' }}>
              tell me about ur talent
            </label>
            <textarea
              id="act-description"
              value={actDescription}
              onChange={(e) => setActDescription(e.target.value)}
              required
              placeholder="remember, anything goes!!!"
              rows={4}
              style={{
                width: '100%',
                background: '#ffffff',
                border: '2px inset #808080',
                padding: '8px',
                fontSize: '14px',
                color: '#000000',
                fontFamily: 'Courier New, monospace',
                resize: 'vertical',
              }}
            />
          </div>

          {error && (
            <div className="p-3 bg-red-100 border-2 border-red-400 text-sm" style={{ color: '#FF0000' }}>
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              background: isSubmitting ? '#808080' : '#c0c0c0',
              border: '2px outset #ffffff',
              padding: '10px 20px',
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#000000',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              fontFamily: 'Courier New, monospace',
            }}
          >
            {isSubmitting ? '[ SUBMITTING... ]' : '[ SIGN ME UP ]'}
          </button>
        </form>
      </div>
    </div>
  )
}
