import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Terms of Service | Al Thai Foods",
  description: "Terms of Service for Al Thai Foods website and services.",
}

export default function TermsOfServicePage() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-10 md:pt-40 md:pb-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">Last updated: April 26, 2023</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
            <p>
              Please read these Terms of Service ("Terms") carefully before using the website and services offered by Al
              Thai Foods ("we," "us," or "our").
            </p>

            <h2>Acceptance of Terms</h2>
            <p>
              By accessing or using our website (the "Site") and services, you agree to be bound by these Terms. If you
              do not agree to these Terms, you may not access or use our services.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We may modify these Terms at any time. If we make changes, we will provide notice of such changes, such as
              by sending an email notification, providing notice through our services, or updating the date at the top
              of these Terms. Unless we say otherwise, the amended Terms will be effective immediately, and your
              continued use of our services after we provide such notice will confirm your acceptance of the changes. If
              you do not agree to the amended Terms, you must stop using our services.
            </p>

            <h2>Privacy Policy</h2>
            <p>
              Please refer to our <Link href="/privacy-policy">Privacy Policy</Link> for information on how we collect,
              use, and disclose information from our users.
            </p>

            <h2>Use of Services</h2>
            <h3>Eligibility</h3>
            <p>
              You must be at least 18 years of age to access or use our services. By accessing or using our services,
              you represent and warrant that you are 18 years of age or older.
            </p>

            <h3>Account Registration</h3>
            <p>
              To access certain features of our services, you may be required to register for an account. When you
              register for an account, you may be required to provide us with some information about yourself, such as
              your name, email address, or other contact information. You agree that the information you provide to us
              is accurate and that you will keep it accurate and up-to-date at all times.
            </p>

            <h3>Account Security</h3>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and for all activities
              that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
            </p>

            <h2>Products and Orders</h2>
            <h3>Product Information</h3>
            <p>
              We strive to provide accurate product descriptions, pricing, and availability information. However, we do
              not warrant that product descriptions, pricing, or other content on our Site is accurate, complete,
              reliable, current, or error-free.
            </p>

            <h3>Orders</h3>
            <p>
              When you place an order through our Site, you are making an offer to purchase the products you have
              selected. We reserve the right to accept or decline your order for any reason, including but not limited
              to product availability, errors in product or pricing information, or problems identified by our credit
              and fraud avoidance department.
            </p>

            <h3>Shipping and Delivery</h3>
            <p>
              Shipping and delivery terms are as specified at the time of your order. We are not responsible for delays
              in delivery caused by circumstances beyond our reasonable control.
            </p>

            <h2>Intellectual Property</h2>
            <p>
              Our services and all content and materials included on our Site, including but not limited to text,
              graphics, logos, button icons, images, audio clips, data compilations, and software, and the compilation
              thereof (collectively, the "Content") are the property of Al Thai Foods or our licensors and are protected
              by copyright, trademark, and other laws.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, Al Thai Foods and its officers, employees, agents,
              affiliates, and partners shall not be liable for any indirect, incidental, special, consequential, or
              punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible
              losses, resulting from (i) your access to or use of or inability to access or use the services; (ii) any
              conduct or content of any third party on the services; (iii) any content obtained from the services; and
              (iv) unauthorized access, use, or alteration of your transmissions or content, whether based on warranty,
              contract, tort (including negligence), or any other legal theory, whether or not we have been informed of
              the possibility of such damage.
            </p>

            <h2>Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless Al Thai Foods and its officers, directors, employees,
              and agents from and against any claims, liabilities, damages, losses, and expenses, including, without
              limitation, reasonable legal and accounting fees, arising out of or in any way connected with your access
              to or use of the services or your violation of these Terms.
            </p>

            <h2>Governing Law</h2>
            <p>
              These Terms and your access to and use of the services shall be governed by and construed and enforced in
              accordance with the laws of the United Arab Emirates, without regard to conflict of law rules or
              principles.
            </p>

            <h2>Dispute Resolution</h2>
            <p>
              Any dispute arising from or relating to the subject matter of these Terms shall be finally settled by
              arbitration in Ajman, UAE, using the English language in accordance with the Arbitration Rules and
              Procedures of the United Arab Emirates then in effect.
            </p>

            <h2>Termination</h2>
            <p>
              We may terminate or suspend your access to and use of the services, at our sole discretion, at any time
              and without notice to you. Upon any termination, discontinuation, or cancellation of the services, all
              provisions of these Terms which by their nature should survive will survive, including, without
              limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
            </p>

            <h2>Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at:</p>
            <p>
              Al Thai Foodstuff Trading LLC
              <br />
              P.O. Box 21565
              <br />
              Ajman, UAE
              <br />
              Email: legal@althaifoods.com
              <br />
              Phone: +971 65673141
            </p>
          </div>

          <div className="max-w-3xl mx-auto mt-12">
            <Button variant="outline" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
