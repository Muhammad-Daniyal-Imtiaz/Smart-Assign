"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b-4 border-[#2E8B57] shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo with zoom effect */}
          <div
            className="flex items-center justify-center transition-all duration-300 hover:scale-110 overflow-hidden"
            style={{
              backgroundColor: "rgba(239, 236, 233, 0.7)",
              border: "2px solid #2E8B57",
              boxShadow: "0 6px 16px rgba(46, 139, 87, 0.3)",
              borderRadius: "50%",
              width: "90px",
              height: "90px",
            }}
          >
            <img
              src="/smart.jpg"
              alt="Smart Assign Logo"
              className="h-16 w-auto object-contain scale-125"
              style={{ transform: "scale(1.4)" }}
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="font-medium text-[#2E8B57] transition-all duration-300 relative group px-4 py-2 rounded-lg border-2 border-[#2E8B57] hover:border-transparent hover:bg-[#2E8B57] hover:text-white"
              >
                {item.name}
                <span className="absolute inset-0 border-2 border-transparent group-hover:border-white group-hover:scale-105 transition-all duration-300 rounded-lg"></span>
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <button
              className="font-semibold transition-all duration-300 px-6 py-2 rounded-full bg-[#2E8B57] hover:bg-[#1f5f3d] text-white border-2 border-[#2E8B57] hover:border-[#1f5f3d] shadow-lg hover:shadow-emerald-200/50 hover:scale-105"
              onClick={() => scrollToSection("#contact")}
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-[#2E8B57] hover:text-white hover:bg-[#2E8B57] transition-colors duration-300 border-2 border-[#2E8B57]"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 bg-white border-2 border-[#2E8B57] rounded-xl shadow-lg">
            <nav className="flex flex-col space-y-3 p-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left font-medium text-[#2E8B57] transition-all duration-300 px-4 py-3 rounded-lg border-2 border-[#2E8B57] hover:border-transparent hover:bg-[#2E8B57] hover:text-white"
                >
                  {item.name}
                </button>
              ))}
              <button
                className="bg-[#2E8B57] hover:bg-[#1f5f3d] text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 mt-2 border-2 border-[#2E8B57] hover:border-[#1f5f3d]"
                onClick={() => scrollToSection("#contact")}
              >
                Get Started
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}