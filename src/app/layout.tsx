import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kiza — The Care Membership for the Global African Family',
  description: 'Reliable, affordable health coverage for your family back home. Delivered with care, verified by technology.',
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
