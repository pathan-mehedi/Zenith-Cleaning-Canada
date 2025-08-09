"use client"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function TermsConditionsPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      By accessing and using Zenith Cleaning Co.'s services, you accept and agree to be bound by the
                      terms and provision of this agreement. If you do not agree to abide by the above, please do not
                      use this service.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Service Description</h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      Zenith Cleaning Co. provides professional home cleaning services including but not limited to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Regular house cleaning (weekly, bi-weekly, monthly)</li>
                      <li>Deep cleaning services</li>
                      <li>Specialized cleaning (kitchen, bathroom, carpet, windows)</li>
                      <li>Move-in/move-out cleaning</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Booking and Payment</h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <h3 className="text-lg font-semibold text-gray-900">Booking:</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>All bookings must be made at least 24 hours in advance</li>
                      <li>Service times are estimates and may vary based on home condition</li>
                      <li>You must provide accurate contact and address information</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-gray-900">Payment:</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Payment is due upon completion of service</li>
                      <li>We accept cash, credit cards, and digital payments</li>
                      <li>Prices are subject to change with 30 days notice</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Cancellation Policy</h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Cancellations must be made at least 24 hours before scheduled service</li>
                      <li>Same-day cancellations may incur a 50% service fee</li>
                      <li>No-shows will be charged the full service amount</li>
                      <li>We reserve the right to cancel services due to unsafe conditions</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Customer Responsibilities</h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>As a customer, you agree to:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Provide safe and legal access to your property</li>
                      <li>Secure or remove valuable and fragile items</li>
                      <li>Inform us of any special requirements or hazards</li>
                      <li>Provide accurate contact information</li>
                      <li>Be present or arrange for someone to be present during service</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Liability and Insurance</h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Zenith Cleaning Co. is fully insured and bonded</li>
                      <li>We are liable for damages caused by our negligence</li>
                      <li>Claims must be reported within 24 hours of service completion</li>
                      <li>Our liability is limited to the cost of the service provided</li>
                      <li>We are not responsible for pre-existing damage or wear</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Quality Guarantee</h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      We stand behind our work with a 100% satisfaction guarantee. If you're not completely satisfied
                      with our service, contact us within 24 hours and we'll return to address any concerns at no
                      additional charge.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Privacy and Confidentiality</h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      We respect your privacy and maintain strict confidentiality regarding your home and personal
                      information. Our staff are trained to maintain professional discretion at all times.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Modifications to Terms</h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      Zenith Cleaning Co. reserves the right to modify these terms at any time. Changes will be
                      effective immediately upon posting on our website. Continued use of our services constitutes
                      acceptance of modified terms.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Information</h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>For questions about these Terms & Conditions, please contact us:</p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p>
                        <strong>Email:</strong> legal@zenithcleaning.com
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
