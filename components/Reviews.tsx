"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const reviews = [
  {
    name: "Sarah Johnson",
    location: "Toronto, ON",
    rating: 5,
    text: "Absolutely fantastic service! The team was professional, thorough, and left my home spotless. I've been using Zenith for 6 months now and couldn't be happier.",
    avatar: "/woman-profile.png",
  },
  {
    name: "Michel Dubois",
    location: "Paris, FR",
    rating: 5,
    text: "Service exceptionnel! L'équipe est très professionnelle et attentive aux détails. Ma maison n'a jamais été aussi propre. Je recommande vivement!",
    avatar: "/man-profile.png",
  },
  {
    name: "Emma Thompson",
    location: "Vancouver, BC",
    rating: 5,
    text: "I was skeptical about hiring a cleaning service, but Zenith exceeded all my expectations. They use eco-friendly products and are incredibly reliable.",
    avatar: "/woman-profile-photo-2.png",
  },
  {
    name: "James Wilson",
    location: "Montreal, QC",
    rating: 5,
    text: "Great value for money! The deep cleaning service was thorough and the staff was very friendly. Booking was easy and they arrived right on time.",
    avatar: "/man-profile-photo-2.png",
  },
  {
    name: "Sophie Martin",
    location: "Lyon, FR",
    rating: 5,
    text: "Un service de qualité exceptionnelle! L'équipe est ponctuelle, efficace et très respectueuse. Je n'hésite pas à les recommander à tous mes amis.",
    avatar: "/woman-profile-photo-3.png",
  },
  {
    name: "David Chen",
    location: "Calgary, AB",
    rating: 5,
    text: "Outstanding service! They helped me with a move-out cleaning and did an incredible job. The landlord was impressed and I got my full deposit back.",
    avatar: "/man-profile-photo-3.png",
  },
]

export function Reviews() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
          <div className="flex items-center justify-center mt-6">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="ml-2 text-lg font-semibold">4.9/5</span>
            <span className="ml-2 text-gray-600">(2,500+ reviews)</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full shadow-lg border-0 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-1 mb-6">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-gray-700 mb-8 italic text-lg leading-relaxed">"{review.text}"</p>

                  <div className="flex items-center space-x-4">
                    <img
                      src={review.avatar || "/placeholder.svg"}
                      alt={review.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
                    />
                    <div>
                      <div className="font-semibold text-gray-900 text-lg">{review.name}</div>
                      <div className="text-sm text-gray-600 font-medium">{review.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
