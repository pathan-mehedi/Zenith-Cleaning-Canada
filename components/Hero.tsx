"use client"

import { motion, useAnimation, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/LanguageContext"
import { Sparkles, Shield, Clock, ArrowRight, Play, Droplets } from "lucide-react"

// Floating cleaning elements data
const floatingElements = [
  { id: 1, icon: "🧽", size: "text-2xl", delay: 0, duration: 4 },
  { id: 2, icon: "🧴", size: "text-xl", delay: 1, duration: 5 },
  { id: 3, icon: "✨", size: "text-lg", delay: 2, duration: 3.5 },
  { id: 4, icon: "🫧", size: "text-2xl", delay: 0.5, duration: 4.5 },
  { id: 5, icon: "🧹", size: "text-xl", delay: 1.5, duration: 4 },
  { id: 6, icon: "💧", size: "text-lg", delay: 2.5, duration: 3 },
]

// Sparkle particles for cleaning effect
const SparkleParticle = ({ delay = 0 }) => (
  <motion.div
    className="absolute"
    initial={{ opacity: 0, scale: 0, rotate: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      rotate: [0, 180, 360],
      x: [0, Math.random() * 100 - 50],
      y: [0, Math.random() * 100 - 50],
    }}
    transition={{
      duration: 2,
      delay,
      repeat: Number.POSITIVE_INFINITY,
      repeatDelay: Math.random() * 3 + 2,
    }}
  >
    <Sparkles className="h-4 w-4 text-blue-400" />
  </motion.div>
)

// Bubble animation component
const BubbleEffect = () => {
  const bubbles = Array.from({ length: 8 }, (_, i) => i)

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble}
          className="absolute w-4 h-4 bg-blue-200 rounded-full opacity-30"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: -100,
            x: Math.random() * 100 - 50,
          }}
          transition={{
            duration: Math.random() * 3 + 4,
            delay: Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}

// Cleaning wave animation
const CleaningWave = () => (
  <motion.div
    className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.1 }}
    transition={{ duration: 1, delay: 2 }}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400"
      animate={{
        x: ["-100%", "100%"],
      }}
      transition={{
        duration: 8,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
      style={{
        clipPath: "polygon(0 50%, 100% 30%, 100% 100%, 0 100%)",
      }}
    />
  </motion.div>
)

// Floating cleaning tools
const FloatingCleaningTool = ({ element, index }) => (
  <motion.div
    className={`absolute ${element.size} select-none pointer-events-none`}
    initial={{
      x: Math.random() * 200,
      y: Math.random() * 200,
      opacity: 0,
      rotate: 0,
    }}
    animate={{
      x: [Math.random() * 200, Math.random() * 300 + 100, Math.random() * 200],
      y: [Math.random() * 200, Math.random() * 300 + 100, Math.random() * 200],
      opacity: [0, 0.6, 0.8, 0.6, 0],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration: element.duration,
      delay: element.delay,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    }}
    style={{
      left: `${10 + (index % 3) * 30}%`,
      top: `${20 + Math.floor(index / 3) * 40}%`,
    }}
  >
    {element.icon}
  </motion.div>
)

// Shine effect animation
const ShineEffect = () => (
  <motion.div
    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
    initial={{ x: "-100%" }}
    animate={{ x: "100%" }}
    transition={{
      duration: 2,
      delay: 3,
      repeat: Number.POSITIVE_INFINITY,
      repeatDelay: 5,
    }}
    style={{
      transform: "skewX(-20deg)",
    }}
  />
)

// Cleaning progress bar animation
const CleaningProgress = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1))
    }, 50)
    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2 }}
      className="absolute bottom-[7rem] left-8 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl max-w-xs"
    >
      <div className="flex items-center space-x-3 mb-2">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="bg-blue-100 rounded-full p-2"
        >
          <Sparkles className="h-4 w-4 text-blue-600" />
        </motion.div>
        <div>
          <div className="font-semibold text-gray-900 text-sm">Cleaning in Progress</div>
          <div className="text-xs text-gray-600">Deep sanitization active</div>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      <div className="text-xs text-gray-500 mt-1">{progress}% Complete</div>
    </motion.div>
  )
}

// Water droplet animation
const WaterDroplets = () => {
  const droplets = Array.from({ length: 12 }, (_, i) => i)

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {droplets.map((droplet) => (
        <motion.div
          key={droplet}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: -20,
            opacity: 0,
          }}
          animate={{
            y: window.innerHeight + 20,
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 2 + 3,
            delay: Math.random() * 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeIn",
          }}
        >
          <Droplets className="h-3 w-3 text-blue-300" />
        </motion.div>
      ))}
    </div>
  )
}

export function Hero() {
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
    <section
      ref={ref}
      className="relative pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>

      {/* Animated Blobs */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        animate={{
          scale: [1, 0.8, 1.1, 1],
          x: [0, -40, 20, 0],
          y: [0, 40, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        animate={{
          scale: [1, 1.3, 0.9, 1],
          x: [0, 30, -10, 0],
          y: [0, -50, 20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Floating Cleaning Elements */}
      {floatingElements.map((element, index) => (
        <FloatingCleaningTool key={element.id} element={element} index={index} />
      ))}

      {/* Sparkle Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <SparkleParticle delay={Math.random() * 3} />
          </div>
        ))}
      </div>

      {/* Water Droplets */}
      <WaterDroplets />

      {/* Bubble Effect */}
      <BubbleEffect />

      {/* Cleaning Wave */}
      <CleaningWave />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Badge className="mb-6 px-4 py-2 bg-blue-100 text-blue-700 border-blue-200 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 3,
                  }}
                />
                <Sparkles className="h-4 w-4 mr-2 relative z-10" />
                <span className="relative z-10">Premium Cleaning Services</span>
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            >
              <motion.span
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
                className="bg-gradient-to-r from-gray-900 via-blue-600 to-gray-900 bg-clip-text text-transparent"
              >
                Transform Your Home with
              </motion.span>
              <motion.span
                className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block relative"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                Spotless Excellence
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  ✨
                </motion.div>
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed"
            >
              Experience premium home cleaning services across Canada and Europe. Trusted by 10,000+ families for
              reliable, eco-friendly, and exceptional results.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <Link href="/booking">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative overflow-hidden"
                >
                  <Button
                    size="lg"
                    className="w-full sm:w-auto px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl group relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 3,
                      }}
                    />
                    <span className="relative z-10">Book Your Cleaning</span>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform relative z-10" />
                  </Button>
                </motion.div>
              </Link>

              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto px-8 py-4 text-lg font-semibold border-2 hover:bg-gray-50 transition-all duration-300 group bg-transparent relative overflow-hidden"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 8,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  >
                    <Play className="mr-2 h-5 w-5" />
                  </motion.div>
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust indicators with animations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            >
              {[
                { icon: Sparkles, title: "Premium Quality", subtitle: "Eco-friendly products", color: "blue" },
                { icon: Shield, title: "Insured & Bonded", subtitle: "100% protected", color: "green" },
                { icon: Clock, title: "24/7 Support", subtitle: "Always available", color: "purple" },
              ].map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={controls}
                    variants={{
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="flex items-center space-x-3 justify-center lg:justify-start group cursor-pointer"
                  >
                    <motion.div
                      className={`bg-${item.color}-100 rounded-full p-2 group-hover:bg-${item.color}-200 transition-colors duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className={`h-5 w-5 text-${item.color}-600`} />
                    </motion.div>
                    <div>
                      <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {item.title}
                      </div>
                      <div className="text-sm text-gray-600">{item.subtitle}</div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>

          {/* Hero Image with animations */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <motion.div
              className="relative rounded-3xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02, rotateY: 5 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="/hero-cleaning-professional.png"
                alt="Professional cleaning team"
                className="w-full h-auto object-cover"
              />

              {/* Shine Effect */}
              <ShineEffect />

              {/* Floating availability card */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center space-x-3">
                  <motion.div
                    className="w-3 h-3 bg-green-500 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.7, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                  <div>
                    <div className="font-semibold text-gray-900">Available Now</div>
                    <div className="text-sm text-gray-600">Same-day booking</div>
                  </div>
                </div>
              </motion.div>

              {/* Animated rating card */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center space-x-3">
                  <motion.div
                    className="text-3xl font-bold text-blue-600"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    4.9★
                  </motion.div>
                  <div>
                    <div className="font-semibold text-gray-900">Excellent Rating</div>
                    <motion.div
                      className="text-sm text-gray-600"
                      animate={{
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      10,000+ happy customers
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Cleaning Progress Animation */}
              <CleaningProgress />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
