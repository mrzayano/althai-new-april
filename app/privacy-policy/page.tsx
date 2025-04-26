import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Privacy Policy | Al Thai Foods",
  description: "Privacy Policy for Al Thai Foods website and services.",
}

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-10 md:pt-40 md:pb-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">Last updated: April 26, 2023</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
            <p>
              This Privacy Policy describes how Al Thai Foods ("we," "us," or "our") collects, uses, and discloses your
              information when you use our website (the "Site") and our services.
            </p>

            <h2>Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, such as when you create an account, fill out a
              form, submit or post content, make a purchase, communicate with us, or participate in any interactive
              features of our services.
            </p>

            <h3>Personal Information</h3>
            <p>Personal information we may collect includes:</p>
            <ul>
              <li>Name, email address, postal address, phone number, and other contact information</li>
              <li>Account credentials, such as username and password</li>
              <li>Payment information</li>
              <li>Business information, such as company name, job title, and business contact details</li>
              <li>Any other information you choose to provide</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <p>When you access or use our services, we automatically collect certain information, including:</p>
            <ul>
              <li>
                <strong>Log Information:</strong> We collect log information about your use of our services, including
                the type of browser you use, access times, pages viewed, your IP address, and the page you visited
                before navigating to our services.
              </li>
              <li>
                <strong>Device Information:</strong> We collect information about the computer or mobile device you use
                to access our services, including the hardware model, operating system and version, unique device
                identifiers, and mobile network information.
              </li>
              <li>
                <strong>Location Information:</strong> We may collect information about the precise location of your
                device when you consent to the collection of this information. We may also collect information about
                your approximate location each time you access our services.
              </li>
              <li>
                <strong>Cookies and Similar Technologies:</strong> We use cookies, web beacons, and other tracking
                technologies to collect information about you when you interact with our services or emails, including
                information about your browsing behavior on our Site.
              </li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information, including confirmations and invoices</li>
              <li>Send you technical notices, updates, security alerts, and support and administrative messages</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Communicate with you about products, services, offers, promotions, and events</li>
              <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
              <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
              <li>
                Personalize and improve the services and provide content or features that match user profiles or
                interests
              </li>
            </ul>

            <h2>Sharing of Information</h2>
            <p>We may share information about you as follows:</p>
            <ul>
              <li>
                With vendors, consultants, and other service providers who need access to such information to carry out
                work on our behalf
              </li>
              <li>
                In response to a request for information if we believe disclosure is in accordance with any applicable
                law, regulation, or legal process
              </li>
              <li>
                If we believe your actions are inconsistent with our user agreements or policies, or to protect the
                rights, property, and safety of Al Thai Foods or others
              </li>
              <li>
                In connection with, or during negotiations of, any merger, sale of company assets, financing, or
                acquisition of all or a portion of our business by another company
              </li>
              <li>With your consent or at your direction</li>
            </ul>

            <h2>Data Security</h2>
            <p>
              We take reasonable measures to help protect information about you from loss, theft, misuse, and
              unauthorized access, disclosure, alteration, and destruction.
            </p>

            <h2>Your Choices</h2>
            <h3>Account Information</h3>
            <p>
              You may update, correct, or delete information about you at any time by logging into your online account
              or emailing us at privacy@althaifoods.com. If you wish to delete or deactivate your account, please email
              us, but note that we may retain certain information as required by law or for legitimate business
              purposes.
            </p>

            <h3>Cookies</h3>
            <p>
              Most web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your
              browser to remove or reject browser cookies. Please note that if you choose to remove or reject cookies,
              this could affect the availability and functionality of our services.
            </p>

            <h3>Promotional Communications</h3>
            <p>
              You may opt out of receiving promotional emails from Al Thai Foods by following the instructions in those
              emails. If you opt out, we may still send you non-promotional emails, such as those about your account or
              our ongoing business relations.
            </p>

            <h2>Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p>
              Al Thai Foodstuff Trading LLC
              <br />
              P.O. Box 21565
              <br />
              Ajman, UAE
              <br />
              Email: privacy@althaifoods.com
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
