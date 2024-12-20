'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { Home, AlertTriangle } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      {/* Content */}
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AlertTriangle className="h-24 w-24 text-yellow-500 mx-auto mb-6" />
        </motion.div>
        <motion.h2
          className="text-4xl font-bold mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Not Found
        </motion.h2>
        <motion.p
          className="text-xl text-gray-400 mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Could not find the requested resource
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link href="/" passHref>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Animated background elements */}
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute bg-blue-500 rounded-full opacity-10"
          style={{
            width: Math.random() * 300 + 50,
            height: Math.random() * 300 + 50,
          }}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  )
}