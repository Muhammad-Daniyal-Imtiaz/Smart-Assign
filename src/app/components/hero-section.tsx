"use client"

import { useState, useEffect } from "react"

export function HeroSection() {
  const [clients, setClients] = useState(0)
  const [projects, setProjects] = useState(0)
  const [revenue, setRevenue] = useState(0)
  const [years, setYears] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Set visibility for fade-in animation
    setIsVisible(true)
    
    // Animate counting up the stats
    const interval = setInterval(() => {
      setClients(prev => (prev < 500 ? prev + 10 : 500))
      setProjects(prev => (prev < 1200 ? prev + 24 : 1200))
      setRevenue(prev => (prev < 2.5 ? prev + 0.05 : 2.5))
      setYears(prev => (prev < 8 ? prev + 0.16 : 8))
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 text-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-12">
          <div className="text-2xl font-bold text-slate-800 transition-all duration-300 hover:scale-105">
            <span className="text-emerald-600">Eco</span>Services
          </div>
          <div className="hidden md:flex space-x-8">
            {["Home", "Services", "Portfolio", "Team", "Testimonials"].map((item) => (
              <a 
                key={item} 
                href="#" 
                className="text-slate-600 hover:text-emerald-600 transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-emerald-200">
            Get Started
          </button>
        </nav>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className={`transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-slate-900">
              Professional <span className="text-[#66CDAA]">Micro-Services</span> for Growing Businesses
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              We provide specialized, high-quality services that help businesses streamline operations and accelerate growth. From content creation to data management, we've got you covered.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-emerald-200">
                Explore Services
              </button>
              <button className="border border-emerald-300 text-emerald-700 hover:bg-emerald-50 px-8 py-4 rounded-lg font-medium transition-all duration-300 hover:shadow-md">
                View Portfolio
              </button>
            </div>

            <div className="mb-12">
              <p className="text-slate-500 mb-4">Trusted by industry leaders</p>
              <div className="flex gap-8 items-center">
                {["CLIENT", "BRAND", "CORP"].map((client) => (
                  <div 
                    key={client} 
                    className="bg-white px-6 py-3 rounded-lg font-medium text-slate-800 shadow-sm border border-emerald-100 transition-all duration-300 hover:shadow-md hover:border-emerald-300"
                  >
                    {client}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Dashboard */}
          <div className={`bg-white border border-emerald-200 rounded-xl p-8 shadow-xl transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-2xl font-bold mb-2 text-center text-emerald-700">Company Dashboard</h2>
            <p className="text-slate-600 text-center mb-8 font-light">Real-time metrics and achievements</p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              {/* Happy Clients */}
              <div className="bg-white p-6 rounded-lg text-center border border-slate-200 transition-all duration-500 hover:bg-[#004526] group cursor-pointer relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="text-4xl font-bold mb-2 text-black group-hover:text-white transition-colors duration-500 relative z-10">{clients}+</div>
                <div className="text-slate-600 group-hover:text-emerald-200 transition-colors duration-500 relative z-10">Happy Clients</div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
              
              {/* Projects Completed */}
              <div className="bg-white p-6 rounded-lg text-center border border-slate-200 transition-all duration-500 hover:bg-[#004526] group cursor-pointer relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="text-4xl font-bold mb-2 text-black group-hover:text-white transition-colors duration-500 relative z-10">{projects}+</div>
                <div className="text-slate-600 group-hover:text-emerald-200 transition-colors duration-500 relative z-10">Projects Completed</div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
              
              {/* Revenue Generated */}
              <div className="bg-white p-6 rounded-lg text-center border border-slate-200 transition-all duration-500 hover:bg-[#004526] group cursor-pointer relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="text-4xl font-bold mb-2 text-black group-hover:text-white transition-colors duration-500 relative z-10">${revenue.toFixed(1)}M+</div>
                <div className="text-slate-600 group-hover:text-emerald-200 transition-colors duration-500 relative z-10">Revenue Generated</div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
              
              {/* Years in Business */}
              <div className="bg-white p-6 rounded-lg text-center border border-slate-200 transition-all duration-500 hover:bg-[#004526] group cursor-pointer relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="text-4xl font-bold mb-2 text-black group-hover:text-white transition-colors duration-500 relative z-10">{years.toFixed(0)}+</div>
                <div className="text-slate-600 group-hover:text-emerald-200 transition-colors duration-500 relative z-10">Years in Business</div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-medium mb-4 text-slate-700">Market Presence</h3>
              <div className="flex justify-between mb-2">
                <span className="text-slate-600">North America</span>
                <span className="font-medium text-slate-800">45%</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full mb-4 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: isVisible ? "45%" : "0%" }}
                ></div>
              </div>
              
              <div className="flex justify-between mb-2">
                <span className="text-slate-600">Europe</span>
                <span className="font-medium text-slate-800">35%</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full mb-4 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: isVisible ? "35%" : "0%" }}
                ></div>
              </div>
              
              <div className="flex justify-between mb-2">
                <span className="text-slate-600">Asia Pacific</span>
                <span className="font-medium text-slate-800">20%</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: isVisible ? "20%" : "0%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}