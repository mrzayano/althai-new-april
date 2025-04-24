"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Send } from "lucide-react"
import { motion } from "framer-motion"

const faqCategories = [
  {
    id: "products",
    label: "Products",
    questions: [
      {
        question: "What types of flour does Al Thai Foods offer?",
        answer:
          "Al Thai Foods offers a wide range of flour products including premium wheat flour, whole wheat flour (chakki atta), specialty pastry flour, bread flour, organic varieties, and customized blends for commercial bakeries.",
      },
      {
        question: "Are your flour products certified?",
        answer:
          "Yes, all our flour products meet strict quality standards and are certified by relevant food safety authorities in the UAE. Our organic products carry additional organic certification from recognized international bodies.",
      },
      {
        question: "What is the difference between your Premium Wheat Flour and regular flour?",
        answer:
          "Our Premium Wheat Flour is made from specially selected high-quality wheat varieties with optimal protein content. It undergoes more refined milling processes, resulting in consistent performance, superior texture, and enhanced flavor in the final baked goods.",
      },
      {
        question: "How long is the shelf life of your flour products?",
        answer:
          "The shelf life of our flour products varies between 6-12 months when stored properly in a cool, dry place. The exact shelf life is indicated on each product package along with the manufacturing and expiry dates.",
      },
      {
        question: "Do you offer gluten-free flour options?",
        answer:
          "Yes, we offer specially formulated gluten-free flour blends designed to provide excellent baking results for those with gluten sensitivities or preferences. Our gluten-free products are processed in dedicated facilities to prevent cross-contamination.",
      },
    ],
  },
  {
    id: "ordering",
    label: "Ordering & Delivery",
    questions: [
      {
        question: "What is the minimum order quantity?",
        answer:
          "For retail customers, there is no minimum order requirement. For wholesale and commercial clients, the minimum order quantity is typically 100kg, though this may vary based on specific product types and delivery locations.",
      },
      {
        question: "Do you offer delivery services?",
        answer:
          "Yes, we provide delivery services across the UAE. Delivery times and fees vary depending on your location and order size. For bulk orders, we offer free delivery within the major cities of the UAE.",
      },
      {
        question: "How can I place a bulk order?",
        answer:
          "Bulk orders can be placed by contacting our sales team directly via phone at +971 65673141 or by email at althai.uae@gmail.com. You can also use the contact form on our website, and a representative will reach out to discuss your requirements.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept various payment methods including bank transfers, credit/debit cards, and cash on delivery for certain order types. For regular commercial clients, we also offer credit terms subject to approval.",
      },
      {
        question: "How quickly can you fulfill urgent orders?",
        answer:
          "For urgent orders, we offer expedited processing and delivery. Depending on your location and the products ordered, we can often arrange same-day or next-day delivery within major UAE cities. Additional fees may apply for express service.",
      },
    ],
  },
  {
    id: "storage",
    label: "Storage & Usage",
    questions: [
      {
        question: "What is the best way to store flour?",
        answer:
          "For optimal freshness, store flour in an airtight container in a cool, dry place away from direct sunlight. For long-term storage, especially in humid environments, refrigeration or freezing can extend shelf life. Always ensure the flour is at room temperature before using it for baking.",
      },
      {
        question: "Why does flour need to be sifted before use?",
        answer:
          "Sifting flour aerates it, resulting in lighter baked goods. It also helps break up any clumps and evenly distributes dry ingredients when sifted together. For most modern commercially milled flours like ours, sifting is optional but can still improve texture in delicate baked goods.",
      },
      {
        question: "Which flour is best for making bread?",
        answer:
          "Our Bread Flour or High-Protein Wheat Flour is ideal for bread making. These flours have a higher protein content (12-14%), which develops strong gluten networks necessary for the structure and texture of good bread.",
      },
      {
        question: "Which flour should I use for cakes and pastries?",
        answer:
          "Our Specialty Pastry Flour or All-Purpose Flour with lower protein content (8-10%) is perfect for cakes and pastries. The lower protein content results in less gluten development, yielding tender, delicate baked goods.",
      },
      {
        question: "Can I substitute one type of flour for another?",
        answer:
          "While substitutions are possible, they may affect the final outcome of your recipe. Generally, you can substitute all-purpose flour for bread flour (resulting in slightly less chewy bread) or for cake flour (resulting in slightly tougher cakes). For specific advice on substitutions, please contact our customer support.",
      },
    ],
  },
  {
    id: "business",
    label: "Business & Partnerships",
    questions: [
      {
        question: "Do you offer private labeling or custom packaging?",
        answer:
          "Yes, we offer private labeling and custom packaging services for business clients. Minimum order quantities apply. Contact our business development team to discuss your specific requirements and branding needs.",
      },
      {
        question: "Can you create custom flour blends for my business?",
        answer:
          "Absolutely. We specialize in creating custom flour blends tailored to specific baking needs. Whether you're looking for a particular protein content, extraction rate, or specialty ingredient mix, our food scientists can work with you to develop the perfect custom flour solution.",
      },
      {
        question: "Do you offer sampling for business clients?",
        answer:
          "Yes, we provide product samples to qualified business clients to ensure our flour meets your specific requirements before placing larger orders. Please contact our sales team to arrange for product sampling.",
      },
      {
        question: "What support do you provide to bakery businesses?",
        answer:
          "Beyond supplying premium flour products, we offer technical support, recipe development assistance, troubleshooting help, and baking technique consultations. Our team of food technologists can visit your facility to provide on-site support as needed.",
      },
      {
        question: "Do you export to countries outside the UAE?",
        answer:
          "Yes, we export our flour products to several countries in the GCC region and beyond. Export terms, minimum quantities, and shipping arrangements vary by destination. Please contact our export department for specific information about your region.",
      },
    ],
  },
]

export default function FaqClientPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredQuestions, setFilteredQuestions] = useState<any[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredQuestions([])
      setHasSearched(false)
      return
    }

    const results = faqCategories.flatMap((category) =>
      category.questions
        .filter(
          (q) =>
            q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        .map((q) => ({ ...q, category: category.label })),
    )

    setFilteredQuestions(results)
    setHasSearched(true)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-10 md:pt-40 md:pb-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Find answers to common questions about our flour products, ordering, delivery, and more.
            </p>
            <div className="flex max-w-xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search for answers..."
                  className="pl-10 rounded-r-none border-r-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <Button onClick={handleSearch} className="rounded-l-none">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {hasSearched ? (
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">
                  Search Results: {filteredQuestions.length} {filteredQuestions.length === 1 ? "answer" : "answers"}{" "}
                  found
                </h2>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setHasSearched(false)
                  }}
                >
                  Clear Search
                </Button>
              </div>

              {filteredQuestions.length > 0 ? (
                <Accordion type="single" collapsible className="space-y-4">
                  {filteredQuestions.map((q, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <AccordionItem value={`search-${idx}`} className="border rounded-lg px-2">
                        <AccordionTrigger className="text-left hover:no-underline py-4">
                          <div>
                            <p className="font-medium">{q.question}</p>
                            <p className="text-sm text-gray-500 mt-1">Category: {q.category}</p>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="py-4 px-2">
                          <p className="text-gray-700 dark:text-gray-300">{q.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">No results found for "{searchQuery}"</p>
                  <p className="text-sm">Try using different keywords or browse our FAQ categories below</p>
                </div>
              )}
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <Tabs defaultValue="products">
                <TabsList className="w-full mb-8">
                  {faqCategories.map((category) => (
                    <TabsTrigger key={category.id} value={category.id} className="flex-1">
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {faqCategories.map((category) => (
                  <TabsContent key={category.id} value={category.id}>
                    <Accordion type="single" collapsible className="space-y-4">
                      {category.questions.map((q, idx) => (
                        <AccordionItem key={idx} value={`item-${idx}`} className="border rounded-lg px-2">
                          <AccordionTrigger className="text-left hover:no-underline py-4">
                            <p className="font-medium">{q.question}</p>
                          </AccordionTrigger>
                          <AccordionContent className="py-4 px-2">
                            <p className="text-gray-700 dark:text-gray-300">{q.answer}</p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          )}

          {/* Contact Section */}
          <div className="max-w-2xl mx-auto mt-16 pt-8 border-t">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Still have questions?</h2>
              <p className="text-gray-600 dark:text-gray-400">
                If you can't find the answer you're looking for, please contact our support team.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 border rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Name
                  </label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="question" className="block text-sm font-medium mb-1">
                  Your Question
                </label>
                <textarea
                  id="question"
                  rows={4}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Type your question here..."
                ></textarea>
              </div>
              <Button className="w-full">
                Send Question <Send className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
