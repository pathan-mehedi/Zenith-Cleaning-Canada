"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Globe, ChevronDown, LogIn, UserPlus, Calendar, User, ArrowRight, Phone } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { AnimatedLogo } from "./AnimatedLogo"
import { motion, AnimatePresence } from "framer-motion"

const navigationItems = [
  { name: "nav.home", href: "/" },
  { name: "nav.services", href: "/services" },
  { name: "nav.booking", href: "/booking" },
  { name: "nav.about", href: "/about" },
  { name: "nav.contact", href: "/contact" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const pathname = usePathname()
  const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isAuthMenuOpen && !(event.target as Element).closest(".auth-menu-container")) {
        setIsAuthMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isAuthMenuOpen])

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fr" : "en")
  }

  const isActive = (href: string) => {
    return pathname === href
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100" : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }} className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <AnimatedLogo />
                <div className="absolute inset-0 bg-blue-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Zenith Cleaning
                </span>
                <span className="text-xs text-gray-500 font-medium tracking-wider">PROFESSIONAL SERVICES</span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 group ${
                    isActive(item.href)
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  <span className="relative z-10">{t(item.name)}</span>
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-blue-100 rounded-xl"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Language Toggle */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition-all duration-300"
              >
                <Globe className="h-4 w-4" />
                <span className="font-medium">{language.toUpperCase()}</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </motion.div>

            {/* Call Hotline Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => (window.location.href = "tel:+15551234567")}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-green-50 hover:text-green-700 transition-all duration-300 group relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-green-100 to-emerald-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="relative z-10"
                >
                  <Phone className="h-4 w-4" />
                </motion.div>
                <div className="flex flex-col items-start relative z-10">
                  <span className="font-medium text-sm">Call Now</span>
                  {/* <span className="text-xs opacity-75">+1 (555) 123-4567</span> */}
                </div>
              </Button>
            </motion.div>

            {/* Dynamic Auth Section */}
            <div className="relative">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="ghost"
                  onClick={() => setIsAuthMenuOpen(!isAuthMenuOpen)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 group relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 8,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                    className="relative z-10"
                  >
                    <User className="h-4 w-4" />
                  </motion.div>
                  <span className="font-medium relative z-10">{t("nav.login")}</span>
                  <motion.div
                    animate={{ rotate: isAuthMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10"
                  >
                    <ChevronDown className="h-3 w-3" />
                  </motion.div>
                </Button>
              </motion.div>

              {/* Auth Dropdown Menu */}
              <AnimatePresence>
                {isAuthMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-0 top-full mt-2 w-64 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                  >
                    {/* Menu Header */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <motion.div
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full p-2"
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
                          <User className="h-4 w-4 text-white" />
                        </motion.div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Account Access</h3>
                          <p className="text-sm text-gray-600">Sign in or create account</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      <Link href="/auth">
                        <motion.div
                          className="flex items-center space-x-3 p-3 rounded-xl hover:bg-blue-50 transition-all duration-300 group cursor-pointer"
                          whileHover={{ x: 5, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setIsAuthMenuOpen(false)}
                        >
                          <motion.div
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg p-2 group-hover:shadow-lg transition-shadow duration-300"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            <LogIn className="h-4 w-4 text-white" />
                          </motion.div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                              Sign In
                            </div>
                            <div className="text-sm text-gray-600">Access your account</div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                        </motion.div>
                      </Link>

                      <Link href="/auth">
                        <motion.div
                          className="flex items-center space-x-3 p-3 rounded-xl hover:bg-green-50 transition-all duration-300 group cursor-pointer"
                          whileHover={{ x: 5, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setIsAuthMenuOpen(false)}
                        >
                          <motion.div
                            className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-2 group-hover:shadow-lg transition-shadow duration-300"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            <UserPlus className="h-4 w-4 text-white" />
                          </motion.div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 group-hover:text-green-700 transition-colors">
                              Create Account
                            </div>
                            <div className="text-sm text-gray-600">Join Zenith today</div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all duration-300" />
                        </motion.div>
                      </Link>

                      {/* Quick Actions */}
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <div className="grid grid-cols-2 gap-2">
                          <motion.button
                            className="flex items-center justify-center space-x-2 p-2 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all duration-300 group"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setIsAuthMenuOpen(false)
                              window.location.href = "tel:+15551234567"
                            }}
                          >
                            <motion.div
                              animate={{ rotate: [0, 10, -10, 0] }}
                              transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                              }}
                            >
                              <Phone className="h-3 w-3 text-purple-600" />
                            </motion.div>
                            <div className="flex flex-col items-center">
                              <span className="text-xs font-medium text-purple-700">Call</span>
                              <span className="text-xs opacity-75 text-purple-600">555-123-4567</span>
                            </div>
                          </motion.button>

                          <Link href="/booking">
                            <motion.button
                              className="flex items-center justify-center space-x-2 p-2 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 group"
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setIsAuthMenuOpen(false)}
                            >
                              <Calendar className="h-3 w-3 text-blue-600" />
                              <span className="text-xs font-medium text-blue-700">Book</span>
                            </motion.button>
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Menu Footer */}
                    <div className="bg-gray-50 p-3 border-t border-gray-100">
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>Need help?</span>
                        <motion.button
                          className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
                          whileHover={{ scale: 1.05 }}
                          onClick={() => {
                            setIsAuthMenuOpen(false)
                            window.location.href = "tel:+15551234567"
                          }}
                        >
                          <Phone className="h-3 w-3" />
                          <span>Call Support</span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl hover:bg-gray-100 transition-all duration-300"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2 border-t border-gray-100">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                        isActive(item.href)
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t(item.name)}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Navigation - replace the existing auth section */}
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleLanguage}
                    className="w-full justify-start px-4 py-3 rounded-xl hover:bg-gray-100"
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    <span>{language.toUpperCase()}</span>
                  </Button>

                  {/* Mobile Call Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsMenuOpen(false)
                      window.location.href = "tel:+15551234567"
                    }}
                    className="w-full justify-start px-4 py-3 rounded-xl hover:bg-green-50 hover:text-green-700 group"
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                    </motion.div>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Call Hotline</span>
                      <span className="text-xs opacity-75">+1 (555) 123-4567</span>
                    </div>
                  </Button>

                  <div className="flex space-x-2 px-4">
                    <Link href="/auth" className="flex-1">
                      <Button
                        variant="ghost"
                        className="w-full rounded-xl hover:bg-blue-50 hover:text-blue-700 group"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <LogIn className="h-4 w-4 mr-2" />
                        {t("nav.login")}
                      </Button>
                    </Link>
                    <Link href="/auth" className="flex-1">
                      <Button
                        className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 group"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        {t("nav.register")}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
