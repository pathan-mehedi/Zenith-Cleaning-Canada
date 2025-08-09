"use client"

import type React from "react"
import { useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle, Globe, Calendar } from "lucide-react"

const contactInfo = [
  {
    icon: Phone,
    title: "Phone Support",
    details: ["+1 (555) 123-4567", "Available 24/7"],
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["info@zenithcleaning.com", "Response within 2 hours"],
    color: "bg-green-100 text-green-600",
  },
  {
    icon: MapPin,
    title: "Service Areas",
    details: ["Toronto, Vancouver, Montreal", "Paris, Lyon, Brussels"],
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon-Fri: 7:00 AM - 8:00 PM", "Sat-Sun: 8:00 AM - 6:00 PM"],
    color: "bg-orange-100 text-orange-600",
  },
]

const faqs = [
  {
    question: "How far in advance should I book?",
    answer:
      "We recommend booking at least 24 hours in advance, though same-day service may be available depending on our schedule.",
  },
  {
    question: "Do you provide cleaning supplies?",
    answer:
      "Yes! We bring all necessary eco-friendly cleaning supplies and equipment. You don't need to provide anything.",
  },
  {
    question: "Are your cleaners insured and bonded?",
    answer:
      "Absolutely. All our cleaning professionals are fully insured, bonded, and background-checked for your peace of mind.",
  },
  {
    question: "What if I'm not satisfied with the service?",
    answer:
      "We offer a 100% satisfaction guarantee. If you're not happy, we'll return within 24 hours to make it right at no extra charge.",
  },
]

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    serviceType: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    toast({
      title: "Message Sent Successfully!",
      description: "We'll get back to you within 2 hours during business hours.",
    })

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      serviceType: "",
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

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
            <Badge className="mb-6 px-4 py-2 bg-blue-100 text-blue-700 border-blue-200">Get In Touch</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              We're Here to
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {" "}
                Help You
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              Have questions about our services? Need a custom quote? Our friendly team is ready to assist you with all
              your cleaning needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                    <CardContent className="p-8">
                      <div
                        className={`w-16 h-16 rounded-2xl ${info.color} flex items-center justify-center mx-auto mb-6`}
                      >
                        <Icon className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">{info.title}</h3>
                      <div className="space-y-2">
                        {info.details.map((detail, idx) => (
                          <p key={idx} className={`${idx === 0 ? "font-semibold text-gray-900" : "text-gray-600"}`}>
                            {detail}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="shadow-xl border-0">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                    <MessageCircle className="h-6 w-6 mr-3 text-blue-600" />
                    Send Us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="serviceType">Service Interest</Label>
                        <select
                          id="serviceType"
                          value={formData.serviceType}
                          onChange={(e) => handleInputChange("serviceType", e.target.value)}
                          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select a service</option>
                          <option value="regular">Regular Cleaning</option>
                          <option value="deep">Deep Cleaning</option>
                          <option value="kitchen">Kitchen & Bathroom</option>
                          <option value="carpet">Carpet Cleaning</option>
                          <option value="window">Window Cleaning</option>
                          <option value="movein">Move-in/Move-out</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        required
                        rows={5}
                        className="mt-1"
                        placeholder="Tell us about your cleaning needs..."
                      />
                    </div>

                    <Button type="submit" className="w-full py-3 text-lg font-semibold">
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Service Areas & Quick Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Service Areas Map */}
              <Card className="shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Globe className="h-6 w-6 mr-3 text-blue-600" />
                    Our Service Areas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-red-500" />
                        Canada
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span>Toronto, ON</span>
                          <Badge variant="secondary">Active</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span>Vancouver, BC</span>
                          <Badge variant="secondary">Active</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span>Montreal, QC</span>
                          <Badge variant="secondary">Active</Badge>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                        Europe
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span>Paris, France</span>
                          <Badge variant="secondary">Active</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span>Lyon, France</span>
                          <Badge variant="secondary">Active</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Response Promise */}
              <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardContent className="p-8 text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Quick Response Guarantee</h3>
                  <p className="text-gray-600 mb-4">
                    We respond to all inquiries within 2 hours during business hours, and within 24 hours on weekends.
                  </p>
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Same-day quotes</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      <span>24/7 support</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Quick answers to common questions about our services</p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{faq.question}</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
