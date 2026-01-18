# CodeForLatvia

A minimalistic dark-themed public dashboard for displaying TikTok video comments in real-time. Built for the Latvian audience to view comments and track VIP leaderboards with a professional, glowing design aesthetic.

![CodeForLatvia](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)

## 🌟 Features

- **Auto-Load Comments**: Automatically fetches and displays comments from a configured TikTok video URL on page load
- **VIP Leaderboard**: Real-time tracking of top commenters ranked by engagement (comments + likes)
- **Live Comment Feed**: Displays comments sorted by newest first with beautiful dark theme
- **Minimalistic Dark Design**: Professional dark theme with glowing cyan/purple accents
- **Mobile Responsive**: Fully responsive design that works beautifully on all devices
- **Photo & Video Support**: Works with both TikTok video and photo post URLs
- **Real-Time Updates**: Manual refresh button to fetch latest comments

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **APIs**:
  - [TikTok Scraper API](https://rapidapi.com/) via RapidAPI - For fetching TikTok comments
  - [OpenRouter](https://openrouter.ai/) - For AI-powered comment analysis (optional, currently not used in public viewer)

## 📋 Prerequisites

- Node.js 18+ installed
- RapidAPI account with TikTok Scraper API subscription
- (Optional) OpenRouter API key for AI analysis features

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

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# RapidAPI Key for TikTok Scraper API
RAPIDAPI_KEY=your_rapidapi_key_here

# OpenRouter API Key (optional, for AI analysis features)
OPENROUTER_API_KEY=your_openrouter_api_key_here

# TikTok Video URL for Public Comment Viewer
# Set the video/photo URL you want to display comments from
NEXT_PUBLIC_VIDEO_URL=https://www.tiktok.com/@username/video/1234567890
```

**Getting API Keys:**
- **RapidAPI**: Sign up at [rapidapi.com](https://rapidapi.com/), subscribe to "TikTok Scraper" API
- **OpenRouter**: Sign up at [openrouter.ai/keys](https://openrouter.ai/keys) (optional)

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
tiktokComents/
├── app/
│   ├── api/
│   │   ├── analyze-comments/     # API route for AI comment analysis
│   │   ├── fetch-comments/       # API route to fetch TikTok comments
│   │   └── test-env/             # Test endpoint for environment variables
│   ├── components/
│   │   ├── CommentAnalysis.tsx   # Legacy component (not used in main page)
│   │   ├── CommentCard.tsx       # Reusable comment card component
│   │   ├── PublicCommentViewer.tsx  # Main public dashboard component
│   │   └── VIPLeaderboard.tsx    # VIP leaderboard component
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page (uses PublicCommentViewer)
├── .env.local                    # Environment variables (create from env.template)
├── env.template                  # Environment variables template
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

Fetches comments from a TikTok video or photo post.

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

### POST `/api/analyze-comments`

Analyzes comments using AI (OpenRouter). Currently not used in the public viewer but available for future features.

**Request Body:**
```json
{
  "comments": [...]
}
```

## 🔧 Configuration

### Video URL Configuration

Set `NEXT_PUBLIC_VIDEO_URL` in `.env.local` to configure which video's comments are displayed:

```env
NEXT_PUBLIC_VIDEO_URL=https://www.tiktok.com/@username/video/1234567890
```

The dashboard will automatically fetch and display comments from this video when users visit the page.

## 🎯 Usage

1. Configure `NEXT_PUBLIC_VIDEO_URL` in `.env.local` with your TikTok video/photo URL
2. Start the development server: `npm run dev`
3. Visit `http://localhost:3000` to see the public comment viewer
4. Comments automatically load and display in real-time
5. VIP leaderboard shows top commenters by engagement

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
| `RAPIDAPI_KEY` | RapidAPI key for TikTok Scraper API | Yes |
| `OPENROUTER_API_KEY` | OpenRouter API key for AI analysis | Optional |
| `NEXT_PUBLIC_VIDEO_URL` | TikTok video/photo URL to display | Yes |

## 🤝 Contributing

This project is part of the CodeForLatvia initiative. Contributions and suggestions are welcome!

## 📄 License

Private project - All rights reserved

## 🙏 Acknowledgments

- [TikTok Scraper API](https://rapidapi.com/) - For TikTok data access
- [OpenRouter](https://openrouter.ai/) - For AI capabilities
- Next.js and React communities

---

**Built with ❤️ for Latvia 🇱🇻**
