"use client"

import { Shield, Zap, Database, Cpu } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 top-16 sm:top-20 z-0">
        <Image
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop"
          alt="Background"
          fill
          className="object-cover object-center brightness-[0.7] contrast-100"
          priority
          sizes="100vw"
        />
        {/* Gradient overlays for better readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 via-transparent to-teal-600/30" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center text-center min-h-screen py-20 sm:py-28">
          {/* Headings */}
          <div className="mb-12 sm:mb-16 md:mb-20 max-w-4xl">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight drop-shadow-lg">
              <span className="text-white">Professional </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-300">
                Micro-Services
              </span>
            </h1>
            <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-medium text-gray-200 mt-6">
              For Growing Businesses Worldwide
            </h2>

            {/* CTA */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#services"
                className="inline-block bg-teal-500 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold shadow-xl hover:bg-teal-600 hover:shadow-teal-500/40 transition-all duration-300"
              >
                Get Started
              </a>
              <a
                href="#learn-more"
                className="inline-block border border-white/40 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl w-full">
            {[
              {
                icon: Shield,
                text: "Enterprise Security",
                desc: "Military-grade protection for your data and systems",
              },
              {
                icon: Zap,
                text: "Lightning Fast",
                desc: "Blazing performance for the best user experience",
              },
              {
                icon: Database,
                text: "Infinitely Scalable",
                desc: "Grow without limits with our elastic infrastructure",
              },
              {
                icon: Cpu,
                text: "AI-Powered",
                desc: "Intelligent solutions that learn and adapt to your needs",
              },
            ].map(({ icon: Icon, text, desc }, index) => (
              <div
                key={index}
                className="group backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-teal-400/50"
              >
                <div className="bg-gradient-to-r from-teal-500 to-cyan-400 p-4 rounded-full mb-5 shadow-md group-hover:shadow-teal-500/50 transition-all">
                  <Icon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </div>
                <h3 className="font-semibold text-lg sm:text-xl md:text-2xl text-white mb-2">
                  {text}
                </h3>
                <p className="text-sm sm:text-base text-gray-200 opacity-90 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
