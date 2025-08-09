"use client"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { BookingForm } from "@/components/BookingForm"
import { PricingCalculator } from "@/components/PricingCalculator"
import { useLanguage } from "@/contexts/LanguageContext"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Calendar } from "lucide-react"

export default function BookingPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-6 px-4 py-2 bg-green-100 text-green-700 border-green-200">
              <Calendar className="h-4 w-4 mr-2" />
              Easy Booking Process
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Book Your Perfect
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block">
                Cleaning Service
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              Select your service, choose your date and time, and get an instant quote. Professional cleaning made
              simple and convenient.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <BookingForm />
            <PricingCalculator />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
