"use client"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function PrivacyPolicyPage() {
  const currentYear = new Date().getFullYear()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-xl text-gray-600">Last updated: January 1, {currentYear}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="shadow-lg border-0">
              <CardContent className="p-8 space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      At Zenith Cleaning Co., we collect information you provide directly to us, such as when you create
                      an account, book a service, or contact us for support.
                    </p>
                    <h3 className="text-lg font-semibold text-gray-900">Personal Information:</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Name, email address, and phone number</li>
                      <li>Home address and service location details</li>
                      <li>Payment information (processed securely through third-party providers)</li>
                      <li>Service preferences and special instructions</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>We use the information we collect to:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Provide, maintain, and improve our cleaning services</li>
                      <li>Process bookings and payments</li>
                      <li>Send you service confirmations, updates, and customer support</li>
                      <li>Communicate with you about new services, offers, and company news</li>
                      <li>Ensure the safety and security of our platform and services</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      We do not sell, trade, or otherwise transfer your personal information to third parties without
                      your consent, except as described in this policy:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>With cleaning professionals to provide requested services</li>
                      <li>With payment processors to handle transactions securely</li>
                      <li>When required by law or to protect our rights and safety</li>
                      <li>With your explicit consent for specific purposes</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      We implement appropriate security measures to protect your personal information against
                      unauthorized access, alteration, disclosure, or destruction. This includes:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>SSL encryption for data transmission</li>
                      <li>Secure servers and databases</li>
                      <li>Regular security audits and updates</li>
                      <li>Limited access to personal information by authorized personnel only</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights</h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>You have the right to:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Access, update, or delete your personal information</li>
                      <li>Opt-out of marketing communications</li>
                      <li>Request a copy of your data</li>
                      <li>File a complaint with relevant data protection authorities</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies and Tracking</h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      We use cookies and similar tracking technologies to enhance your experience on our website. You
                      can control cookie settings through your browser preferences.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact Us</h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p>
                        <strong>Email:</strong> privacy@zenithcleaning.com
                      </p>
                      <p>
                        <strong>Phone:</strong> +1 (555) 123-4567
                      </p>
                      <p>
                        <strong>Address:</strong> 123 Business St, Toronto, ON M5V 3A8
                      </p>
                    </div>
                  </div>
                </section>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
