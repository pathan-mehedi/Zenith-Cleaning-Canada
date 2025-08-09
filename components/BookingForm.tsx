"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { BookingConfirmationModal } from "./BookingConfirmationModal"
import { Calendar, Clock, User, Mail, Phone, MapPin, FileText, Sparkles } from "lucide-react"

const services = [
  {
    id: "regular",
    name: "Regular Cleaning",
    basePrice: 80,
    features: [
      "Dusting all surfaces",
      "Vacuuming carpets and rugs",
      "Mopping hard floors",
      "Bathroom cleaning and sanitizing",
      "Kitchen cleaning",
      "Trash removal",
      "Making beds",
      "Light organizing",
    ],
  },
  {
    id: "deep",
    name: "Deep Cleaning",
    basePrice: 150,
    features: [
      "Everything in regular cleaning",
      "Inside appliance cleaning",
      "Baseboards and window sills",
      "Light fixture cleaning",
      "Cabinet interior cleaning",
      "Detailed bathroom scrubbing",
      "Refrigerator cleaning",
      "Oven deep clean",
    ],
  },
  {
    id: "kitchen",
    name: "Kitchen & Bathroom Deep Clean",
    basePrice: 120,
    features: [
      "Oven deep cleaning",
      "Refrigerator interior cleaning",
      "Cabinet cleaning inside/out",
      "Tile and grout scrubbing",
      "Bathroom deep sanitization",
      "Sink and faucet polishing",
      "Countertop deep clean",
      "Floor scrubbing",
    ],
  },
  {
    id: "carpet",
    name: "Carpet & Upholstery Cleaning",
    basePrice: 100,
    features: [
      "Professional steam cleaning",
      "Stain removal treatment",
      "Odor elimination",
      "Fabric protection application",
      "Quick drying process",
      "Furniture moving",
      "Pre-treatment of high traffic areas",
      "Post-cleaning inspection",
    ],
  },
  {
    id: "window",
    name: "Window Cleaning",
    basePrice: 60,
    features: [
      "Interior window cleaning",
      "Exterior window cleaning",
      "Screen cleaning and repair",
      "Window sill cleaning",
      "Streak-free finish",
      "Frame cleaning",
      "Mirror cleaning",
      "Glass door cleaning",
    ],
  },
  {
    id: "movein",
    name: "Move-in/Move-out Cleaning",
    basePrice: 200,
    features: [
      "Complete deep cleaning",
      "Inside all cabinets and drawers",
      "All appliance cleaning",
      "Floor deep cleaning",
      "Wall washing",
      "Light fixture cleaning",
      "Bathroom sanitization",
      "Final walkthrough",
    ],
  },
]

const timeSlots = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"]

export function BookingForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [bookingData, setBookingData] = useState<any>(null)

  const [formData, setFormData] = useState({
    serviceType: "",
    date: "",
    time: "",
    rooms: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    specialInstructions: "",
  })

  const generateBookingId = () => {
    const prefix = "ZC"
    const year = new Date().getFullYear()
    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")
    return `${prefix}-${year}-${random}`
  }

  const calculatePricing = (serviceType: string, rooms: string) => {
    const service = services.find((s) => s.id === serviceType)
    if (!service) return { basePrice: 0, additionalRooms: 0, subtotal: 0, tax: 0, total: 0 }

    const basePrice = service.basePrice
    const roomCount = Number.parseInt(rooms) || 1
    const additionalRooms = Math.max(0, roomCount - 1) * 15 // $15 per additional room
    const subtotal = basePrice + additionalRooms
    const tax = subtotal * 0.13 // 13% HST
    const total = subtotal + tax

    return {
      basePrice,
      additionalRooms,
      subtotal,
      tax,
      total,
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const selectedService = services.find((s) => s.id === formData.serviceType)
    const pricing = calculatePricing(formData.serviceType, formData.rooms)
    const bookingId = generateBookingId()
    const timestamp = new Date().toISOString()

    const booking = {
      // Service Details
      serviceType: formData.serviceType,
      serviceName: selectedService?.name || "",
      date: formData.date,
      time: formData.time,
      duration:
        formData.serviceType === "deep" ? "4-6 hours" : formData.serviceType === "movein" ? "5-8 hours" : "2-3 hours",
      rooms: formData.rooms,

      // Customer Information
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,

      // Pricing
      ...pricing,

      // Additional Details
      specialInstructions: formData.specialInstructions,
      bookingId,
      timestamp,

      // Service Features
      features: selectedService?.features || [],
    }

    // Log comprehensive booking data to console
    console.log("=== ZENITH CLEANING CO. BOOKING CONFIRMATION ===")
    console.log("Booking ID:", booking.bookingId)
    console.log("Timestamp:", new Date(booking.timestamp).toLocaleString())
    console.log("\n--- SERVICE DETAILS ---")
    console.log("Service Type:", booking.serviceName)
    console.log("Date:", booking.date)
    console.log("Time:", booking.time)
    console.log("Duration:", booking.duration)
    console.log("Number of Rooms:", booking.rooms)

    console.log("\n--- CUSTOMER INFORMATION ---")
    console.log("Name:", booking.name)
    console.log("Email:", booking.email)
    console.log("Phone:", booking.phone)
    console.log("Address:", booking.address)

    console.log("\n--- PRICING BREAKDOWN ---")
    console.log("Base Service Price: $" + booking.basePrice.toFixed(2))
    console.log("Additional Rooms: $" + booking.additionalRooms.toFixed(2))
    console.log("Subtotal: $" + booking.subtotal.toFixed(2))
    console.log("Tax (13% HST): $" + booking.tax.toFixed(2))
    console.log("TOTAL AMOUNT: $" + booking.total.toFixed(2))

    console.log("\n--- SERVICE FEATURES ---")
    booking.features.forEach((feature: string, index: number) => {
      console.log(`${index + 1}. ${feature}`)
    })

    if (booking.specialInstructions) {
      console.log("\n--- SPECIAL INSTRUCTIONS ---")
      console.log(booking.specialInstructions)
    }

    console.log("\n--- BOOKING STATUS ---")
    console.log("Status: CONFIRMED")
    console.log("Payment: Due upon service completion")
    console.log("Confirmation: Email sent to", booking.email)
    console.log("===============================================")

    // Store in localStorage for development purposes
    const existingBookings = JSON.parse(localStorage.getItem("zenith-bookings") || "[]")
    existingBookings.push(booking)
    localStorage.setItem("zenith-bookings", JSON.stringify(existingBookings))

    setBookingData(booking)
    setShowConfirmation(true)
    setIsSubmitting(false)

    toast({
      title: "Booking Confirmed! 🎉",
      description: `Your ${selectedService?.name} service has been booked for ${formData.date} at ${formData.time}.`,
    })

    // Reset form
    setFormData({
      serviceType: "",
      date: "",
      time: "",
      rooms: "",
      name: "",
      email: "",
      phone: "",
      address: "",
      specialInstructions: "",
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <>
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
            <CardTitle className="flex items-center space-x-2 text-2xl font-bold text-gray-900">
              <Sparkles className="h-6 w-6 text-blue-600" />
              <span>Book Your Service</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service Selection */}
              <div>
                <Label htmlFor="serviceType" className="text-base font-semibold">
                  Service Type *
                </Label>
                <Select value={formData.serviceType} onValueChange={(value) => handleInputChange("serviceType", value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        <div className="flex justify-between items-center w-full">
                          <span>{service.name}</span>
                          <span className="text-blue-600 font-semibold ml-4">From ${service.basePrice}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date" className="text-base font-semibold flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Preferred Date *</span>
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="time" className="text-base font-semibold flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>Preferred Time *</span>
                  </Label>
                  <Select value={formData.time} onValueChange={(value) => handleInputChange("time", value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Rooms */}
              <div>
                <Label htmlFor="rooms" className="text-base font-semibold">
                  Number of Rooms *
                </Label>
                <Select value={formData.rooms} onValueChange={(value) => handleInputChange("rooms", value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select number of rooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Room</SelectItem>
                    <SelectItem value="2">2 Rooms</SelectItem>
                    <SelectItem value="3">3 Rooms</SelectItem>
                    <SelectItem value="4">4 Rooms</SelectItem>
                    <SelectItem value="5">5 Rooms</SelectItem>
                    <SelectItem value="6">6+ Rooms</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Customer Information */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Customer Information</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-base font-semibold">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                      className="mt-2"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-base font-semibold flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>Email Address *</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      className="mt-2"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-base font-semibold flex items-center space-x-2">
                      <Phone className="h-4 w-4" />
                      <span>Phone Number *</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                      className="mt-2"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address" className="text-base font-semibold flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>Service Address *</span>
                    </Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      required
                      className="mt-2"
                      placeholder="123 Main St, City, Province/State"
                    />
                  </div>
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <Label htmlFor="specialInstructions" className="text-base font-semibold flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Special Instructions (Optional)</span>
                </Label>
                <Textarea
                  id="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
                  className="mt-2"
                  rows={4}
                  placeholder="Any specific cleaning requirements, access instructions, or areas of focus..."
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing Booking...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Book Your Service</span>
                  </div>
                )}
              </Button>

              <p className="text-sm text-gray-600 text-center">
                By booking, you agree to our{" "}
                <a href="/terms-conditions" className="text-blue-600 hover:underline">
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a href="/privacy-policy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Booking Confirmation Modal */}
      {bookingData && (
        <BookingConfirmationModal
          isOpen={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          bookingData={bookingData}
        />
      )}
    </>
  )
}
