"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronRight } from "lucide-react"
import { useRef } from "react"

export function NewHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      ref={containerRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-violet-500/20 via-slate-900 to-slate-950" />
      
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight
              ],
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          style={{ y, opacity }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Glass effect badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-8"
          >
            <div className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 text-transparent bg-clip-text font-medium">
                Next Generation Development
              </span>
            </div>
          </motion.div>

          {/* Main heading with gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
          >
            <span className="inline-block bg-gradient-to-r from-white via-white/90 to-white/80 text-transparent bg-clip-text">
              Transforming Ideas into
            </span>
            <br />
            <span className="inline-block bg-gradient-to-r from-violet-400 via-indigo-400 to-purple-400 text-transparent bg-clip-text">
              Digital Excellence
            </span>
          </motion.h1>

          {/* Description with glass effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
              We craft cutting-edge digital solutions that blend innovation with 
              functionality. Experience the future of web development.
            </p>
          </motion.div>

          {/* CTA buttons with modern design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button
              size="lg"
              className="group bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-full px-8 py-6 text-lg font-medium transition-all duration-300 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/50"
            >
              Start Project
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 py-6 text-lg font-medium border-white/20 text-white hover:bg-white/10 transition-all duration-300"
            >
              Learn More
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>

          {/* Stats with glass morphism */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { label: "Projects", value: "200+" },
              { label: "Clients", value: "50+" },
              { label: "Awards", value: "15+" },
              { label: "Team Size", value: "25+" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
              >
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-white/60">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}