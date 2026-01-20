-- Global Sync Feature Database Schema
-- Run this SQL in your Supabase SQL Editor to create the required tables

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL,
  video_id TEXT NOT NULL,
  comment_text TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  timestamp BIGINT NOT NULL,
  parent_comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  tiktok_comment_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(username, video_id, comment_text)
);

-- Create index on video_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_comments_video_id ON comments(video_id);
CREATE INDEX IF NOT EXISTS idx_comments_username ON comments(username);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  username TEXT PRIMARY KEY,
  total_comments INTEGER DEFAULT 0,
  last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create api_usage table for tracking RapidAPI requests (monthly tracking)
CREATE TABLE IF NOT EXISTS api_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  month TEXT NOT NULL UNIQUE, -- Format: YYYY-MM (e.g., '2024-01')
  request_count INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on month for faster lookups
CREATE INDEX IF NOT EXISTS idx_api_usage_month ON api_usage(month);

-- Create index on parent_comment_id for replies lookups
CREATE INDEX IF NOT EXISTS idx_comments_parent_id ON comments(parent_comment_id);

-- Create index on tiktok_comment_id for faster lookups by TikTok comment ID
CREATE INDEX IF NOT EXISTS idx_comments_tiktok_id ON comments(video_id, tiktok_comment_id);

-- Create video_sync table for tracking API sync times (10-minute refresh interval)
CREATE TABLE IF NOT EXISTS video_sync (
  video_id TEXT PRIMARY KEY,
  last_synced_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on last_synced_at for faster lookups
CREATE INDEX IF NOT EXISTS idx_video_sync_last_synced ON video_sync(last_synced_at);