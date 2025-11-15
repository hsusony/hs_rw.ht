import './globals.css'
import { Inter, Cairo } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })
const cairo = Cairo({ 
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata = {
  title: 'NINESOFT - نظام إدارة الفنادق',
  description: 'نظام متكامل لإدارة الفنادق والحجوزات',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className={cairo.className}>
        <Toaster />
        {children}
      </body>
    </html>
  )
}
