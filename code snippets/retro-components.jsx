import React, { useState } from 'react';

export default function RetroBitmapComponents() {
  const [email, setEmail] = useState('');
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#c0c0c0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '60px',
      padding: '40px',
      fontFamily: '"Courier New", Courier, monospace',
      imageRendering: 'pixelated'
    }}>
      {/* Visit Vacation Button */}
      <button
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
        onClick={() => window.open('#', '_blank')}
        style={{
          position: 'relative',
          background: isButtonHovered ? '#b8b8b8' : '#d4d4d4',
          border: '2px solid #000000',
          borderRadius: '12px',
          padding: '28px 48px',
          cursor: 'pointer',
          fontSize: '48px',
          fontWeight: 'bold',
          fontFamily: '"Press Start 2P", "Courier New", monospace',
          color: '#000000',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          transition: 'all 0.1s',
          boxShadow: isButtonHovered 
            ? 'inset -3px -3px 0px rgba(0,0,0,0.3), inset 3px 3px 0px rgba(255,255,255,0.5)'
            : 'inset -4px -4px 0px rgba(0,0,0,0.4), inset 4px 4px 0px rgba(255,255,255,0.7)',
          textShadow: '2px 2px 0px rgba(0,0,0,0.1)',
          letterSpacing: '2px',
          textRendering: 'geometricPrecision',
          WebkitFontSmoothing: 'none',
          MozOsxFontSmoothing: 'grayscale',
          transform: isButtonHovered ? 'translateY(2px)' : 'translateY(0)',
        }}
      >
        {/* External Link Icon */}
        <svg 
          width="48" 
          height="48" 
          viewBox="0 0 24 24" 
          fill="none"
          style={{
            imageRendering: 'pixelated',
            shapeRendering: 'crispEdges'
          }}
        >
          <rect x="2" y="2" width="20" height="20" stroke="#000000" strokeWidth="1.5" fill="none"/>
          <path d="M14 2L22 2L22 10" stroke="#000000" strokeWidth="1.5" strokeLinecap="square"/>
          <line x1="22" y1="2" x2="12" y2="12" stroke="#000000" strokeWidth="1.5" strokeLinecap="square"/>
        </svg>
        
        <span style={{
          position: 'relative',
          top: '2px'
        }}>
          Visit Vacation
        </span>
      </button>

      {/* Email Input Field */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '600px'
      }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          placeholder="Enter email address"
          style={{
            width: '100%',
            background: '#ffffff',
            border: '2px solid #000000',
            borderBottom: isInputFocused ? '3px solid #000000' : '2px solid #000000',
            borderRadius: '12px',
            padding: '20px 24px',
            fontSize: '28px',
            fontFamily: '"Press Start 2P", "Courier New", monospace',
            color: '#000000',
            letterSpacing: '1px',
            outline: 'none',
            boxShadow: isInputFocused 
              ? 'inset 2px 2px 4px rgba(0,0,0,0.2)' 
              : 'inset 1px 1px 2px rgba(0,0,0,0.1)',
            WebkitFontSmoothing: 'none',
            MozOsxFontSmoothing: 'grayscale',
            imageRendering: 'pixelated',
            transition: 'border-bottom 0.1s, box-shadow 0.1s'
          }}
          className="bitmap-input"
        />
        <style>{`
          .bitmap-input::placeholder {
            color: #a0a0a0;
            opacity: 1;
            font-family: "Press Start 2P", "Courier New", monospace;
            letter-spacing: 1px;
          }
          
          @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        `}</style>
      </div>

      {/* Decorative pixel border */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '8px',
        background: '#000000',
        zIndex: 1000
      }}/>
      
      {/* Info text */}
      <div style={{
        fontSize: '16px',
        fontFamily: '"Press Start 2P", monospace',
        color: '#000000',
        textAlign: 'center',
        lineHeight: '1.8',
        maxWidth: '600px',
        letterSpacing: '1px'
      }}>
        Retro Bitmap UI Components
      </div>
    </div>
  );
}
