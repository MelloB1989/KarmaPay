import { Inter } from 'next/font/google'
import './globals.css'
import { logo_url } from '../config'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: 'https://noobsverse-internal.s3.ap-south-1.amazonaws.com/karmapay-removebg-preview.png',
  title: 'KarmaPay',
  description: 'KarmaPay is an open-source project that aims to simplify online payments by providing a unified API endpoint for multiple payment gateways. It abstracts the complexities of integration, allowing developers to seamlessly work with various payment providers while maintaining a single, consistent interface.',
  openGraph: {
    images: logo_url,
  },
  icon: logo_url
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
      <link rel="icon" href={logo_url} />
    </head>
      <body className={inter.className}>{children}</body>
      <ToastContainer/>
    </html>
  )
}