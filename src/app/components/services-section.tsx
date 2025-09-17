"use client"

import { useState, useEffect } from "react"
import { 
  Code, 
  Palette, 
  BarChart3, 
  Shield, 
  Smartphone, 
  Globe, 
  Database, 
  MessageSquare, 
  Search, 
  Mail, 
  Camera, 
  Headphones 
} from "lucide-react"
import Image from "next/image"

interface Service {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  features: string[]
  image?: string
}

export function ServicesSection() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const coreServices: Service[] = [
    {
      icon: Code,
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies",
      features: ["Responsive Design", "Performance Optimization", "SEO Ready", "Cross-browser Compatible"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android",
      features: ["Native Performance", "Cross-platform", "App Store Optimization", "Push Notifications"],
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Beautiful and intuitive user interfaces that enhance user experience",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
      image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: BarChart3,
      title: "Digital Marketing",
      description: "Comprehensive digital marketing strategies to grow your online presence",
      features: ["Social Media Marketing", "Content Strategy", "PPC Campaigns", "Analytics & Reporting"],
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8f5a07a?auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: Database,
      title: "Data Management",
      description: "Efficient data storage, processing, and analytics solutions",
      features: ["Database Design", "Data Migration", "Analytics Dashboard", "Real-time Processing"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description: "Protect your business with comprehensive security solutions",
      features: ["Security Audits", "Penetration Testing", "Compliance", "Incident Response"],
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80"
    },
  ]

  const additionalServices: Service[] = [
    {
      icon: Globe,
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and migration services",
      features: ["Cloud Migration", "Infrastructure Setup", "Cost Optimization", "24/7 Monitoring"],
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: MessageSquare,
      title: "Content Creation",
      description: "High-quality content that engages your audience",
      features: ["Blog Writing", "Video Production", "Graphic Design", "Social Media Content"],
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: Search,
      title: "SEO Optimization",
      description: "Improve your search engine rankings and organic traffic",
      features: ["Keyword Research", "On-page SEO", "Link Building", "Technical SEO"],
      image: "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: Mail,
      title: "Email Marketing",
      description: "Targeted email campaigns that convert prospects into customers",
      features: ["Campaign Design", "Automation", "A/B Testing", "Performance Analytics"],
      image: "https://images.unsplash.com/photo-1498758531782-7e826a2aaae1?auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: Camera,
      title: "Photography",
      description: "Professional photography services for your business needs",
      features: ["Product Photography", "Corporate Headshots", "Event Coverage", "Photo Editing"],
      image: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: Headphones,
      title: "Customer Support",
      description: "24/7 customer support solutions to keep your clients happy",
      features: ["Live Chat", "Help Desk", "Knowledge Base", "Multi-channel Support"],
      image: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?auto=format&fit=crop&w=800&q=80"
    },
  ]

  const ServiceCard = ({ service }: { service: Service }) => (
    <div className="bg-white border border-emerald-200 rounded-2xl shadow-lg p-6 
                   transition-all duration-300 hover:shadow-xl hover:-translate-y-1 
                   overflow-hidden group">
      {service.image && (
        <div className="h-48 relative overflow-hidden rounded-lg mb-6">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-3 rounded-xl bg-emerald-100 text-emerald-700 shadow-sm 
                       group-hover:bg-emerald-500 group-hover:text-white transition-colors">
          <service.icon className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
          {service.title}
        </h3>
      </div>
      <p className="text-slate-600 text-sm leading-relaxed mb-4">{service.description}</p>
      <ul className="space-y-2 mb-6">
        {service.features.map((feature: string, idx: number) => (
          <li
            key={idx}
            className="text-sm text-slate-600 flex items-center group-hover:text-emerald-600 transition-colors"
          >
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2" />
            {feature}
          </li>
        ))}
      </ul>
      <button
        className="w-full py-2 px-4 border border-emerald-300 text-emerald-700 rounded-full 
                   hover:bg-emerald-500 hover:text-white hover:border-emerald-500
                   transition-all duration-300 text-sm font-medium"
      >
        Learn More
      </button>
    </div>
  )

  if (!isMounted) {
    return (
      <section id="services" className="py-20 bg-emerald-50/30 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
              Our <span className="text-emerald-600">Micro-Services</span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto mt-4">
              Specialized services designed to help your business thrive in the digital era
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="services" className="py-20 bg-emerald-50/30 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(167,243,208,0.2),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(167,243,208,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(167,243,208,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Intro */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            Our <span className="text-emerald-600">Micro-Services</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto mt-4">
            Specialized services designed to help your business thrive in the digital era
          </p>
        </div>

        {/* Core Services */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-10 text-center text-emerald-700">
            Core Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreServices.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>

        {/* Additional Services */}
        <div>
          <h3 className="text-2xl font-semibold mb-10 text-center text-emerald-700">
            Additional Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}