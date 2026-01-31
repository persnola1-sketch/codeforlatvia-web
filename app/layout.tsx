import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CodeForLatvia | AI Automatizācija & Digitalizācija',
  description: 'AI risinājumi un biznesa automatizācija Latvijas uzņēmumiem. Čatboti, dokumentu automatizācija, procesu digitalizācija. Caurspīdīgas cenas, lokāla komanda.',
  keywords: ['AI', 'automatizācija', 'Latvija', 'digitalizācija', 'čatboti', 'biznesa automatizācija', 'LIAA grants'],
  authors: [{ name: 'CodeForLatvia' }],
  openGraph: {
    title: 'CodeForLatvia | AI Automatizācija & Digitalizācija',
    description: 'AI risinājumi un biznesa automatizācija Latvijas uzņēmumiem. Caurspīdīgas cenas, lokāla komanda.',
    url: 'https://codeforlatvia.lv',
    siteName: 'CodeForLatvia',
    locale: 'lv_LV',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CodeForLatvia | AI Automatizācija',
    description: 'AI risinājumi un biznesa automatizācija Latvijas uzņēmumiem.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
