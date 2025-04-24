"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Linkedin, Twitter, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TeamMemberProps {
  member: {
    name: string
    position: string
    image: string
    bio: string
  }
  index: number
}

export default function TeamMember({ member, index }: TeamMemberProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="bg-gray-900 rounded-2xl overflow-hidden">
        <div className="relative h-80 overflow-hidden">
          <Image
            src={member.image || "/placeholder.svg"}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />

          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
            <p className="text-gray-300 text-sm">{member.position}</p>
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-400 mb-4">{member.bio}</p>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-9 w-9 text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-9 w-9 text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-9 w-9 text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
