import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Home - Good Reading Bookstore',
  description: 'HEHEHE',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <div className="py-10 px-40">
            {children}
          </div>
        </body>
    </html>
  )
}