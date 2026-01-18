'use client'

import { useState, useRef, useEffect } from 'react'

type Artist = {
  name: string
  displayName: string
  song: string
}

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isOpen, setIsOpen] = useState(true)
  const [artists, setArtists] = useState<Artist[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [visualizerData, setVisualizerData] = useState<number[][]>(
    Array(10).fill(0).map(() => Array(5).fill(0))
  )
  const audioRef = useRef<HTMLAudioElement>(null)

  // Fetch music files from the API
  useEffect(() => {
    fetch('/api/music')
      .then(res => res.json())
      .then(data => {
        setArtists(data.files || [])
        setIsLoading(false)
      })
      .catch(err => {
        console.error('Error loading music:', err)
        setIsLoading(false)
      })
  }, [])

  // Animate visualizer when playing
  useEffect(() => {
    if (!isPlaying) {
      // Reset to gray when not playing
      setVisualizerData(Array(10).fill(0).map(() => Array(5).fill(0)))
      return
    }

    const interval = setInterval(() => {
      setVisualizerData(
        Array(10).fill(0).map(() =>
          Array(5).fill(0).map(() => Math.random())
        )
      )
    }, 100) // Update every 100ms for smooth animation

    return () => clearInterval(interval)
  }, [isPlaying])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => {
      const value = (audio.currentTime / audio.duration) * 100
      setProgress(isNaN(value) ? 0 : value)
    }

    audio.addEventListener('timeupdate', updateProgress)
    audio.addEventListener('ended', handleNext)

    return () => {
      audio.removeEventListener('timeupdate', updateProgress)
      audio.removeEventListener('ended', handleNext)
    }
  }, [])

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
      setProgress(0)
    }
  }

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % artists.length)
    setProgress(0)
    if (isPlaying && audioRef.current) {
      setTimeout(() => audioRef.current?.play(), 100)
    }
  }

  const handlePrev = () => {
    setCurrentTrack((prev) => (prev - 1 + artists.length) % artists.length)
    setProgress(0)
    if (isPlaying && audioRef.current) {
      setTimeout(() => audioRef.current?.play(), 100)
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const bounds = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - bounds.left
    const percentage = x / bounds.width
    audio.currentTime = percentage * audio.duration
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gray-200 border-2 border-gray-400 px-4 py-2 text-sm font-bold shadow-lg hover:bg-gray-300"
        >
          Open Player
        </button>
      </div>
    )
  }

  // Show loading or empty state
  if (isLoading || artists.length === 0) {
    return (
      <div className="w-80 bg-gradient-to-b from-gray-200 to-gray-300 border-2 border-gray-400 shadow-2xl font-sans">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-2 py-1 flex justify-between items-center border-b border-gray-400">
          <div className="text-white text-xs font-bold">Music Player</div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white font-bold hover:bg-red-500 px-2"
          >
            ✕
          </button>
        </div>
        <div className="p-8 text-center text-gray-600 text-sm">
          {isLoading ? 'Loading music...' : 'No music files found. Add MP3s to public/music/'}
        </div>
      </div>
    )
  }

  const currentSong = artists[currentTrack]

  return (
    <div className="w-80 bg-gradient-to-b from-gray-200 to-gray-300 border-2 border-gray-400 shadow-2xl font-sans">
      {/* Audio element */}
      <audio ref={audioRef} src={currentSong?.song} key={currentSong?.song} />

      {/* Title bar */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-2 py-1 flex justify-between items-center border-b border-gray-400">
        <div className="flex gap-2 text-xs text-white">
          <button className="hover:underline">Hide</button>
          <button className="hover:underline">Show Playlist</button>
          <button className="hover:underline">Hide Artists</button>
          <button className="hover:underline">Options</button>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white font-bold hover:bg-red-500 px-2"
        >
          ✕
        </button>
      </div>

      {/* Main player area */}
      <div className="p-3 bg-gradient-to-b from-gray-100 to-gray-200">
        {/* Controls */}
        <div className="flex gap-1 mb-3">
          <button
            onClick={handleStop}
            className="w-8 h-8 bg-gray-300 border border-gray-500 hover:bg-gray-400 flex items-center justify-center text-xs"
            title="Stop"
          >
            ◼
          </button>
          <button
            onClick={handlePrev}
            className="w-8 h-8 bg-gray-300 border border-gray-500 hover:bg-gray-400 flex items-center justify-center"
            title="Previous"
          >
            ⏮
          </button>
          <button
            onClick={handlePause}
            className="w-8 h-8 bg-gray-300 border border-gray-500 hover:bg-gray-400 flex items-center justify-center"
            title="Pause"
          >
            ⏸
          </button>
          <button
            onClick={handlePlay}
            className="w-8 h-8 bg-green-500 border border-gray-500 hover:bg-green-600 flex items-center justify-center"
            title="Play"
          >
            ▶
          </button>
          <button
            onClick={handleNext}
            className="w-8 h-8 bg-gray-300 border border-gray-500 hover:bg-gray-400 flex items-center justify-center"
            title="Next"
          >
            ⏭
          </button>
        </div>

        {/* Now playing info */}
        <div className="bg-black text-green-400 p-2 mb-2 font-mono text-xs">
          <div className="font-bold">{currentSong.displayName}</div>
          <div>Track {currentTrack + 1} of {artists.length}</div>
        </div>

        {/* Progress bar */}
        <div
          className="h-4 bg-gray-400 border border-gray-600 cursor-pointer mb-2 relative overflow-hidden"
          onClick={handleProgressClick}
        >
          <div
            className="h-full bg-gradient-to-r from-green-400 to-blue-400 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Visualizer */}
        <div className="flex gap-1 justify-center mb-3">
          {visualizerData.map((column, i) => (
            <div key={i} className="flex flex-col-reverse gap-1">
              {column.map((value, j) => (
                <div
                  key={j}
                  className={`w-2 h-1 transition-colors duration-100 ${
                    isPlaying && value > 0.5
                      ? j < 2
                        ? 'bg-green-500'
                        : j < 4
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                      : 'bg-gray-500'
                  }`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Playlist section */}
      <div className="border-t-2 border-gray-400">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-2 py-1">
          <div className="text-white text-xs font-bold">Favourite Artists</div>
        </div>
        <div className="bg-white max-h-40 overflow-y-auto">
          {artists.map((artist, index) => (
            <div
              key={artist.name}
              onClick={() => {
                setCurrentTrack(index)
                if (isPlaying) {
                  setTimeout(() => audioRef.current?.play(), 100)
                }
              }}
              className={`px-2 py-1 text-sm cursor-pointer hover:bg-blue-200 ${
                currentTrack === index ? 'bg-blue-300 font-bold' : ''
              }`}
            >
              {artist.displayName}
            </div>
          ))}
        </div>
        <div className="bg-gray-200 border-t border-gray-400 p-2 text-center">
          <button className="text-xs underline text-blue-600 hover:text-blue-800">
            Open
          </button>
        </div>
      </div>
    </div>
  )
}
