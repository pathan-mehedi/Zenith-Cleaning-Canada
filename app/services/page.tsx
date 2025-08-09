"use client"

import { useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ServiceCard } from "@/components/ServiceCard"
import { ServiceFilters } from "@/components/ServiceFilters"
import { useLanguage } from "@/contexts/LanguageContext"
import { Search, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

const allServices = [
  {
    id: "regular",
    name: "Regular Cleaning",
    description: "Weekly, bi-weekly, or monthly cleaning services to keep your home consistently clean",
    price: "From $80",
    duration: "2-3 hours",
    image: "/home-cleaning-service.png",
    category: "regular",
    location: ["toronto", "vancouver", "montreal", "paris", "lyon"],
    features: ["Dusting", "Vacuuming", "Mopping", "Bathroom cleaning", "Kitchen cleaning"],
  },
  {
    id: "deep",
    name: "Deep Cleaning",
    description: "Comprehensive deep cleaning for your entire home, perfect for seasonal cleaning",
    price: "From $150",
    duration: "4-6 hours",
    image: "/deep-cleaning-service-detailed.png",
    category: "deep",
    location: ["toronto", "vancouver", "montreal", "paris", "lyon"],
    features: ["Inside appliances", "Baseboards", "Light fixtures", "Cabinet interiors", "Window sills"],
  },
  {
    id: "kitchen",
    name: "Kitchen & Bathroom Deep Clean",
    description: "Specialized deep cleaning for kitchens and bathrooms with attention to detail",
    price: "From $120",
    duration: "3-4 hours",
    image: "/kitchen-bathroom-deep-cleaning.png",
    category: "specialized",
    location: ["toronto", "vancouver", "montreal", "paris"],
    features: ["Oven cleaning", "Refrigerator cleaning", "Tile scrubbing", "Grout cleaning", "Sanitization"],
  },
  {
    id: "carpet",
    name: "Carpet & Upholstery Cleaning",
    description: "Professional carpet and upholstery cleaning using advanced equipment",
    price: "From $100",
    duration: "2-3 hours",
    image: "/placeholder-ssyz9.png",
    category: "specialized",
    location: ["toronto", "vancouver", "montreal"],
    features: ["Steam cleaning", "Stain removal", "Odor elimination", "Fabric protection", "Quick drying"],
  },
  {
    id: "window",
    name: "Window Cleaning",
    description: "Interior and exterior window cleaning for crystal clear views",
    price: "From $60",
    duration: "1-2 hours",
    image: "/professional-window-cleaning.png",
    category: "specialized",
    location: ["toronto", "vancouver", "paris", "lyon"],
    features: ["Interior windows", "Exterior windows", "Screen cleaning", "Sill cleaning", "Streak-free finish"],
  },
  {
    id: "movein",
    name: "Move-in/Move-out Cleaning",
    description: "Complete cleaning service for moving in or out of your home",
    price: "From $200",
    duration: "5-8 hours",
    image: "/move-in-out-cleaning.png",
    category: "specialized",
    location: ["toronto", "vancouver", "montreal", "paris", "lyon"],
    features: ["Complete deep clean", "Inside cabinets", "Appliance cleaning", "Floor deep clean", "Wall washing"],
  },
]

export default function ServicesPage() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    priceRange: "",
  })

  const filteredServices = allServices.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = !filters.category || service.category === filters.category
    const matchesLocation = !filters.location || service.location.includes(filters.location)

    let matchesPrice = true
    if (filters.priceRange) {
      const price = Number.parseInt(service.price.replace(/[^0-9]/g, ""))
      switch (filters.priceRange) {
        case "under100":
          matchesPrice = price < 100
          break
        case "100to150":
          matchesPrice = price >= 100 && price <= 150
          break
        case "over150":
          matchesPrice = price > 150
          break
      }
    }

    return matchesSearch && matchesCategory && matchesLocation && matchesPrice
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-6 px-4 py-2 bg-blue-100 text-blue-700 border-blue-200">
              <Sparkles className="h-4 w-4 mr-2" />
              Professional Services
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Premium Cleaning
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block">
                Services for Every Need
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              From regular maintenance to deep cleaning, discover our comprehensive range of professional services
              tailored to keep your home pristine.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mb-8"
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-4 text-lg rounded-xl border-0 shadow-lg bg-white"
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-1"
            >
              <ServiceFilters filters={filters} setFilters={setFilters} />
            </motion.div>

            {/* Services Grid */}
            <div className="lg:col-span-3">
              {filteredServices.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  {filteredServices.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No services found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
