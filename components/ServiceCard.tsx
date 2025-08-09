"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, CheckCircle, Star, Users, ArrowRight, Sparkles } from "lucide-react"

interface Service {
  id: string
  name: string
  description: string
  price: string
  duration: string
  image: string
  category: string
  location: string[]
  features: string[]
}

interface ServiceCardProps {
  service: Service
}

const categoryGradients = {
  regular: "from-blue-500 to-cyan-500",
  deep: "from-purple-500 to-pink-500",
  specialized: "from-green-500 to-teal-500",
}

const categoryBgGradients = {
  regular: "from-blue-50 to-cyan-50",
  deep: "from-purple-50 to-pink-50",
  specialized: "from-green-50 to-teal-50",
}

export function ServiceCard({ service }: ServiceCardProps) {
  const gradient = categoryGradients[service.category as keyof typeof categoryGradients] || "from-gray-500 to-gray-600"
  const bgGradient =
    categoryBgGradients[service.category as keyof typeof categoryBgGradients] || "from-gray-50 to-gray-100"

  // Mock data for enhanced display
  const rating = 4.8 + Math.random() * 0.2
  const bookings = Math.floor(Math.random() * 1000) + 500

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="h-full group"
    >
      <Card className="h-full overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white relative">
        {/* Popular Badge for Deep Cleaning */}
        {service.category === "deep" && (
          <div className="absolute top-4 right-4 z-10">
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0 shadow-lg">
              <Star className="h-3 w-3 mr-1 fill-current" />
              Popular
            </Badge>
          </div>
        )}

        {/* Image Section */}
        <div className="relative overflow-hidden h-56">
          <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-90`}></div>
          <img
            src={service.image || "/placeholder.svg"}
            alt={service.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <Badge className={`bg-gradient-to-r ${gradient} text-white border-0 shadow-lg capitalize`}>
              <Sparkles className="h-3 w-3 mr-1" />
              {service.category}
            </Badge>
          </div>

          {/* Price Badge */}
          <div className="absolute bottom-4 right-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
              <div className="text-lg font-bold text-gray-900">{service.price}</div>
            </div>
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <CardContent className="p-6">
          {/* Header */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
              {service.name}
            </h3>
            <p className="text-gray-600 leading-relaxed">{service.description}</p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-gray-50 rounded-xl">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                <span className="text-sm font-semibold text-gray-900">{rating.toFixed(1)}</span>
              </div>
              <div className="text-xs text-gray-600">Rating</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Users className="h-3 w-3 text-blue-500" />
                <span className="text-sm font-semibold text-gray-900">{bookings}+</span>
              </div>
              <div className="text-xs text-gray-600">Bookings</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Clock className="h-3 w-3 text-green-500" />
                <span className="text-sm font-semibold text-gray-900">{service.duration}</span>
              </div>
              <div className="text-xs text-gray-600">Duration</div>
            </div>
          </div>

          {/* Location Info */}
          <div className="flex items-center justify-between mb-4 p-3 bg-blue-50 rounded-xl">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Available in {service.location.length} cities</span>
            </div>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3 text-sm">Service includes:</h4>
            <ul className="space-y-2">
              {service.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
              {service.features.length > 3 && (
                <li className="text-sm text-blue-600 font-medium pl-6">
                  +{service.features.length - 3} more features included
                </li>
              )}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link href={`/booking?service=${service.id}`} className="block">
              <Button
                className={`w-full py-3 font-semibold bg-gradient-to-r ${gradient} hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl group`}
              >
                Book This Service
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link href={`/services/${service.id}`} className="block">
              <Button
                variant="outline"
                className="w-full py-3 font-semibold border-2 hover:bg-gray-50 transition-all duration-300 bg-transparent group"
              >
                View Details
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </CardContent>

        {/* Hover Overlay Effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
        ></div>
      </Card>
    </motion.div>
  )
}
