import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { I18nProvider } from '@/i18n'

export const metadata: Metadata = {
  title: 'DENCONE GPU Cloud - High-Performance GPU Servers',
  description: 'Enterprise GPU cloud at your fingertips. Rent high-performance GPU instances starting at $0.50/hour. NVIDIA H100, A100, RTX 4090 and more.',
  keywords: ['GPU cloud', 'GPU rental', 'AI training', 'deep learning', 'NVIDIA H100', 'RTX 4090'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <I18nProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  )
}
