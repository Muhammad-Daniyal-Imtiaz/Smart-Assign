"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Star, Shield, Zap, Database, Cpu } from "lucide-react"

export function HeroSection() {
  const clientLogos = ["Microsoft", "Google", "Amazon", "Apple", "Meta", "Netflix"]

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #EFECE9 0%, #D1EBDB 30%, #959D90 70%, #D1EBDB 100%)",
      }}
    >
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-balance leading-tight mb-4">
              <span style={{ color: "#192524" }}>Professional </span>
              <span style={{ color: "#305759" }}>Micro-Services</span>
              <br />
              <span style={{ color: "#192524" }}>for Growing Businesses</span>
            </h1>
          </div>

          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              { icon: Shield, text: "Enterprise Security" },
              { icon: Zap, text: "Lightning Fast" },
              { icon: Database, text: "Infinitely Scalable" },
              { icon: Cpu, text: "AI-Powered" },
            ].map(({ icon: Icon, text }, index) => (
              <div
                key={index}
                className="backdrop-blur-sm border px-4 py-2 rounded-lg transition-all duration-300"
                style={{
                  backgroundColor: "rgba(239, 236, 233, 0.8)",
                  borderColor: "#959D90",
                }}
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" style={{ color: "#305759" }} />
                  <span className="font-medium text-sm" style={{ color: "#192524" }}>
                    {text}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-10">
            <p
              className="text-lg md:text-xl leading-relaxed font-medium max-w-3xl mx-auto"
              style={{ color: "#192524" }}
            >
              We deliver specialized, enterprise-grade micro-services that streamline operations and accelerate growth.
              From intelligent automation to scalable data solutions, we provide the foundation for your digital
              transformation.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="text-lg font-semibold rounded-lg transition-all duration-300 px-8 py-3"
              style={{
                backgroundColor: "#192524",
                color: "#EFECE9",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#305759"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#192524"
              }}
            >
              Explore Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg font-semibold rounded-lg transition-all duration-300 px-8 py-3 bg-transparent"
              style={{
                backgroundColor: "transparent",
                color: "#192524",
                borderColor: "#305759",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#305759"
                e.currentTarget.style.color = "#EFECE9"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent"
                e.currentTarget.style.color = "#192524"
              }}
            >
              <Play className="mr-2 h-5 w-5" />
              View Portfolio
            </Button>
          </div>

          {/* Client logos */}
          <div className="mb-8">
            <div
              className="backdrop-blur-sm rounded-xl p-6 border"
              style={{
                backgroundColor: "rgba(209, 235, 219, 0.3)",
                borderColor: "#959D90",
              }}
            >
              <p className="text-sm font-medium mb-6" style={{ color: "#192524" }}>
                Trusted by industry leaders
              </p>
              <div className="flex flex-wrap justify-center items-center gap-6">
                {clientLogos.map((logo, index) => (
                  <div
                    key={index}
                    className="px-6 py-3 rounded-lg transition-all duration-300"
                    style={{
                      backgroundColor: "rgba(239, 236, 233, 0.6)",
                      borderColor: "#959D90",
                    }}
                  >
                    <span className="font-medium text-sm" style={{ color: "#192524" }}>
                      {logo}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div
            className="inline-flex items-center gap-3 backdrop-blur-sm rounded-lg px-6 py-3 border"
            style={{
              backgroundColor: "rgba(239, 236, 233, 0.6)",
              borderColor: "#959D90",
            }}
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="font-medium text-sm" style={{ color: "#192524" }}>
              4.9/5 from 500+ reviews
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
