"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import {
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  User,
  Mail,
  Phone,
  Home,
  FileText,
  Download,
  Printer,
  Share2,
  Sparkles,
  DollarSign,
  Copy,
  Star,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface BookingData {
  // Service Details
  serviceType: string
  serviceName: string
  date: string
  time: string
  duration: string
  rooms: string

  // Customer Information
  name: string
  email: string
  phone: string
  address: string

  // Pricing
  basePrice: number
  additionalRooms: number
  subtotal: number
  tax: number
  total: number

  // Additional Details
  specialInstructions?: string
  bookingId: string
  timestamp: string

  // Service Features
  features: string[]
}

interface BookingConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  bookingData: BookingData
}

const serviceGradients = {
  regular: "from-blue-500 to-cyan-500",
  deep: "from-purple-500 to-pink-500",
  kitchen: "from-green-500 to-teal-500",
  carpet: "from-orange-500 to-red-500",
  window: "from-indigo-500 to-blue-500",
  movein: "from-yellow-500 to-orange-500",
}

export function BookingConfirmationModal({ isOpen, onClose, bookingData }: BookingConfirmationModalProps) {
  const { toast } = useToast()
  const [isSharing, setIsSharing] = useState(false)

  const gradient =
    serviceGradients[bookingData.serviceType as keyof typeof serviceGradients] || "from-gray-500 to-gray-600"

  const handlePrint = () => {
    const printContent = document.getElementById("booking-confirmation-print")
    if (printContent) {
      const printWindow = window.open("", "_blank")
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Booking Confirmation - ${bookingData.bookingId}</title>
              <style>
                body { 
                  font-family: Arial, sans-serif; 
                  line-height: 1.6; 
                  color: #333; 
                  max-width: 800px; 
                  margin: 0 auto; 
                  padding: 20px; 
                }
                .header { 
                  text-align: center; 
                  border-bottom: 2px solid #3B82F6; 
                  padding-bottom: 20px; 
                  margin-bottom: 30px; 
                }
                .logo { 
                  font-size: 24px; 
                  font-weight: bold; 
                  color: #3B82F6; 
                  margin-bottom: 10px; 
                }
                .booking-id { 
                  font-size: 18px; 
                  font-weight: bold; 
                  background: #F3F4F6; 
                  padding: 10px; 
                  border-radius: 8px; 
                  margin: 20px 0; 
                }
                .section { 
                  margin-bottom: 25px; 
                  padding: 15px; 
                  border: 1px solid #E5E7EB; 
                  border-radius: 8px; 
                }
                .section-title { 
                  font-size: 16px; 
                  font-weight: bold; 
                  color: #1F2937; 
                  margin-bottom: 15px; 
                  border-bottom: 1px solid #E5E7EB; 
                  padding-bottom: 8px; 
                }
                .detail-row { 
                  display: flex; 
                  justify-content: space-between; 
                  margin-bottom: 8px; 
                }
                .detail-label { 
                  font-weight: 600; 
                  color: #4B5563; 
                }
                .detail-value { 
                  color: #1F2937; 
                }
                .total-row { 
                  font-size: 18px; 
                  font-weight: bold; 
                  color: #3B82F6; 
                  border-top: 2px solid #E5E7EB; 
                  padding-top: 10px; 
                  margin-top: 15px; 
                }
                .features-list { 
                  list-style: none; 
                  padding: 0; 
                }
                .features-list li { 
                  padding: 5px 0; 
                  border-bottom: 1px solid #F3F4F6; 
                }
                .features-list li:before { 
                  content: "✓ "; 
                  color: #10B981; 
                  font-weight: bold; 
                }
                .footer { 
                  text-align: center; 
                  margin-top: 40px; 
                  padding-top: 20px; 
                  border-top: 1px solid #E5E7EB; 
                  color: #6B7280; 
                }
                @media print {
                  body { margin: 0; padding: 15px; }
                  .no-print { display: none; }
                }
              </style>
            </head>
            <body>
              ${printContent.innerHTML}
            </body>
          </html>
        `)
        printWindow.document.close()
        printWindow.print()
      }
    }
  }

  const handleDownload = () => {
    const content = `
ZENITH CLEANING CO. - BOOKING CONFIRMATION
==========================================

Booking ID: ${bookingData.bookingId}
Date Created: ${new Date(bookingData.timestamp).toLocaleString()}

SERVICE DETAILS
---------------
Service: ${bookingData.serviceName}
Date: ${bookingData.date}
Time: ${bookingData.time}
Duration: ${bookingData.duration}
Rooms: ${bookingData.rooms}

CUSTOMER INFORMATION
--------------------
Name: ${bookingData.name}
Email: ${bookingData.email}
Phone: ${bookingData.phone}
Address: ${bookingData.address}

PRICING BREAKDOWN
-----------------
Base Service: $${bookingData.basePrice.toFixed(2)}
Additional Rooms: $${bookingData.additionalRooms.toFixed(2)}
Subtotal: $${bookingData.subtotal.toFixed(2)}
Tax (13% HST): $${bookingData.tax.toFixed(2)}
TOTAL: $${bookingData.total.toFixed(2)}

SERVICE INCLUDES
----------------
${bookingData.features.map((feature) => `• ${feature}`).join("\n")}

${bookingData.specialInstructions ? `SPECIAL INSTRUCTIONS\n--------------------\n${bookingData.specialInstructions}\n` : ""}

CONTACT INFORMATION
-------------------
Phone: +1 (555) 123-4567
Email: info@zenithcleaning.com
Website: zenithcleaning.com

Thank you for choosing Zenith Cleaning Co.!
We look forward to serving you.
    `.trim()

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `zenith-booking-${bookingData.bookingId}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Download Complete",
      description: "Booking details have been downloaded successfully.",
    })
  }

  const handleShare = async () => {
    setIsSharing(true)
    const shareText = `Booking Confirmed! 🎉\n\nService: ${bookingData.serviceName}\nDate: ${bookingData.date} at ${bookingData.time}\nBooking ID: ${bookingData.bookingId}\n\nZenith Cleaning Co. - Professional Home Cleaning`

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Zenith Cleaning Booking Confirmation",
          text: shareText,
        })
      } catch (error) {
        // Fallback to clipboard
        await navigator.clipboard.writeText(shareText)
        toast({
          title: "Copied to Clipboard",
          description: "Booking details copied to clipboard.",
        })
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(shareText)
      toast({
        title: "Copied to Clipboard",
        description: "Booking details copied to clipboard.",
      })
    }
    setIsSharing(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 bg-white">
            <div className="sticky top-0 z-10 bg-white border-b">
              <DialogHeader className={`p-6 bg-gradient-to-r ${gradient} text-white rounded-t-lg`}>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  <DialogTitle className="text-3xl font-bold mb-2">Booking Confirmed!</DialogTitle>
                  <p className="text-white/90 text-lg">Your cleaning service has been successfully booked</p>
                </motion.div>
              </DialogHeader>
            </div>

            <div id="booking-confirmation-print" className="p-6">
              {/* Print Header (only visible in print) */}
              <div className="hidden print:block text-center mb-8">
                <div className="logo text-2xl font-bold text-blue-600 mb-2">Zenith Cleaning Co.</div>
                <div className="text-gray-600">Professional Home Cleaning Services</div>
                <div className="text-gray-600">Phone: +1 (555) 123-4567 | Email: info@zenithcleaning.com</div>
              </div>

              {/* Booking ID */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="booking-id text-center mb-8"
              >
                <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center space-x-3 mb-2">
                      <FileText className="h-6 w-6 text-blue-600" />
                      <span className="text-lg font-semibold text-gray-700">Booking Reference</span>
                    </div>
                    <div className="text-3xl font-bold text-blue-600 tracking-wider">{bookingData.bookingId}</div>
                    <div className="text-sm text-gray-600 mt-2">
                      Created on {new Date(bookingData.timestamp).toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Service Details */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="section"
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className={`bg-gradient-to-r ${gradient} rounded-lg p-2`}>
                          <Sparkles className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="section-title text-xl font-bold text-gray-900">Service Details</h3>
                      </div>

                      <div className="space-y-4">
                        <div className="detail-row flex justify-between items-center">
                          <span className="detail-label flex items-center space-x-2">
                            <Home className="h-4 w-4 text-gray-500" />
                            <span>Service Type</span>
                          </span>
                          <Badge className={`bg-gradient-to-r ${gradient} text-white`}>{bookingData.serviceName}</Badge>
                        </div>

                        <div className="detail-row flex justify-between">
                          <span className="detail-label flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span>Date</span>
                          </span>
                          <span className="detail-value font-semibold">{bookingData.date}</span>
                        </div>

                        <div className="detail-row flex justify-between">
                          <span className="detail-label flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span>Time</span>
                          </span>
                          <span className="detail-value font-semibold">{bookingData.time}</span>
                        </div>

                        <div className="detail-row flex justify-between">
                          <span className="detail-label">Duration</span>
                          <span className="detail-value">{bookingData.duration}</span>
                        </div>

                        <div className="detail-row flex justify-between">
                          <span className="detail-label">Rooms</span>
                          <span className="detail-value">{bookingData.rooms}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Customer Information */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="section"
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-lg p-2">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="section-title text-xl font-bold text-gray-900">Customer Information</h3>
                      </div>

                      <div className="space-y-4">
                        <div className="detail-row flex justify-between">
                          <span className="detail-label flex items-center space-x-2">
                            <User className="h-4 w-4 text-gray-500" />
                            <span>Name</span>
                          </span>
                          <span className="detail-value font-semibold">{bookingData.name}</span>
                        </div>

                        <div className="detail-row flex justify-between">
                          <span className="detail-label flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <span>Email</span>
                          </span>
                          <span className="detail-value">{bookingData.email}</span>
                        </div>

                        <div className="detail-row flex justify-between">
                          <span className="detail-label flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <span>Phone</span>
                          </span>
                          <span className="detail-value">{bookingData.phone}</span>
                        </div>

                        <div className="detail-row flex flex-col space-y-2">
                          <span className="detail-label flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span>Service Address</span>
                          </span>
                          <span className="detail-value bg-gray-50 p-3 rounded-lg">{bookingData.address}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Pricing Breakdown */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="section mt-8"
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg p-2">
                        <DollarSign className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="section-title text-xl font-bold text-gray-900">Pricing Breakdown</h3>
                    </div>

                    <div className="space-y-3">
                      <div className="detail-row flex justify-between">
                        <span className="detail-label">Base Service</span>
                        <span className="detail-value">${bookingData.basePrice.toFixed(2)}</span>
                      </div>

                      {bookingData.additionalRooms > 0 && (
                        <div className="detail-row flex justify-between">
                          <span className="detail-label">Additional Rooms</span>
                          <span className="detail-value">${bookingData.additionalRooms.toFixed(2)}</span>
                        </div>
                      )}

                      <Separator />

                      <div className="detail-row flex justify-between">
                        <span className="detail-label">Subtotal</span>
                        <span className="detail-value">${bookingData.subtotal.toFixed(2)}</span>
                      </div>

                      <div className="detail-row flex justify-between">
                        <span className="detail-label">Tax (13% HST)</span>
                        <span className="detail-value">${bookingData.tax.toFixed(2)}</span>
                      </div>

                      <Separator />

                      <div className="total-row detail-row flex justify-between text-xl font-bold text-blue-600">
                        <span>Total Amount</span>
                        <span>${bookingData.total.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Payment:</strong> Payment will be collected upon completion of service. We accept cash,
                        credit cards, and digital payments.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Service Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="section mt-8"
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-2">
                        <Star className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="section-title text-xl font-bold text-gray-900">Service Includes</h3>
                    </div>

                    <ul className="features-list grid grid-cols-1 md:grid-cols-2 gap-2">
                      {bookingData.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Special Instructions */}
              {bookingData.specialInstructions && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="section mt-8"
                >
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="section-title text-xl font-bold text-gray-900 mb-4">Special Instructions</h3>
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                        <p className="text-gray-700 leading-relaxed">{bookingData.specialInstructions}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Next Steps */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="section mt-8"
              >
                <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-blue-900 mb-4">What Happens Next?</h3>
                    <div className="space-y-3 text-blue-800">
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-200 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-blue-800">1</span>
                        </div>
                        <p>You'll receive a confirmation email with all booking details within 5 minutes.</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-200 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-blue-800">2</span>
                        </div>
                        <p>Our team will contact you 24 hours before your appointment to confirm details.</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-200 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-blue-800">3</span>
                        </div>
                        <p>Your professional cleaner will arrive on time with all necessary supplies.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Print Footer (only visible in print) */}
              <div className="footer hidden print:block text-center mt-8 pt-6 border-t border-gray-200">
                <div className="text-gray-600">
                  <p className="font-semibold">Zenith Cleaning Co.</p>
                  <p>Phone: +1 (555) 123-4567 | Email: info@zenithcleaning.com</p>
                  <p>Thank you for choosing our professional cleaning services!</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="sticky bottom-0 bg-white border-t p-6 no-print">
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={handlePrint} className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700">
                  <Printer className="h-4 w-4" />
                  <span>Print Confirmation</span>
                </Button>

                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="flex items-center space-x-2 bg-transparent"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Details</span>
                </Button>

                <Button
                  onClick={handleShare}
                  variant="outline"
                  disabled={isSharing}
                  className="flex items-center space-x-2 bg-transparent"
                >
                  {isSharing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Copy className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <Share2 className="h-4 w-4" />
                  )}
                  <span>{isSharing ? "Sharing..." : "Share"}</span>
                </Button>

                <Button onClick={onClose} variant="outline" className="bg-transparent">
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
