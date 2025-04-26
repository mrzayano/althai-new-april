import type { Metadata } from "next"
import Image from "next/image"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import EnquiryForm from "@/components/enquiry-form"

export const metadata: Metadata = {
  title: "Contact Us | Al Thai Foods",
  description: "Get in touch with Al Thai Foods for premium flour products and solutions.",
}

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-10 md:pt-40 md:pb-16 bg-secondary/30 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Contact Us</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Have questions or need assistance? Our team is here to help you with all your flour needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Send Us a Message</h2>
              <EnquiryForm />
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Contact Information</h2>
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-primary-100 dark:bg-gray-700 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">Our Location</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Al Thai Foodstuff Trading LLC,
                      <br />
                      P.O. Box 21565, Ajman, UAE
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary-100 dark:bg-gray-700 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">Phone</h3>
                    <p className="text-gray-600 dark:text-gray-400">+971 65673141</p>
                    <p className="text-gray-600 dark:text-gray-400">+971 656731411 (WhatsApp)</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary-100 dark:bg-gray-700 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">Email</h3>
                    <p className="text-gray-600 dark:text-gray-400">althai.uae@gmail.com</p>
                    <p className="text-gray-600 dark:text-gray-400">sales@althaifoods.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary-100 dark:bg-gray-700 p-3 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">Business Hours</h3>
                    <p className="text-gray-600 dark:text-gray-400">Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p className="text-gray-600 dark:text-gray-400">Saturday: 9:00 AM - 1:00 PM</p>
                    <p className="text-gray-600 dark:text-gray-400">Sunday: Closed</p>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mt-8">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Connect With Us</h3>
                <div className="flex space-x-4">
                  {["facebook", "instagram", "linkedin", "twitter"].map((social) => (
                    <a
                      key={social}
                      href={`#${social}`}
                      className="bg-gray-100 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-gray-600 p-3 rounded-full transition-colors"
                    >
                      <Image
                        src={`/images/social/${social}.svg`}
                        alt={social}
                        width={24}
                        height={24}
                        className="h-5 w-5"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-900 dark:text-white">Find Us</h2>
          <div className="h-[400px] rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.9968080045223!2d55.43893!3d25.405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDI0JzE4LjAiTiA1NcKwMjYnMjAuMSJF!5e0!3m2!1sen!2sae!4v1619099038279!5m2!1sen!2sae"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  )
}
