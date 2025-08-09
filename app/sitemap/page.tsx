"use client"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import Link from "next/link"
import { Home, Wrench, Calendar, Phone, Shield, Map } from "lucide-react"

const sitemapSections = [
  {
    title: "Main Pages",
    icon: Home,
    links: [
      { name: "Home", url: "/" },
      { name: "About Us", url: "/about" },
      { name: "Contact", url: "/contact" },
    ],
  },
  {
    title: "Services",
    icon: Wrench,
    links: [
      { name: "All Services", url: "/services" },
      { name: "Regular Cleaning", url: "/services?category=regular" },
      { name: "Deep Cleaning", url: "/services?category=deep" },
      { name: "Specialized Services", url: "/services?category=specialized" },
    ],
  },
  {
    title: "Booking & Account",
    icon: Calendar,
    links: [
      { name: "Book Service", url: "/booking" },
      { name: "Login", url: "/login" },
      { name: "Register", url: "/register" },
      { name: "Order Confirmation", url: "/confirmation" },
    ],
  },
  {
    title: "Legal & Policies",
    icon: Shield,
    links: [
      { name: "Privacy Policy", url: "/privacy-policy" },
      { name: "Terms & Conditions", url: "/terms-conditions" },
      { name: "Sitemap", url: "/sitemap" },
    ],
  },
]

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Map className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Sitemap</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find all pages and sections of Zenith Cleaning Co. website organized for easy navigation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sitemapSections.map((section, index) => {
              const Icon = section.icon
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card className="h-full shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center space-x-3 text-xl">
                        <div className="bg-blue-100 rounded-lg p-2">
                          <Icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <span>{section.title}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {section.links.map((link, linkIndex) => (
                          <li key={linkIndex}>
                            <Link
                              href={link.url}
                              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 p-2 rounded-lg hover:bg-blue-50"
                            >
                              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                              <span className="font-medium">{link.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12"
          >
            <Card className="shadow-lg border-0">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help Finding Something?</h2>
                <p className="text-gray-600 mb-6 text-lg">
                  Can't find what you're looking for? Our customer support team is here to help you navigate our
                  services.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <div className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                      <Phone className="h-5 w-5" />
                      <span className="font-semibold">Contact Support</span>
                    </div>
                  </Link>
                  <Link href="/services">
                    <div className="flex items-center space-x-2 border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-300">
                      <Wrench className="h-5 w-5" />
                      <span className="font-semibold">Browse Services</span>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
