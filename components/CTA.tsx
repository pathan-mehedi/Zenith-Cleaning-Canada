"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"
import { Phone, Calendar } from "lucide-react"

export function CTA() {
  const { t } = useLanguage()

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for a Spotless Home?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Book your cleaning service today and experience the Zenith difference. Professional, reliable, and
            guaranteed satisfaction.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                <Calendar className="h-5 w-5 mr-2" />
                {t("hero.cta")}
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call Now: +1 (555) 123-4567
            </Button>
          </div>

          <div className="mt-8 text-sm opacity-75">
            <p>Available 7 days a week • Same-day booking available • 100% satisfaction guaranteed</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
