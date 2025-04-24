import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-950 border-t border-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image src="/images/logo.svg" alt="Al Thai Foods" width={150} height={60} className="h-14 w-auto" />
            </Link>
            <p className="text-gray-400 text-sm">
              Leading supplier of premium flour products in the UAE, committed to quality and excellence since our
              establishment in 1995.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 text-gray-400 hover:text-primary-600">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 text-gray-400 hover:text-primary-600">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 text-gray-400 hover:text-primary-600">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 text-gray-400 hover:text-primary-600">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-playfair text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-primary-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-primary-600 transition-colors">
                  Our Products
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-primary-600 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-primary-600 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-primary-600 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-playfair text-lg font-semibold mb-6 text-white">Products</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/products#wheat-flour" className="text-gray-400 hover:text-primary-600 transition-colors">
                  Premium Wheat Flour
                </Link>
              </li>
              <li>
                <Link
                  href="/products#specialty-flour"
                  className="text-gray-400 hover:text-primary-600 transition-colors"
                >
                  Specialty Flour
                </Link>
              </li>
              <li>
                <Link href="/products#organic-flour" className="text-gray-400 hover:text-primary-600 transition-colors">
                  Organic Flour
                </Link>
              </li>
              <li>
                <Link href="/products#bulk-orders" className="text-gray-400 hover:text-primary-600 transition-colors">
                  Bulk Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-playfair text-lg font-semibold mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">Al Thai Foodstuff Trading LLC, P.O. Box 21565, Ajman, UAE</span>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0" />
                <a href="tel:+9716567314" className="text-gray-400 hover:text-primary-600 transition-colors">
                  +971 65673141
                </a>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0" />
                <a
                  href="mailto:althai.uae@gmail.com"
                  className="text-gray-400 hover:text-primary-600 transition-colors"
                >
                  althai.uae@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">© {currentYear} Al Thai Foods. All Rights Reserved.</p>
            <div className="flex space-x-6">
              <Link href="/privacy-policy" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
