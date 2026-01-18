import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const musicDir = path.join(process.cwd(), 'public', 'music')

    // Check if directory exists
    if (!fs.existsSync(musicDir)) {
      return NextResponse.json({ files: [] })
    }

    // Read all files in the music directory
    const files = fs.readdirSync(musicDir)

    // Filter for MP3 files only
    const mp3Files = files
      .filter(file => file.toLowerCase().endsWith('.mp3'))
      .map(file => ({
        name: file.replace('.mp3', ''),
        displayName: file.replace('.mp3', '').replace(/-/g, ' '),
        song: `/music/${file}`
      }))

    return NextResponse.json({ files: mp3Files })
  } catch (error) {
    console.error('Error reading music directory:', error)
    return NextResponse.json({ files: [] })
  }
}
