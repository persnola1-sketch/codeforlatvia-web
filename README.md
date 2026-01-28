# CodeForLatvia

A minimalistic dark-themed site for CodeForLatvia: landing page, featured projects, lessons (API security, TikTok experiment), and a live comment feed. Built for the Latvian audience with a professional, glowing design aesthetic.

![CodeForLatvia](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)

## 🌟 Features

- **Auto-Load Comments**: Automatically fetches and displays comments from a configured TikTok video URL on page load
- **Global Sync**: Automatically syncs comments to Supabase database with duplicate detection
- **User Tracking**: Tracks user statistics (total comments, last active) in real-time
- **API Usage Monitoring**: Tracks monthly RapidAPI request usage (200k requests/month limit) with console logging
- **Comment Replies**: Fetch replies to specific comments using the Apibox TikTok API
- **Live Comment Feed**: Displays comments (on lesson pages) sorted by newest first with dark theme
- **Minimalistic Dark Design**: Professional dark theme with glowing cyan/purple accents
- **Mobile Responsive**: Fully responsive design that works beautifully on all devices
- **Photo & Video Support**: Works with both TikTok video and photo post URLs
- **Real-Time Updates**: Manual refresh button to fetch latest comments

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: [Supabase](https://supabase.com/) - PostgreSQL database for comment storage and user tracking
- **APIs**:
  - [Apibox TikTok API](https://rapidapi.com/) via RapidAPI - For fetching TikTok comments and replies (200k requests/month limit)

## 📋 Prerequisites

- Node.js 18+ installed
- RapidAPI account with Apibox TikTok API subscription (200k requests/month limit)
- Supabase account and project (free tier available)

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd tiktokComents
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase Database

1. Create a Supabase account at [supabase.com](https://supabase.com/)
2. Create a new project
3. Go to **SQL Editor** in your Supabase dashboard
4. Run the SQL from `supabase-migrations.sql` to create the required tables:
   - `comments` - Stores all fetched comments (supports parent-child relationships for replies)
   - `users` - Tracks user statistics
   - `api_usage` - Monitors monthly RapidAPI request usage

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# RapidAPI Key for Apibox TikTok API
RAPIDAPI_KEY=your_rapidapi_key_here

# TikTok Video URL for lesson pages (CommentFeed)
# Set the video/photo URL you want to display comments from
NEXT_PUBLIC_VIDEO_URL=https://www.tiktok.com/@username/video/1234567890

# Supabase Configuration
# Get your Supabase URL and anon key from: https://supabase.com/dashboard
# Go to your project settings > API
SUPABASE_URL=your_supabase_project_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

**Getting API Keys:**
- **RapidAPI**: Sign up at [rapidapi.com](https://rapidapi.com/), subscribe to "Apibox TikTok API" (200k requests/month limit)
- **Supabase**: Sign up at [supabase.com](https://supabase.com/), create a project, get URL and anon key from Settings > API

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
tiktokComents/
├── app/
│   ├── api/
│   │   ├── count-loc/            # GET route: count lines of code (app/ + lib/)
│   │   ├── fetch-comments/       # API route to fetch TikTok comments (with Global Sync)
│   │   ├── fetch-replies/        # API route to fetch comment replies
│   │   └── test-env/             # Dev-only: test environment variables
│   ├── components/
│   │   ├── AboutProjectCard.tsx  # “Why CodeForLatvia” / stack card
│   │   ├── CommentCard.tsx       # Reusable comment card (used in CommentFeed)
│   │   ├── CommentFeed.tsx       # Live comment feed (lessons: api-security, tiktok-comments)
│   │   ├── DeveloperProfileCard.tsx  # Mentor profile (lessons sidebar)
│   │   ├── FeaturedProjects.tsx  # Featured projects grid (home + /projects)
│   │   ├── LandingHero.tsx       # Hero section (home)
│   │   ├── MobileHeader.tsx      # Mobile nav
│   │   ├── NavigationGuideCard.tsx   # “Mana Rīku Kaste” / digitalization card
│   │   ├── NavigationSidebar.tsx # Main nav (home + lessons)
│   │   ├── StatsBar.tsx          # LOC stats (home, calls /api/count-loc)
│   │   ├── StickyNewsletterCTA.tsx   # Newsletter CTA after hero (home)
│   │   ├── TechnologyBadge.tsx   # Tech pills (FeaturedProjects)
│   │   └── lesson/               # Lesson-specific (HeroSection, WarningBox, etc.)
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home (LandingHero, About, Nav, Stats, Featured, Sticky CTA)
│   ├── newsletter/page.tsx       # Newsletter signup (coming soon)
│   ├── projects/page.tsx         # Projects listing (FeaturedProjects)
│   └── lessons/
│       ├── api-security/         # API security lesson + CommentFeed
│       └── tiktok-comments/      # TikTok experiment lesson + CommentFeed
├── lib/
│   └── supabase.ts               # Supabase client initialization
├── .env.local                    # Environment variables (create from env.template)
├── env.template                  # Environment variables template
├── supabase-migrations.sql       # SQL migrations for Supabase tables
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies
├── tailwind.config.ts            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
```

## 🎨 Design Features

- **Dark Theme**: Deep dark backgrounds (`#0a0a0a` to `#1e1e1e`) for professional appearance
- **Glowing Effects**: Subtle cyan/purple glows on headers, borders, and hover states
- **Latvian Flag Colors**: Brand colors matching the Latvian flag (red `#c8102e` and white)
- **Minimalistic Layout**: Clean, uncluttered interface focused on comments and leaderboard

## 🔌 API Routes

### POST `/api/fetch-comments`

Fetches comments from a TikTok video or photo post and automatically syncs them to Supabase using the Apibox TikTok API.

**Request Body:**
```json
{
  "videoUrl": "https://www.tiktok.com/@username/video/1234567890"
}
```

**Supported URL Types:**
- Video: `https://www.tiktok.com/@username/video/1234567890`
- Photo: `https://www.tiktok.com/@username/photo/1234567890`
- Profile: `https://www.tiktok.com/@username` (fetches all videos and aggregates comments)

**Response:**
```json
{
  "success": true,
  "comments": [...],
  "total": 50,
  "videosScanned": 1,
  "isProfile": false
}
```

**Global Sync Features:**
- Automatically stores comments in Supabase `comments` table
- Tracks user statistics in `users` table (total_comments, last_active)
- Monitors RapidAPI usage in `api_usage` table (200k requests/month limit)
- Prevents duplicate comments using unique constraint (username + video_id + comment_text)
- Console logs: `[RapidAPI Usage] X/200000 requests used this month`
- Returns 429 error if monthly API limit is reached

**API Endpoint Used:**
- `https://tiktok-api23.p.rapidapi.com/api/post/comments?videoId={videoId}&count=50&cursor={cursor}`

### POST `/api/fetch-replies`

Fetches replies for a specific comment and automatically syncs them to Supabase.

**Request Body:**
```json
{
  "videoId": "1234567890",
  "commentId": "comment_id_here"
}
```

**Response:**
```json
{
  "success": true,
  "replies": [...],
  "total": 5
}
```

**Features:**
- Fetches all replies for a specific comment with pagination support
- Automatically stores replies in Supabase `comments` table
- Tracks user statistics for reply authors
- Prevents duplicate replies using unique constraint
- Respects monthly API usage limits

**API Endpoint Used:**
- `https://tiktok-api23.p.rapidapi.com/api/post/comment/replies?videoId={videoId}&commentId={commentId}&count=6&cursor={cursor}`

### GET `/api/test-env`

Test endpoint to verify environment variables are loaded correctly. **Development only** — returns 404 when `NODE_ENV !== 'development'`. Useful for local debugging.

## 🔧 Configuration

### Video URL Configuration

Set `NEXT_PUBLIC_VIDEO_URL` in `.env.local` to configure which video's comments are displayed:

```env
NEXT_PUBLIC_VIDEO_URL=https://www.tiktok.com/@username/video/1234567890
```

The dashboard will automatically fetch and display comments from this video when users visit the page.

## 🎯 Usage

1. Configure `NEXT_PUBLIC_VIDEO_URL` in `.env.local` with your TikTok video/photo URL (used on lesson pages for the live comment feed).
2. Start the development server: `npm run dev`
3. Visit `http://localhost:3000` for the home page (hero, featured projects, stats, newsletter CTA).
4. Use the sidebar to open **API Drošība** or **TikTok Eksperiments**; comments load automatically when `NEXT_PUBLIC_VIDEO_URL` is set.
5. Visit `/projects` for the full project list and `/newsletter` for the signup form (coming soon).

## 🔮 Future Plans

This project is designed to expand into **CodeForLatvia.lv** - a platform for the Latvian coding community. Future enhancements may include:

- User authentication and profiles
- Multiple video support
- Advanced analytics and insights
- Comment moderation features
- Community features and engagement tools

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `RAPIDAPI_KEY` | RapidAPI key for Apibox TikTok API | Yes |
| `SUPABASE_URL` | Supabase project URL | Yes |
| `SUPABASE_ANON_KEY` | Supabase anon/public key | Yes |
| `NEXT_PUBLIC_VIDEO_URL` | TikTok video/photo URL to display | Yes |

## 🤝 Contributing

This project is part of the CodeForLatvia initiative. Contributions and suggestions are welcome!

## 📄 License

Private project - All rights reserved

## 🙏 Acknowledgments

- [Apibox TikTok API](https://rapidapi.com/) - For TikTok data access (200k requests/month)
- [Supabase](https://supabase.com/) - For database and backend infrastructure
- Next.js and React communities

## 📝 Migration Notes

### Upgraded from TikTok Scraper API to Apibox TikTok API

This project was upgraded from the old TikTok Scraper API (300 requests/day) to the Apibox TikTok API (200k requests/month). Key changes:

- **API Endpoints**: Changed from URL-based to videoId-based endpoints
- **Request Tracking**: Changed from daily to monthly tracking
- **New Features**: Added support for fetching comment replies
- **Database Schema**: Updated `api_usage` table to track monthly usage, added `parent_comment_id` to `comments` table for replies support

See `supabase-migrations.sql` for the updated database schema.

---

**Built with ❤️ for Latvia 🇱🇻**
