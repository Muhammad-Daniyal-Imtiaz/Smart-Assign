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
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-all duration-300"
      style={{
        background: "linear-gradient(90deg, #EFECE9 0%, #D1EBDB 25%, #959D90 50%, #D1EBDB 75%, #EFECE9 100%)",
        borderColor: "#959D90",
        boxShadow: "0 4px 16px rgba(149, 157, 144, 0.15)",
      }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div
              className="p-2 rounded-lg transition-all duration-300"
              style={{
                backgroundColor: "#305759",
                boxShadow: "0 2px 8px rgba(48, 87, 89, 0.2)",
              }}
            >
              <Zap className="h-5 w-5" style={{ color: "#EFECE9" }} />
            </div>
            <span className="text-xl font-bold" style={{ color: "#192524" }}>
              Smart Assign
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="font-medium transition-all duration-300 px-4 py-2 rounded-lg"
                style={{
                  color: "#192524",
                  backgroundColor: "transparent",
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
                {item.name}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeSwitcher />
            <Button
              className="font-semibold transition-all duration-300 px-6 py-2"
              style={{
                backgroundColor: "#192524",
                color: "#EFECE9",
                boxShadow: "0 2px 8px rgba(25, 37, 36, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#305759"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#192524"
              }}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeSwitcher />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="transition-all duration-300"
              style={{ color: "#192524" }}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            className="md:hidden mt-4 pb-4 border-t rounded-lg"
            style={{
              borderColor: "#959D90",
              backgroundColor: "rgba(209, 235, 219, 0.1)",
            }}
          >
            <nav className="flex flex-col space-y-2 mt-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left font-medium transition-all duration-300 px-4 py-2 rounded-lg"
                  style={{ color: "#192524" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#305759"
                    e.currentTarget.style.color = "#EFECE9"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent"
                    e.currentTarget.style.color = "#192524"
                  }}
                >
                  {item.name}
                </button>
              ))}
              <Button
                className="w-full mt-4 font-semibold"
                style={{
                  backgroundColor: "#192524",
                  color: "#EFECE9",
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
