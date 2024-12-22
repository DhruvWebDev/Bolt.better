'use client'

import { Link2, Sparkles } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { projectTypes } from '@/components/static-component/optionTypes'

export default function Page() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Grid Background */}
      <div 
        className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Gradient Blob */}
      <div 
        className="absolute -top-20 -left-20 h-[30rem] w-[30rem] rounded-full bg-violet-500/20 blur-[128px]" 
        style={{ filter: 'blur(128px)' }} 
      />
      <div 
        className="absolute -bottom-20 -right-20 h-[30rem] w-[30rem] rounded-full bg-blue-500/20 blur-[128px]" 
        style={{ filter: 'blur(128px)' }} 
      />

      {/* Content */}
      <div className="relative flex min-h-screen flex-col items-center justify-center px-4">
        <div className="w-full max-w-3xl space-y-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
              What do you want to build?
            </h1>
            <p className="mt-4 text-lg text-zinc-400">
              Prompt, run, edit, and deploy full-stack web apps.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute -inset-px bg-gradient-to-r from-violet-500 via-blue-500 to-violet-500 rounded-lg opacity-70 blur-sm group-hover:opacity-100 transition duration-500" />
            <Input 
              placeholder="How can Bolt help you today?"
              className="relative w-full bg-zinc-900/90 border-transparent text-white h-14 pl-4 pr-20 placeholder:text-zinc-500 focus:ring-2 focus:ring-violet-500 transition-all duration-300"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                <Link2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                <Sparkles className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-2 pt-4"
          >
            {projectTypes.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              >
                <Button
                  variant="secondary"
                  className="bg-zinc-900/90 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/90 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <a href={project.href}>{project.title}</a>
                </Button>
              </motion.div   >
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}