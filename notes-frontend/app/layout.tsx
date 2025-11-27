import './globals.css'
import Header from '../components/Header'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen w-full bg-[#F4ECD8]">
        <Header />
        <main className="w-full">
          {children}
        </main>
      </body>
    </html>
  )
}
