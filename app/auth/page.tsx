"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  Sparkles,
  Shield,
  Heart,
  CheckCircle,
  ArrowRight,
  Zap,
  Star,
  Users,
  Clock,
} from "lucide-react"

// Floating elements for auth page
const authFloatingElements = [
  { id: 1, icon: "🔐", size: "text-2xl", delay: 0, duration: 6 },
  { id: 2, icon: "✨", size: "text-lg", delay: 1, duration: 4 },
  { id: 3, icon: "🛡️", size: "text-xl", delay: 2, duration: 5 },
  { id: 4, icon: "💎", size: "text-lg", delay: 0.5, duration: 4.5 },
  { id: 5, icon: "🌟", size: "text-xl", delay: 1.5, duration: 3.5 },
]

// Interactive illustration components
const CleaningIllustration = () => (
  <motion.div
    className="relative w-full h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl overflow-hidden"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8 }}
  >
    {/* Background pattern */}
    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>

    {/* Animated cleaning person */}
    <motion.div
      className="absolute bottom-8 left-8 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
      animate={{
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0],
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
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        🧹
      </motion.div>
    </motion.div>

    {/* Floating sparkles */}
    {Array.from({ length: 8 }, (_, i) => (
      <motion.div
        key={i}
        className="absolute text-yellow-400"
        style={{
          left: `${20 + (i % 4) * 20}%`,
          top: `${20 + Math.floor(i / 4) * 30}%`,
        }}
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 1, 0.3],
          scale: [0.8, 1.2, 0.8],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2 + i * 0.2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: i * 0.3,
        }}
      >
        ✨
      </motion.div>
    ))}

    {/* Cleaning bubbles */}
    {Array.from({ length: 6 }, (_, i) => (
      <motion.div
        key={i}
        className="absolute w-4 h-4 bg-white/60 rounded-full"
        style={{
          left: `${30 + i * 10}%`,
          bottom: "20%",
        }}
        animate={{
          y: [0, -100, -200],
          opacity: [0, 1, 0],
          scale: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeOut",
          delay: i * 0.5,
        }}
      />
    ))}

    {/* Success checkmarks */}
    <motion.div
      className="absolute top-4 right-4 bg-green-500 rounded-full p-2"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
    >
      <CheckCircle className="h-4 w-4 text-white" />
    </motion.div>
  </motion.div>
)

const TrustIndicators = () => {
  const indicators = [
    { icon: Shield, label: "Secure & Protected", color: "from-green-500 to-emerald-500" },
    { icon: Users, label: "10,000+ Happy Users", color: "from-blue-500 to-cyan-500" },
    { icon: Star, label: "4.9★ Rating", color: "from-yellow-500 to-orange-500" },
    { icon: Clock, label: "24/7 Support", color: "from-purple-500 to-pink-500" },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      {indicators.map((item, index) => {
        const Icon = item.icon
        return (
          <motion.div
            key={index}
            className="flex items-center space-x-2 p-3 bg-white/80 backdrop-blur-sm rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <motion.div
              className={`bg-gradient-to-r ${item.color} rounded-lg p-2`}
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
                delay: index * 0.5,
              }}
            >
              <Icon className="h-4 w-4 text-white" />
            </motion.div>
            <span className="text-xs font-medium text-gray-700">{item.label}</span>
          </motion.div>
        )
      })}
    </div>
  )
}

const FloatingAuthElement = ({ element, index }) => (
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
      opacity: [0, 0.4, 0.6, 0.4, 0],
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

export default function AuthPage() {
  const { toast } = useToast()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const controls = useAnimation()

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })

  useEffect(() => {
    controls.start("visible")
  }, [controls])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Welcome Back! 🎉",
      description: "You've successfully logged into Zenith Cleaning Co.",
    })

    setIsLoading(false)
    setLoginData({ email: "", password: "", rememberMe: false })
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Please ensure both passwords match.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Account Created! 🚀",
      description: "Welcome to Zenith Cleaning Co. Please verify your email.",
    })

    setIsLoading(false)
    setRegisterData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    })
  }

  const switchMode = () => {
    setIsLogin(!isLogin)
    setShowPassword(false)
    setShowConfirmPassword(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
      <Header />

      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-15"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
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
          duration: 14,
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
          duration: 16,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Floating Auth Elements */}
      {authFloatingElements.map((element, index) => (
        <FloatingAuthElement key={element.id} element={element} index={index} />
      ))}

      {/* Sparkle Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              delay: Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: Math.random() * 4 + 2,
            }}
          >
            <Sparkles className="h-3 w-3 text-blue-400" />
          </motion.div>
        ))}
      </div>

      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
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
              <Shield className="h-4 w-4 mr-2 relative z-10" />
              <span className="relative z-10">Secure Access</span>
            </Badge>

            <motion.h1
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <span className="bg-gradient-to-r from-gray-900 via-blue-600 to-gray-900 bg-clip-text text-transparent">
                {isLogin ? "Welcome Back to" : "Join the"}
              </span>
              <motion.span
                className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block"
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
                Zenith Experience
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
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              {isLogin
                ? "Sign in to manage your bookings and enjoy premium cleaning services"
                : "Create your account and discover why 10,000+ customers trust us"}
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Illustration Side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <CleaningIllustration />

              {/* Benefits Section */}
              <motion.div
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-xl"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 8,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  >
                    <Heart className="h-5 w-5 text-red-500 mr-2" />
                  </motion.div>
                  Why Choose Zenith?
                </h3>

                <div className="space-y-3">
                  {[
                    "Premium eco-friendly cleaning products",
                    "Insured & bonded professional cleaners",
                    "Flexible scheduling & same-day service",
                    "100% satisfaction guarantee",
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 180, 360],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                          delay: index * 0.5,
                        }}
                      >
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </motion.div>
                      <span className="text-gray-700">{benefit}</span>
                    </motion.div>
                  ))}
                </div>

                <TrustIndicators />
              </motion.div>
            </motion.div>

            {/* Form Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm overflow-hidden relative">
                {/* Card Header with Mode Toggle */}
                <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-100">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-purple-100/50 opacity-0"
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <motion.h2
                        className="text-2xl font-bold text-gray-900"
                        key={isLogin ? "login" : "register"}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        {isLogin ? "Sign In" : "Create Account"}
                      </motion.h2>

                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{
                          duration: 6,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                      >
                        <Zap className="h-6 w-6 text-blue-600" />
                      </motion.div>
                    </div>

                    {/* Mode Toggle */}
                    <div className="flex bg-white rounded-xl p-1 shadow-inner">
                      <motion.button
                        className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                          isLogin
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                        onClick={() => !isLogin && switchMode()}
                        whileHover={{ scale: isLogin ? 1 : 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Sign In
                      </motion.button>
                      <motion.button
                        className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                          !isLogin
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                        onClick={() => isLogin && switchMode()}
                        whileHover={{ scale: !isLogin ? 1 : 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Sign Up
                      </motion.button>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <AnimatePresence mode="wait">
                    {isLogin ? (
                      <motion.form
                        key="login"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        onSubmit={handleLogin}
                        className="space-y-6"
                      >
                        {/* Email Field */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                        >
                          <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                            Email Address
                          </Label>
                          <div className="relative mt-2">
                            <motion.div
                              className="absolute left-3 top-1/2 transform -translate-y-1/2"
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                              }}
                            >
                              <Mail className="h-5 w-5 text-gray-400" />
                            </motion.div>
                            <Input
                              id="email"
                              type="email"
                              value={loginData.email}
                              onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
                              className="pl-12 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-all duration-300 bg-gray-50/50"
                              placeholder="Enter your email"
                              required
                            />
                          </div>
                        </motion.div>

                        {/* Password Field */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                            Password
                          </Label>
                          <div className="relative mt-2">
                            <motion.div
                              className="absolute left-3 top-1/2 transform -translate-y-1/2"
                              animate={{ rotate: [0, 360] }}
                              transition={{
                                duration: 8,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear",
                              }}
                            >
                              <Lock className="h-5 w-5 text-gray-400" />
                            </motion.div>
                            <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              value={loginData.password}
                              onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
                              className="pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-all duration-300 bg-gray-50/50"
                              placeholder="Enter your password"
                              required
                            />
                            <motion.button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </motion.button>
                          </div>
                        </motion.div>

                        {/* Remember Me & Forgot Password */}
                        <motion.div
                          className="flex items-center justify-between"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={loginData.rememberMe}
                              onChange={(e) => setLoginData((prev) => ({ ...prev, rememberMe: e.target.checked }))}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-600">Remember me</span>
                          </label>
                          <motion.a
                            href="#"
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                            whileHover={{ scale: 1.05 }}
                          >
                            Forgot password?
                          </motion.a>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                        >
                          <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
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
                            <span className="relative z-10 flex items-center justify-center">
                              {isLoading ? (
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{
                                    duration: 1,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "linear",
                                  }}
                                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                />
                              ) : (
                                <>
                                  Sign In
                                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </>
                              )}
                            </span>
                          </Button>
                        </motion.div>
                      </motion.form>
                    ) : (
                      <motion.form
                        key="register"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        onSubmit={handleRegister}
                        className="space-y-6"
                      >
                        {/* Name Fields */}
                        <div className="grid grid-cols-2 gap-4">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                          >
                            <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700">
                              First Name
                            </Label>
                            <div className="relative mt-2">
                              <motion.div
                                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{
                                  duration: 2,
                                  repeat: Number.POSITIVE_INFINITY,
                                  ease: "easeInOut",
                                }}
                              >
                                <User className="h-5 w-5 text-gray-400" />
                              </motion.div>
                              <Input
                                id="firstName"
                                type="text"
                                value={registerData.firstName}
                                onChange={(e) => setRegisterData((prev) => ({ ...prev, firstName: e.target.value }))}
                                className="pl-12 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-all duration-300 bg-gray-50/50"
                                placeholder="First name"
                                required
                              />
                            </div>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.15 }}
                          >
                            <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700">
                              Last Name
                            </Label>
                            <div className="relative mt-2">
                              <Input
                                id="lastName"
                                type="text"
                                value={registerData.lastName}
                                onChange={(e) => setRegisterData((prev) => ({ ...prev, lastName: e.target.value }))}
                                className="py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-all duration-300 bg-gray-50/50"
                                placeholder="Last name"
                                required
                              />
                            </div>
                          </motion.div>
                        </div>

                        {/* Email Field */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          <Label htmlFor="regEmail" className="text-sm font-semibold text-gray-700">
                            Email Address
                          </Label>
                          <div className="relative mt-2">
                            <motion.div
                              className="absolute left-3 top-1/2 transform -translate-y-1/2"
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                              }}
                            >
                              <Mail className="h-5 w-5 text-gray-400" />
                            </motion.div>
                            <Input
                              id="regEmail"
                              type="email"
                              value={registerData.email}
                              onChange={(e) => setRegisterData((prev) => ({ ...prev, email: e.target.value }))}
                              className="pl-12 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-all duration-300 bg-gray-50/50"
                              placeholder="Enter your email"
                              required
                            />
                          </div>
                        </motion.div>

                        {/* Phone Field */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.25 }}
                        >
                          <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                            Phone Number
                          </Label>
                          <div className="relative mt-2">
                            <motion.div
                              className="absolute left-3 top-1/2 transform -translate-y-1/2"
                              animate={{ rotate: [0, 10, -10, 0] }}
                              transition={{
                                duration: 3,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                              }}
                            >
                              <Phone className="h-5 w-5 text-gray-400" />
                            </motion.div>
                            <Input
                              id="phone"
                              type="tel"
                              value={registerData.phone}
                              onChange={(e) => setRegisterData((prev) => ({ ...prev, phone: e.target.value }))}
                              className="pl-12 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-all duration-300 bg-gray-50/50"
                              placeholder="Enter your phone"
                              required
                            />
                          </div>
                        </motion.div>

                        {/* Password Fields */}
                        <div className="grid grid-cols-1 gap-4">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                          >
                            <Label htmlFor="regPassword" className="text-sm font-semibold text-gray-700">
                              Password
                            </Label>
                            <div className="relative mt-2">
                              <motion.div
                                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                                animate={{ rotate: [0, 360] }}
                                transition={{
                                  duration: 8,
                                  repeat: Number.POSITIVE_INFINITY,
                                  ease: "linear",
                                }}
                              >
                                <Lock className="h-5 w-5 text-gray-400" />
                              </motion.div>
                              <Input
                                id="regPassword"
                                type={showPassword ? "text" : "password"}
                                value={registerData.password}
                                onChange={(e) => setRegisterData((prev) => ({ ...prev, password: e.target.value }))}
                                className="pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-all duration-300 bg-gray-50/50"
                                placeholder="Create password"
                                required
                              />
                              <motion.button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                              </motion.button>
                            </div>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.35 }}
                          >
                            <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">
                              Confirm Password
                            </Label>
                            <div className="relative mt-2">
                              <motion.div
                                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                                animate={{ rotate: [0, 360] }}
                                transition={{
                                  duration: 8,
                                  repeat: Number.POSITIVE_INFINITY,
                                  ease: "linear",
                                  delay: 1,
                                }}
                              >
                                <Lock className="h-5 w-5 text-gray-400" />
                              </motion.div>
                              <Input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                value={registerData.confirmPassword}
                                onChange={(e) =>
                                  setRegisterData((prev) => ({ ...prev, confirmPassword: e.target.value }))
                                }
                                className="pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-all duration-300 bg-gray-50/50"
                                placeholder="Confirm password"
                                required
                              />
                              <motion.button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                              </motion.button>
                            </div>
                          </motion.div>
                        </div>

                        {/* Terms Agreement */}
                        <motion.div
                          className="flex items-start space-x-2"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                        >
                          <input
                            type="checkbox"
                            id="agreeTerms"
                            checked={registerData.agreeTerms}
                            onChange={(e) => setRegisterData((prev) => ({ ...prev, agreeTerms: e.target.checked }))}
                            className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            required
                          />
                          <label htmlFor="agreeTerms" className="text-sm text-gray-600">
                            I agree to the{" "}
                            <motion.a
                              href="/terms"
                              className="text-blue-600 hover:text-blue-700 font-medium"
                              whileHover={{ scale: 1.05 }}
                            >
                              Terms of Service
                            </motion.a>{" "}
                            and{" "}
                            <motion.a
                              href="/privacy"
                              className="text-blue-600 hover:text-blue-700 font-medium"
                              whileHover={{ scale: 1.05 }}
                            >
                              Privacy Policy
                            </motion.a>
                          </label>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.45 }}
                        >
                          <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
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
                            <span className="relative z-10 flex items-center justify-center">
                              {isLoading ? (
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{
                                    duration: 1,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "linear",
                                  }}
                                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                />
                              ) : (
                                <>
                                  Create Account
                                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </>
                              )}
                            </span>
                          </Button>
                        </motion.div>
                      </motion.form>
                    )}
                  </AnimatePresence>

                  {/* Social Login Options */}
                  <motion.div
                    className="mt-6 pt-6 border-t border-gray-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <p className="text-center text-sm text-gray-600 mb-4">Or continue with</p>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { name: "Google", color: "from-red-500 to-pink-500", icon: "🔍" },
                        { name: "Facebook", color: "from-blue-600 to-blue-700", icon: "📘" },
                      ].map((social, index) => (
                        <motion.button
                          key={social.name}
                          className={`flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r ${social.color} text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 relative overflow-hidden group`}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{
                              duration: 3,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatDelay: 4 + index,
                            }}
                          />
                          <span className="text-lg relative z-10">{social.icon}</span>
                          <span className="relative z-10">{social.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
