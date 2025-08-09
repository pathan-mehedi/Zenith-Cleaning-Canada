"use client"

import { motion, useAnimation, useInView } from "framer-motion"
import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/LanguageContext"
import {
  Home,
  Sparkles,
  ChefHat,
  Sofa,
  AppWindowIcon as Window,
  Truck,
  Clock,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
} from "lucide-react"

// Floating cleaning elements for services section
const serviceFloatingElements = [
  { id: 1, icon: "🧽", size: "text-xl", delay: 0, duration: 5 },
  { id: 2, icon: "✨", size: "text-lg", delay: 1, duration: 4 },
  { id: 3, icon: "🫧", size: "text-xl", delay: 2, duration: 6 },
  { id: 4, icon: "💧", size: "text-sm", delay: 0.5, duration: 3.5 },
]

// Sparkle animation component for services
const ServiceSparkle = ({ delay = 0, size = "h-3 w-3" }) => (
  <motion.div
    className="absolute"
    initial={{ opacity: 0, scale: 0, rotate: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      rotate: [0, 180, 360],
      x: [0, Math.random() * 60 - 30],
      y: [0, Math.random() * 60 - 30],
    }}
    transition={{
      duration: 2.5,
      delay,
      repeat: Number.POSITIVE_INFINITY,
      repeatDelay: Math.random() * 4 + 3,
    }}
  >
    <Sparkles className={`${size} text-blue-400`} />
  </motion.div>
)

// Floating service elements
const FloatingServiceElement = ({ element, index }) => (
  <motion.div
    className={`absolute ${element.size} select-none pointer-events-none opacity-20`}
    initial={{
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: 0,
      rotate: 0,
    }}
    animate={{
      x: [Math.random() * 100, Math.random() * 200 + 50, Math.random() * 100],
      y: [Math.random() * 100, Math.random() * 200 + 50, Math.random() * 100],
      opacity: [0, 0.3, 0.5, 0.3, 0],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration: element.duration,
      delay: element.delay,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    }}
    style={{
      left: `${5 + (index % 4) * 25}%`,
      top: `${10 + Math.floor(index / 4) * 30}%`,
    }}
  >
    {element.icon}
  </motion.div>
)

// Bubble effect for services
const ServiceBubbles = () => {
  const bubbles = Array.from({ length: 6 }, (_, i) => i)

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble}
          className="absolute w-3 h-3 bg-blue-200 rounded-full opacity-20"
          initial={{
            x: Math.random() * 100 + "%",
            y: "100%",
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: "-10%",
            x: `${Math.random() * 20 - 10}%`,
          }}
          transition={{
            duration: Math.random() * 4 + 6,
            delay: Math.random() * 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}

const services = [
  {
    id: "regular",
    icon: Home,
    titleKey: "services.regular",
    description: "Consistent, reliable cleaning to maintain your home's pristine condition",
    price: "From $80",
    originalPrice: "$100",
    duration: "2-3 hours",
    image: "/home-cleaning.png",
    popular: false,
    rating: 4.9,
    bookings: "2,500+",
    features: ["Dusting & Vacuuming", "Kitchen & Bathroom", "Floor Cleaning", "Trash Removal"],
    gradient: "from-blue-500 via-cyan-400 to-blue-600",
    bgGradient: "from-blue-50 via-cyan-50 to-blue-100",
    cardGradient: "from-blue-500/10 to-cyan-500/10",
  },
  {
    id: "deep",
    icon: Sparkles,
    titleKey: "services.deep",
    description: "Comprehensive deep cleaning that reaches every corner of your home",
    price: "From $150",
    originalPrice: "$200",
    duration: "4-6 hours",
    image: "/deep-cleaning-service.png",
    popular: true,
    rating: 4.9,
    bookings: "1,800+",
    features: ["Inside Appliances", "Baseboards & Fixtures", "Cabinet Interiors", "Window Sills"],
    gradient: "from-purple-500 via-pink-400 to-indigo-600",
    bgGradient: "from-purple-50 via-pink-50 to-indigo-100",
    cardGradient: "from-purple-500/10 to-pink-500/10",
  },
  {
    id: "kitchen",
    icon: ChefHat,
    titleKey: "services.kitchen",
    description: "Specialized deep cleaning for your kitchen and bathroom spaces",
    price: "From $120",
    originalPrice: "$150",
    duration: "3-4 hours",
    image: "/kitchen-bathroom-cleaning.png",
    popular: false,
    rating: 4.8,
    bookings: "1,200+",
    features: ["Oven Deep Clean", "Tile & Grout", "Sanitization", "Fixture Polish"],
    gradient: "from-orange-500 via-red-400 to-pink-600",
    bgGradient: "from-orange-50 via-red-50 to-pink-100",
    cardGradient: "from-orange-500/10 to-red-500/10",
  },
  {
    id: "carpet",
    icon: Sofa,
    titleKey: "services.carpet",
    description: "Professional carpet and upholstery cleaning with advanced equipment",
    price: "From $100",
    originalPrice: "$130",
    duration: "2-3 hours",
    image: "/carpet-cleaning-service.png",
    popular: false,
    rating: 4.7,
    bookings: "900+",
    features: ["Steam Cleaning", "Stain Removal", "Odor Elimination", "Fabric Protection"],
    gradient: "from-green-500 via-teal-400 to-emerald-600",
    bgGradient: "from-green-50 via-teal-50 to-emerald-100",
    cardGradient: "from-green-500/10 to-teal-500/10",
  },
  {
    id: "window",
    icon: Window,
    titleKey: "services.window",
    description: "Crystal clear windows inside and out for the perfect view",
    price: "From $60",
    originalPrice: "$80",
    duration: "1-2 hours",
    image: "/window-cleaning-service.png",
    popular: false,
    rating: 4.8,
    bookings: "1,500+",
    features: ["Interior & Exterior", "Screen Cleaning", "Sill Cleaning", "Streak-Free Finish"],
    gradient: "from-sky-500 via-blue-400 to-indigo-600",
    bgGradient: "from-sky-50 via-blue-50 to-indigo-100",
    cardGradient: "from-sky-500/10 to-blue-500/10",
  },
  {
    id: "movein",
    icon: Truck,
    titleKey: "services.movein",
    description: "Complete cleaning service perfect for moving in or out",
    price: "From $200",
    originalPrice: "$250",
    duration: "5-8 hours",
    image: "/move-in-out-cleaning.png",
    popular: false,
    rating: 4.9,
    bookings: "800+",
    features: ["Complete Deep Clean", "Inside Cabinets", "Appliance Cleaning", "Wall Washing"],
    gradient: "from-indigo-500 via-purple-400 to-violet-600",
    bgGradient: "from-indigo-50 via-purple-50 to-violet-100",
    cardGradient: "from-indigo-500/10 to-purple-500/10",
  },
]

export function Services() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Animated Background Elements - Matching Hero */}
      <motion.div
        className="absolute top-10 left-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-15"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-40 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-15"
        animate={{
          scale: [1, 0.8, 1.1, 1],
          x: [0, -40, 20, 0],
          y: [0, 40, -20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="absolute bottom-10 left-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-15"
        animate={{
          scale: [1, 1.3, 0.9, 1],
          x: [0, 30, -10, 0],
          y: [0, -50, 20, 0],
        }}
        transition={{
          duration: 14,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Floating Service Elements */}
      {serviceFloatingElements.map((element, index) => (
        <FloatingServiceElement key={element.id} element={element} index={index} />
      ))}

      {/* Service Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <ServiceSparkle delay={Math.random() * 4} />
          </div>
        ))}
      </div>

      {/* Service Bubbles */}
      <ServiceBubbles />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Badge className="mb-6 px-4 py-2 bg-blue-100 text-blue-700 border-blue-200 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 4,
                }}
              />
              <Sparkles className="h-4 w-4 mr-2 relative z-10" />
              <span className="relative z-10">Premium Services</span>
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            <motion.span
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
              className="bg-gradient-to-r from-gray-900 via-blue-600 to-gray-900 bg-clip-text text-transparent"
            >
              Choose Your Perfect
            </motion.span>
            <motion.span
              className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block relative"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              Cleaning Solution
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                ✨
              </motion.div>
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            From regular maintenance to specialized deep cleaning, our comprehensive services are designed to meet every
            home cleaning need with professional excellence.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={controls}
                variants={{
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="group relative"
              >
                <Card className="h-full overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white relative">
                  {/* Animated gradient overlay */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${service.cardGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />

                  {/* Popular Badge with animation */}
                  {service.popular && (
                    <motion.div
                      className="absolute top-4 right-4 z-10"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                    >
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0 shadow-lg relative overflow-hidden">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatDelay: 3,
                          }}
                        />
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                          }}
                        >
                          <Star className="h-3 w-3 mr-1 fill-current relative z-10" />
                        </motion.div>
                        <span className="relative z-10">Most Popular</span>
                      </Badge>
                    </motion.div>
                  )}

                  {/* Image Section with enhanced animations */}
                  <div className="relative overflow-hidden h-48">
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-90`}
                      animate={{
                        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    />

                    <motion.img
                      src={service.image || "/placeholder.svg"}
                      alt={t(service.titleKey)}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />

                    {/* Floating Icon with enhanced animation */}
                    <motion.div
                      className="absolute top-4 left-4"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <motion.div
                        className={`bg-gradient-to-r ${service.gradient} rounded-2xl p-3 shadow-lg relative overflow-hidden`}
                        animate={{
                          boxShadow: [
                            "0 4px 6px rgba(0, 0, 0, 0.1)",
                            "0 8px 25px rgba(59, 130, 246, 0.3)",
                            "0 4px 6px rgba(0, 0, 0, 0.1)",
                          ],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      >
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{
                            duration: 8,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                          }}
                        >
                          <Icon className="h-6 w-6 text-white relative z-10" />
                        </motion.div>

                        {/* Sparkle effects on icon */}
                        <div className="absolute inset-0">
                          {Array.from({ length: 3 }, (_, i) => (
                            <div
                              key={i}
                              className="absolute"
                              style={{
                                left: `${20 + i * 20}%`,
                                top: `${20 + i * 20}%`,
                              }}
                            >
                              <ServiceSparkle delay={i * 0.5} size="h-2 w-2" />
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* Enhanced Price Badge */}
                    <motion.div
                      className="absolute bottom-4 right-4"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg relative overflow-hidden">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100 to-transparent opacity-50"
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatDelay: 4,
                          }}
                        />
                        <div className="flex items-center space-x-2 relative z-10">
                          <span className="text-lg font-bold text-gray-900">{service.price}</span>
                          <span className="text-sm text-gray-500 line-through">{service.originalPrice}</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Shine Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{
                        duration: 2,
                        delay: 2 + index * 0.2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 6,
                      }}
                      style={{
                        transform: "skewX(-20deg)",
                      }}
                    />
                  </div>

                  <CardContent className="p-6 relative z-10">
                    {/* Header with enhanced animations */}
                    <div className="mb-4">
                      <motion.h3
                        className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300"
                        whileHover={{ scale: 1.02 }}
                      >
                        {t(service.titleKey)}
                      </motion.h3>
                      <p className="text-gray-600 leading-relaxed">{service.description}</p>
                    </div>

                    {/* Enhanced Stats Row */}
                    <motion.div
                      className="grid grid-cols-3 gap-3 mb-4 p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl relative overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-purple-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        animate={{
                          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                        }}
                        transition={{
                          duration: 6,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                      />

                      <div className="text-center relative z-10">
                        <div className="flex items-center justify-center space-x-1 mb-1">
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{
                              duration: 4,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "linear",
                            }}
                          >
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          </motion.div>
                          <span className="text-sm font-semibold text-gray-900">{service.rating}</span>
                        </div>
                        <div className="text-xs text-gray-600">Rating</div>
                      </div>

                      <div className="text-center relative z-10">
                        <div className="flex items-center justify-center space-x-1 mb-1">
                          <Users className="h-3 w-3 text-blue-500" />
                          <motion.span
                            className="text-sm font-semibold text-gray-900"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "easeInOut",
                            }}
                          >
                            {service.bookings}
                          </motion.span>
                        </div>
                        <div className="text-xs text-gray-600">Bookings</div>
                      </div>

                      <div className="text-center relative z-10">
                        <div className="flex items-center justify-center space-x-1 mb-1">
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{
                              duration: 6,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "linear",
                            }}
                          >
                            <Clock className="h-3 w-3 text-green-500" />
                          </motion.div>
                          <span className="text-sm font-semibold text-gray-900">{service.duration}</span>
                        </div>
                        <div className="text-xs text-gray-600">Duration</div>
                      </div>
                    </motion.div>

                    {/* Enhanced Features */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3 text-sm">Service includes:</h4>
                      <ul className="space-y-2">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <motion.li
                            key={idx}
                            className="flex items-center space-x-2 text-sm text-gray-600"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 1.2 + idx * 0.1 }}
                            whileHover={{ x: 5 }}
                          >
                            <motion.div
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                                delay: idx * 0.3,
                              }}
                            >
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            </motion.div>
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                        {service.features.length > 3 && (
                          <motion.li
                            className="text-sm text-blue-600 font-medium pl-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: 1.5 }}
                            whileHover={{ x: 5, color: "#3B82F6" }}
                          >
                            +{service.features.length - 3} more features included
                          </motion.li>
                        )}
                      </ul>
                    </div>

                    {/* Enhanced Action Buttons */}
                    <div className="space-y-3">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          className={`w-full py-3 font-semibold bg-gradient-to-r ${service.gradient} hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl group relative overflow-hidden`}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatDelay: 4,
                            }}
                          />
                          <span className="relative z-10">Book This Service</span>
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform relative z-10" />
                        </Button>
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          variant="outline"
                          className="w-full py-3 font-semibold border-2 hover:bg-gray-50 transition-all duration-300 bg-transparent group relative overflow-hidden"
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            animate={{
                              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                            }}
                            transition={{
                              duration: 8,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "linear",
                            }}
                          />
                          <span className="relative z-10">Learn More</span>
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform relative z-10" />
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Enhanced Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-center mt-16"
        >
          <motion.div
            className="bg-gradient-to-r from-blue-50 via-white to-indigo-50 rounded-3xl p-8 border border-blue-100 relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-purple-100/50 opacity-0 hover:opacity-100 transition-opacity duration-500"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
              }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />

            <div className="relative z-10">
              <motion.h3
                className="text-2xl font-bold text-gray-900 mb-4"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                Need a Custom Cleaning Solution?
              </motion.h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                We offer customized cleaning packages tailored to your specific needs and schedule. Contact us for a
                personalized quote.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-3 relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 3,
                      }}
                    />
                    <span className="relative z-10">Get Custom Quote</span>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 bg-transparent relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 hover:opacity-100 transition-opacity duration-300"
                      animate={{
                        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    />
                    <span className="relative z-10">View All Services</span>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
