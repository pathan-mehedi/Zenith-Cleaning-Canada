"use client"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Hero } from "@/components/Hero"
import { Services } from "@/components/Services"
import { Features } from "@/components/Features"
import { Reviews } from "@/components/Reviews"
import { ClientLogos } from "@/components/ClientLogos"
import { CTA } from "@/components/CTA"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <Features />
        <Reviews />
        <ClientLogos />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
