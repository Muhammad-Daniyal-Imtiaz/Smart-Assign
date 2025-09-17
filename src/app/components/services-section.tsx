// app/components/services-section.tsx
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
  Headphones,
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
    <Card
      className="group backdrop-blur-xl bg-gray-900/70 border border-green-700/50 
                 rounded-2xl shadow-lg hover:shadow-[0_8px_24px_rgba(90,150,100,0.6)] 
                 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      {service.image && (
        <div className="h-48 relative overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
        </div>
      )}
      <CardHeader>
        <div className="flex items-center space-x-3 mb-4">
          <div
            className="p-3 rounded-xl bg-gradient-to-tr from-green-500 to-emerald-400 text-white shadow-md 
                       group-hover:scale-110 transition-transform"
          >
            <service.icon className="h-6 w-6" />
          </div>
          <CardTitle className="text-lg font-semibold text-green-100">{service.title}</CardTitle>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed">{service.description}</p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 mb-6">
          {service.features.map((feature: string, idx: number) => (
            <li
              key={idx}
              className="text-sm text-gray-400 flex items-center group-hover:text-green-200 transition-colors"
            >
              <div className="w-1.5 h-1.5 bg-gradient-to-tr from-green-500 to-emerald-400 rounded-full mr-2" />
              {feature}
            </li>
          ))}
        </ul>
        <Button
          variant="outline"
          size="sm"
          className="w-full border border-green-600 text-green-200 rounded-full 
                     hover:bg-gradient-to-tr hover:from-green-500 hover:to-emerald-400 hover:text-white 
                     transition-all duration-300"
        >
          Learn More
        </Button>
      </CardContent>
    </Card>
  )

  if (!isMounted) {
    return (
      <section id="services" className="py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Our Micro-Services
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-4">
              Specialized services designed to help your business thrive in the digital era
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Intro */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Our Micro-Services
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-4">
            Specialized services designed to help your business thrive in the digital era
          </p>
        </div>

        {/* Core Services */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold mb-10 text-center text-green-200">
            Our Core Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreServices.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>

        {/* Additional Services */}
        <div>
          <h3 className="text-2xl font-semibold mb-10 text-center text-green-200">
            Additional Specialized Services
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