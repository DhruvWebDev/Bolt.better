'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Code, Zap, Globe } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: <Code className="h-6 w-6" />,
    title: "Intelligent Code Generation",
    description: "Bolt.newer uses advanced AI to generate high-quality, customizable code for your projects.",
    gradient: "from-blue-500 via-cyan-300 to-green-500"
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Lightning-Fast Development",
    description: "Accelerate your development process with our intuitive tools and streamlined workflows.",
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Seamless Deployment",
    description: "Deploy your applications with ease to various platforms and cloud services.",
    gradient: "from-purple-500 to-pink-500"
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-blue-500">
            About Bolt.newer
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Empowering developers to build, run, and deploy full-stack web applications with unprecedented speed and efficiency.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <Card key={index} className="bg-zinc-900 border-zinc-800 overflow-hidden group relative">
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center text-xl font-bold">
                  <span className="bg-zinc-800 p-2 rounded-full mr-2 group-hover:bg-black transition-colors duration-300">
                    {feature.icon}
                  </span>
                  <span className={`bg-clip-text text-transparent bg-gradient-to-r ${feature.gradient} group-hover:text-white transition-all duration-300`}>
                    {feature.title}
                  </span>
                </CardTitle>
              </CardHeader>
              {index === 0 && (
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-cyan-300 to-green-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              )}
              <CardContent className="relative z-10">
                <CardDescription className="text-zinc-400">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-blue-500">
            Ready to revolutionize your development process?
          </h2>
          <p className="text-xl text-zinc-400 mb-8">
            Join thousands of developers who are already using Bolt.newer to build amazing applications.
          </p>
          <Button className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white" size="lg">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}