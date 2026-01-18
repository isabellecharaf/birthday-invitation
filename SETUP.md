# Birthday Invitation Setup Guide - Y2K Edition! 🎉

## Quick Start

This is a Y2K/MySpace-themed birthday invitation with a working music player, googly eyes, and retro vibes!

## Supabase Setup

Follow these steps to set up your Supabase database:

### 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign up or log in
2. Click "New Project"
3. Fill in your project details:
   - Name: birthday-invitation (or any name you prefer)
   - Database Password: Create a strong password
   - Region: Choose the closest region to your location
4. Click "Create new project" and wait for it to be ready

### 2. Create the RSVPs Table

1. In your Supabase project dashboard, go to the "SQL Editor" tab
2. Click "New Query"
3. Copy and paste this SQL code:

```sql
-- Create the rsvps table
CREATE TABLE rsvps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  phone TEXT NOT NULL,
  rsvp_status TEXT NOT NULL CHECK (rsvp_status IN ('going', 'cant_go')),
  plus_ones TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert (for public RSVP form)
CREATE POLICY "Allow public inserts" ON rsvps
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create a policy that allows you to view all RSVPs (optional, for admin viewing)
CREATE POLICY "Allow authenticated reads" ON rsvps
  FOR SELECT
  TO authenticated
  USING (true);
```

4. Click "Run" to execute the query

### 3. Get Your Supabase Credentials

1. Go to "Project Settings" (gear icon in the sidebar)
2. Click on "API" in the left menu
3. You'll see two important values:
   - **Project URL**: This is your `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key**: This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. Update Environment Variables

1. Open the `.env.local` file in your project root
2. Replace the placeholder values with your actual Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 5. Add Your Images and Music

#### Teddy Bear Image
Place your teddy bear image (or any party mascot image) at:
- `public/teddy-bear.png`

The image will appear in the bottom right corner on desktop.

#### Music Player (Optional)
The music player is functional but needs actual music files. To add music:

1. Create a `public/music` folder
2. Add MP3 files for each artist (or use placeholder audio):
   - `bloc-party.mp3`
   - `blur.mp3`
   - `coldplay.mp3`
   - `enter-shikari.mp3`
   - `elc.mp3`
   - `idlewild.mp3`
   - `muse.mp3`
   - `oasis.mp3`
   - `saving-aimee.mp3`

**Note:** The player will work but show console errors if music files are missing. You can:
- Add real music files
- Use placeholder audio
- Or comment out the MusicPlayer component in `app/page.tsx` if you don't want the feature

### 6. Customize Your Title

Open `app/page.tsx` and update the main heading from "RSVP to my party" to your custom text.

### 7. Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your invitation!

### 7. View RSVPs (Optional)

To view the RSVPs that people submit:

1. Go to your Supabase project dashboard
2. Click on "Table Editor" in the sidebar
3. Select the "rsvps" table
4. You'll see all submitted RSVPs with names, phone numbers, and statuses

## Deployment

When you're ready to deploy:

1. Push your code to GitHub
2. Deploy to Vercel, Netlify, or your preferred hosting platform
3. Add the same environment variables (`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`) in your hosting platform's environment settings

## Features

- 🎨 Y2K/MySpace-inspired pink aesthetic
- 👀 Animated googly eyes that follow your cursor
- 🎵 Working music player with retro design (MySpace throwback!)
- 📝 Simple RSVP form (Going/Can't Go)
- 📞 Phone number collection
- ➕ Plus one tracking
- ✨ Y2K-style success confirmation
- 📱 Mobile-responsive design
- 🗄️ Data stored securely in Supabase
- 🧸 Cute mascot image decoration

## Troubleshooting

If RSVPs aren't submitting:
1. Check that your `.env.local` file has the correct Supabase credentials
2. Verify that the `rsvps` table was created successfully
3. Make sure Row Level Security policies are enabled
4. Check the browser console for error messages
