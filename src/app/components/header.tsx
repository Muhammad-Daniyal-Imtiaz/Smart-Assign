"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeSwitcher } from "./theme-switcher"
import { Menu, X, Zap } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Team", href: "#team" },
    { name: "Testimonials", href: "#testimonials" },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: "linear-gradient(90deg, #EFECE9 0%, #D1EBDB 25%, #959D90 50%, #D1EBDB 75%, #EFECE9 100%)",
        boxShadow: "0 4px 20px rgba(25, 37, 36, 0.2)",
        borderBottom: "2px solid #1A3A3C"
      }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 p-2 rounded-xl transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: "rgba(239, 236, 233, 0.7)",
              border: "2px solid #1A3A3C",
              boxShadow: "0 4px 12px rgba(26, 58, 60, 0.2)"
            }}
          >
            <div
              className="p-2 rounded-lg transition-all duration-300"
              style={{
                backgroundColor: "#305759",
                boxShadow: "0 2px 8px rgba(48, 87, 89, 0.3)",
              }}
            >
              <Zap className="h-5 w-5" style={{ color: "#EFECE9" }} />
            </div>
            <span className="text-xl font-bold" style={{ color: "#192524" }}>
              Smart Assign
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="font-medium transition-all duration-300 px-4 py-2 rounded-xl relative group"
                style={{
                  color: "#192524",
                  backgroundColor: "rgba(239, 236, 233, 0.7)",
                  border: "2px solid #1A3A3C",
                  boxShadow: "0 2px 6px rgba(26, 58, 60, 0.15)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#305759"
                  e.currentTarget.style.color = "#EFECE9"
                  e.currentTarget.style.transform = "scale(1.05)"
                  e.currentTarget.style.boxShadow = "0 6px 16px rgba(48, 87, 89, 0.3)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(239, 236, 233, 0.7)"
                  e.currentTarget.style.color = "#192524"
                  e.currentTarget.style.transform = "scale(1)"
                  e.currentTarget.style.boxShadow = "0 2px 6px rgba(26, 58, 60, 0.15)"
                }}
              >
                {item.name}
                <span 
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#EFECE9] transition-all duration-300 group-hover:w-full"
                ></span>
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <div 
              className="transition-all duration-300 hover:scale-110"
              style={{
                border: "2px solid #1A3A3C",
                borderRadius: "12px",
                backgroundColor: "rgba(239, 236, 233, 0.7)",
                boxShadow: "0 2px 6px rgba(26, 58, 60, 0.15)"
              }}
            >
              <ThemeSwitcher />
            </div>
            <Button
              className="font-semibold transition-all duration-300 px-6 py-2 rounded-xl"
              style={{
                backgroundColor: "#192524",
                color: "#EFECE9",
                border: "2px solid #1A3A3C",
                boxShadow: "0 4px 12px rgba(25, 37, 36, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#305759"
                e.currentTarget.style.transform = "scale(1.05)"
                e.currentTarget.style.boxShadow = "0 6px 16px rgba(48, 87, 89, 0.4)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#192524"
                e.currentTarget.style.transform = "scale(1)"
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(25, 37, 36, 0.3)"
              }}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <div 
              className="transition-all duration-300"
              style={{
                border: "2px solid #1A3A3C",
                borderRadius: "8px",
                backgroundColor: "rgba(239, 236, 233, 0.7)",
              }}
            >
              <ThemeSwitcher />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="transition-all duration-300 rounded-xl"
              style={{ 
                color: "#192524",
                border: "2px solid #1A3A3C",
                backgroundColor: "rgba(239, 236, 233, 0.7)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#305759"
                e.currentTarget.style.color = "#EFECE9"
                e.currentTarget.style.transform = "scale(1.05)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(239, 236, 233, 0.7)"
                e.currentTarget.style.color = "#192524"
                e.currentTarget.style.transform = "scale(1)"
              }}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            className="md:hidden mt-4 pb-4 rounded-xl"
            style={{
              border: "2px solid #1A3A3C",
              backgroundColor: "rgba(239, 236, 233, 0.9)",
              boxShadow: "0 8px 24px rgba(26, 58, 60, 0.2)"
            }}
          >
            <nav className="flex flex-col space-y-3 mt-4 p-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left font-medium transition-all duration-300 px-4 py-3 rounded-lg"
                  style={{ 
                    color: "#192524",
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    border: "2px solid #1A3A3C"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#305759"
                    e.currentTarget.style.color = "#EFECE9"
                    e.currentTarget.style.transform = "scale(1.02)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.7)"
                    e.currentTarget.style.color = "#192524"
                    e.currentTarget.style.transform = "scale(1)"
                  }}
                >
                  {item.name}
                </button>
              ))}
              <Button
                className="w-full mt-2 font-semibold py-3 rounded-lg transition-all duration-300"
                style={{
                  backgroundColor: "#192524",
                  color: "#EFECE9",
                  border: "2px solid #1A3A3C"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#305759"
                  e.currentTarget.style.transform = "scale(1.02)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#192524"
                  e.currentTarget.style.transform = "scale(1)"
                }}
              >
                Get Started
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}