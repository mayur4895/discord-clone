import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { cn } from '@/lib/utils'
import ModalProvider from '@/components/providers/modal-provider'
import { SocketProvider } from '@/components/providers/socket-provider'

const font = Poppins({ weight: ['200', '300', '400', '500', '600', '700', '800', '900'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Discord clone',
  description: 'clone created by mayur',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning >
        <body className={cn(
          font.className,
          "bg-white dark:bg-[#222325]"
        )}>

          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="discord-theme"
          >


            <SocketProvider>
              <ModalProvider />

              {children}
            </SocketProvider>
          </ThemeProvider>

        </body>
      </html>
    </ClerkProvider>
  )
}
