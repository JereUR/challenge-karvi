import type { Metadata } from "next"
import { Raleway } from "next/font/google"

import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const raleway = Raleway({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Karvi Challenge | Jeremías Dominguez Vega",
  description: "Karvi Challenge carried out by Jeremías Dominguez Vega",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={raleway.className}
      >
        <main className="flex min-h-screen flex-col">
          <div className="flex w-full justify-around border-t bg-card py-3 sm:hidden z-50">
            Icon filter bar
          </div>
          <div className="flex w-full grow md:gap-5 p-2 md:p-5">
            <div className="sticky top-[8.25rem] flex flex-col gap-5">
              <div className="hidden h-fit flex-none space-y-3 rounded-2xl bg-card px-3 py-5 shadow-sm sm:block lg:px-5 xl:w-80 z-50">
                Filter bar
              </div>
            </div>
            {children}
            <Toaster />
          </div>
        </main>
      </body>
    </html>
  )
}
