"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Clock, MapPin, Phone, Mail, Calendar, User } from "lucide-react"

const mockBooking = {
  id: "ZC-2024-001",
  service: "Deep Cleaning",
  date: "2024-01-15",
  time: "10:00 AM",
  duration: "4-6 hours",
  price: 150,
  status: "confirmed",
  customer: {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Toronto, ON M5V 3A8",
  },
  cleaner: {
    name: "Sarah Johnson",
    phone: "+1 (555) 987-6543",
    rating: 4.9,
    photo: "/professional-cleaner-woman.png",
  },
}

const trackingSteps = [
  { id: 1, title: "Booking Confirmed", description: "Your booking has been confirmed", completed: true },
  { id: 2, title: "Cleaner Assigned", description: "Professional cleaner assigned to your booking", completed: true },
  { id: 3, title: "On the Way", description: "Cleaner is on the way to your location", completed: false },
  { id: 4, title: "Service in Progress", description: "Cleaning service is in progress", completed: false },
  { id: 5, title: "Service Completed", description: "Cleaning service completed successfully", completed: false },
]

export default function ConfirmationPage() {
  const [currentStep, setCurrentStep] = useState(2)

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < trackingSteps.length) {
          return prev + 1
        }
        return prev
      })
    }, 10000) // Update every 10 seconds for demo

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Booking Confirmed!</h1>
            <p className="text-xl text-gray-600">Your cleaning service has been successfully booked</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Booking Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Booking Details</CardTitle>
                  <CardDescription>Booking ID: {mockBooking.id}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Service</span>
                    <span>{mockBooking.service}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-medium">Date & Time</span>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{mockBooking.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{mockBooking.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-medium">Duration</span>
                    <span>{mockBooking.duration}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-medium">Status</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {mockBooking.status}
                    </Badge>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>Total Price</span>
                    <span className="text-blue-600">${mockBooking.price}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Information */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Customer Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <User className="h-4 w-4 text-gray-500" />
                    <span>{mockBooking.customer.name}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>{mockBooking.customer.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{mockBooking.customer.phone}</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                    <span>{mockBooking.customer.address}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Tracking & Cleaner Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Assigned Cleaner */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Assigned Cleaner</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <img
                      src={mockBooking.cleaner.photo || "/placeholder.svg"}
                      alt={mockBooking.cleaner.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{mockBooking.cleaner.name}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-yellow-500">★</span>
                        <span>{mockBooking.cleaner.rating}</span>
                        <span className="text-gray-500">rating</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{mockBooking.cleaner.phone}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Service Tracking */}
              <Card>
                <CardHeader>
                  <CardTitle>Service Tracking</CardTitle>
                  <CardDescription>Real-time updates on your service</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trackingSteps.map((step, index) => (
                      <div key={step.id} className="flex items-start space-x-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            index < currentStep
                              ? "bg-green-500 text-white"
                              : index === currentStep
                                ? "bg-blue-500 text-white animate-pulse"
                                : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          {index < currentStep ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <span className="text-xs font-bold">{step.id}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-medium ${index <= currentStep ? "text-gray-900" : "text-gray-500"}`}>
                            {step.title}
                          </h4>
                          <p className={`text-sm ${index <= currentStep ? "text-gray-600" : "text-gray-400"}`}>
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button className="w-full">Contact Cleaner</Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Reschedule Booking
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Cancel Booking
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
