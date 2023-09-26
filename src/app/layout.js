import Header from './components/Header'
import Wrapper from './components/Wrapper'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Hygee',
  description: 'website Hygee',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Wrapper>
          <Header />
          {children}
        </Wrapper>
      </body>
    </html>
  )
}
