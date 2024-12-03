import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NeoTV+ | Free AD Supported TV | FAST TV application offer live tv channels in India.',
  description: 'Neo TV+ is live tv streaming app. Watch ( FAST TV )Free tv on your Smart TV or Mobile.',
  metadataBase: new URL('https://livetv.neotvapp.com'),
  alternates: {
    canonical: 'https://livetv.neotvapp.com/',
  },
  openGraph: {
    title: 'NeoTV+ | Free AD Supported TV | FAST TV application offer live tv channels in India.',
    description: 'Neo TV+ is live tv streaming app. Watch ( FAST TV )Free tv on your Smart TV or Mobile.',
    url: 'https://livetv.neotvapp.com/',
    siteName: 'NeoTV+ | Free AD Supported TV | FAST TV application offer live tv channels in India.',
    images: [
      {
        url: 'https://neotvapp.com/wp-content/uploads/2024/09/neo-tv-banner.jpg',
        width: 1639,
        height: 765,
        type: 'image/jpeg',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NeoTV+ | Free AD Supported TV | FAST TV application offer live tv channels in India.',
    description: 'Neo TV+ is live tv streaming app. Watch ( FAST TV )Free tv on your Smart TV or Mobile.',
    images: ['https://neotvapp.com/wp-content/uploads/2024/09/neo-tv-banner.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./favicon.ico" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-32WEG1HCMW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-32WEG1HCMW');
          `}
        </Script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}