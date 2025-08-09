"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Building2, Star, Users, Award } from "lucide-react"

const clientLogos = [
  {
    name: "Luxury Condos Toronto",
    logo: "/client-luxury-condos.png",
    type: "Residential Complex",
  },
  {
    name: "Marriott Hotels",
    logo: "/client-marriott.png",
    type: "Hospitality",
  },
  {
    name: "WeWork Spaces",
    logo: "/client-wework.png",
    type: "Co-working",
  },
  {
    name: "Royal Bank Plaza",
    logo: "/client-royal-bank.png",
    type: "Corporate",
  },
  {
    name: "Airbnb Properties",
    logo: "/client-airbnb.png",
    type: "Short-term Rentals",
  },
  {
    name: "Four Seasons",
    logo: "/client-four-seasons.png",
    type: "Luxury Hotels",
  },
]

const achievements = [
  {
    icon: Building2,
    number: "500+",
    label: "Corporate Clients",
    description: "Trusted by leading businesses",
  },
  {
    icon: Star,
    number: "4.9/5",
    label: "Client Satisfaction",
    description: "Consistently excellent ratings",
  },
  {
    icon: Users,
    number: "50,000+",
    label: "Properties Serviced",
    description: "Homes and offices cleaned",
  },
  {
    icon: Award,
    number: "15+",
    label: "Industry Awards",
    description: "Recognition for excellence",
  },
]

export function ClientLogos() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-6 px-4 py-2 bg-blue-100 text-blue-700 border-blue-200">
            Trusted by Industry Leaders
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Preferred by
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}
              Premium Brands
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From luxury hotels to corporate offices, leading organizations trust Zenith Cleaning Co. for their most
            important spaces.
          </p>
        </motion.div>

        {/* Client Logos Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {clientLogos.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mb-4 group-hover:from-blue-200 group-hover:to-indigo-200 transition-colors duration-300">
                    <img
                      src={client.logo || "/placeholder.svg"}
                      alt={client.name}
                      className="w-10 h-10 object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm text-center mb-1">{client.name}</h3>
                  <p className="text-xs text-gray-500 text-center">{client.type}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-blue-200">
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:from-blue-200 group-hover:to-indigo-200 transition-colors duration-300">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {achievement.number}
                  </div>
                  <div className="font-semibold text-gray-900 mb-1">{achievement.label}</div>
                  <div className="text-sm text-gray-600">{achievement.description}</div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Join Our Growing List of Satisfied Clients
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Experience the same level of excellence that has made us the preferred choice for premium brands and
              discerning homeowners.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/booking"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center justify-center"
              >
                Get Started Today
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 inline-flex items-center justify-center"
              >
                Request Quote
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
