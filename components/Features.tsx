"use client"

import { motion } from "framer-motion"
import { Shield, Clock, Star, Users, Leaf, Phone } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Insured & Bonded",
    description: "All our cleaners are fully insured and bonded for your peace of mind",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer support for all your cleaning needs",
  },
  {
    icon: Star,
    title: "Quality Guarantee",
    description: "100% satisfaction guarantee or we'll return to make it right",
  },
  {
    icon: Users,
    title: "Trained Professionals",
    description: "Background-checked and professionally trained cleaning experts",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "Safe, non-toxic cleaning products that are gentle on your family",
  },
  {
    icon: Phone,
    title: "Easy Booking",
    description: "Book online in minutes or call us for immediate assistance",
  },
]

export function Features() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Zenith Cleaning?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're committed to providing the highest quality cleaning services with complete peace of mind
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
