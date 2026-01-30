import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Pakalpojumi & Automatizācija | CodeForLatvia',
  description: 'AI čatboti, dokumentu automatizācija, biznesa procesu optimizācija Latvijas uzņēmumiem. Caurspīdīgas cenas no €200. LIAA granta konsultācija iekļauta.',
  keywords: [
    'AI pakalpojumi Latvija',
    'biznesa automatizācija',
    'čatboti latviski',
    'dokumentu automatizācija',
    'LIAA digitalizācijas grants',
    'AI risinājumi MVU',
    'procesu optimizācija',
  ],
  openGraph: {
    title: 'AI Pakalpojumi & Automatizācija | CodeForLatvia',
    description: 'Digitalizējiet savu biznesu ar AI. Automatizējiet ikdienas uzdevumus, ietaupiet laiku un naudu. Caurspīdīgas cenas, Latvijas uzņēmums.',
    url: 'https://codeforlatvia.lv/pakalpojumi',
    siteName: 'CodeForLatvia',
    locale: 'lv_LV',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Pakalpojumi & Automatizācija | CodeForLatvia',
    description: 'Digitalizējiet savu biznesu ar AI. Caurspīdīgas cenas no €200. LIAA granta palīdzība.',
  },
  alternates: {
    canonical: 'https://codeforlatvia.lv/pakalpojumi',
  },
};

export default function PakalpojumiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
