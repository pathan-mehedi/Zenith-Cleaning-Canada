import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/contexts/LanguageContext"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Zenith Cleaning Co. - Professional Home Cleaning Services",
  description:
    "Premium home cleaning services across Canada and Europe. Book regular, deep cleaning, and specialized services with trusted professionals.",
  keywords: "home cleaning, professional cleaning, deep cleaning, regular cleaning, Canada, Europe",
  openGraph: {
    title: "Zenith Cleaning Co. - Professional Home Cleaning Services",
    description: "Premium home cleaning services across Canada and Europe",
    images: ["/og-image.jpg"],
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          {children}
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  )
}
