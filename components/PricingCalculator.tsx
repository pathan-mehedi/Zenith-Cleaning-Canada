"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Calculator, Home, Clock, DollarSign } from "lucide-react"

const services = [
  { id: "regular", name: "Regular Cleaning", basePrice: 80, perRoom: 15 },
  { id: "deep", name: "Deep Cleaning", basePrice: 150, perRoom: 25 },
  { id: "kitchen", name: "Kitchen & Bathroom", basePrice: 120, perRoom: 20 },
  { id: "carpet", name: "Carpet Cleaning", basePrice: 100, perRoom: 18 },
  { id: "window", name: "Window Cleaning", basePrice: 60, perRoom: 10 },
  { id: "movein", name: "Move-in/Move-out", basePrice: 200, perRoom: 30 },
]

const frequencies = [
  { id: "once", name: "One-time", discount: 0 },
  { id: "weekly", name: "Weekly", discount: 0.15 },
  { id: "biweekly", name: "Bi-weekly", discount: 0.1 },
  { id: "monthly", name: "Monthly", discount: 0.05 },
]

export function PricingCalculator() {
  const [selectedService, setSelectedService] = useState("")
  const [rooms, setRooms] = useState("")
  const [frequency, setFrequency] = useState("")
  const [totalPrice, setTotalPrice] = useState(0)
  const [breakdown, setBreakdown] = useState({
    basePrice: 0,
    roomsPrice: 0,
    subtotal: 0,
    discount: 0,
    final: 0,
  })

  useEffect(() => {
    if (selectedService && rooms && frequency) {
      const service = services.find((s) => s.id === selectedService)
      const freq = frequencies.find((f) => f.id === frequency)
      const roomCount = Number.parseInt(rooms)

      if (service && freq) {
        const basePrice = service.basePrice
        const roomsPrice = service.perRoom * Math.max(0, roomCount - 1) // First room included
        const subtotal = basePrice + roomsPrice
        const discount = subtotal * freq.discount
        const final = subtotal - discount

        setBreakdown({
          basePrice,
          roomsPrice,
          subtotal,
          discount,
          final,
        })
        setTotalPrice(final)
      }
    } else {
      setTotalPrice(0)
      setBreakdown({
        basePrice: 0,
        roomsPrice: 0,
        subtotal: 0,
        discount: 0,
        final: 0,
      })
    }
  }, [selectedService, rooms, frequency])

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
      <Card className="shadow-xl border-0">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
          <CardTitle className="flex items-center space-x-2 text-2xl font-bold text-gray-900">
            <Calculator className="h-6 w-6 text-green-600" />
            <span>Pricing Calculator</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          {/* Service Selection */}
          <div>
            <Label>Service Type</Label>
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Rooms Selection */}
          <div>
            <Label>Number of Rooms</Label>
            <Select value={rooms} onValueChange={setRooms}>
              <SelectTrigger>
                <SelectValue placeholder="Select rooms" />
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

          {/* Frequency Selection */}
          <div>
            <Label>Frequency</Label>
            <Select value={frequency} onValueChange={setFrequency}>
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                {frequencies.map((freq) => (
                  <SelectItem key={freq.id} value={freq.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{freq.name}</span>
                      {freq.discount > 0 && (
                        <span className="text-green-600 text-sm ml-2">-{Math.round(freq.discount * 100)}%</span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Breakdown */}
          {totalPrice > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 rounded-lg p-4 space-y-3"
            >
              <h3 className="font-semibold text-lg">Price Breakdown</h3>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Home className="h-4 w-4 text-gray-500" />
                    <span>Base Service</span>
                  </div>
                  <span>${breakdown.basePrice}</span>
                </div>

                {breakdown.roomsPrice > 0 && (
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Home className="h-4 w-4 text-gray-500" />
                      <span>Additional Rooms</span>
                    </div>
                    <span>${breakdown.roomsPrice}</span>
                  </div>
                )}

                <Separator />

                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span>${breakdown.subtotal}</span>
                </div>

                {breakdown.discount > 0 && (
                  <div className="flex justify-between items-center text-green-600">
                    <span>Frequency Discount</span>
                    <span>-${breakdown.discount.toFixed(2)}</span>
                  </div>
                )}

                <Separator />

                <div className="flex justify-between items-center text-lg font-bold">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5" />
                    <span>Total</span>
                  </div>
                  <span className="text-blue-600">${breakdown.final.toFixed(2)}</span>
                </div>
              </div>

              <div className="text-sm text-gray-600 mt-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Estimated duration: 2-4 hours</span>
                </div>
              </div>
            </motion.div>
          )}

          {totalPrice === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Select service options to see pricing</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
