import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TikTok Comment Brain',
  description: 'Analyze TikTok comments with AI-powered insights',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
