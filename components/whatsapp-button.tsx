"use client"

import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function WhatsAppButton() {
  return (
    <motion.div
      className="fixed right-6 bottom-6 z-30"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <Button
        size="icon"
        className="h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#1fac54] text-white shadow-lg"
        onClick={() => window.open("https://wa.me/971656731411", "_blank")}
      >
        <Phone className="h-6 w-6" />
        <span className="sr-only">Contact via WhatsApp</span>
      </Button>
    </motion.div>
  )
}
