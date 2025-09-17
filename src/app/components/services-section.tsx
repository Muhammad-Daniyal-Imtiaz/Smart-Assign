"use client"

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

interface Service {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  features: string[]
}

export function ServicesSection() {
  const coreServices: Service[] = [
    {
      icon: Code,
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies",
      features: ["Responsive Design", "Performance Optimization", "SEO Ready", "Cross-browser Compatible"],
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android",
      features: ["Native Performance", "Cross-platform", "App Store Optimization", "Push Notifications"],
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Beautiful and intuitive user interfaces that enhance user experience",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
    },
    {
      icon: BarChart3,
      title: "Digital Marketing",
      description: "Comprehensive digital marketing strategies to grow your online presence",
      features: ["Social Media Marketing", "Content Strategy", "PPC Campaigns", "Analytics & Reporting"],
    },
    {
      icon: Database,
      title: "Data Management",
      description: "Efficient data storage, processing, and analytics solutions",
      features: ["Database Design", "Data Migration", "Analytics Dashboard", "Real-time Processing"],
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description: "Protect your business with comprehensive security solutions",
      features: ["Security Audits", "Penetration Testing", "Compliance", "Incident Response"],
    },
  ]

  const additionalServices: Service[] = [
    {
      icon: Globe,
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and migration services",
      features: ["Cloud Migration", "Infrastructure Setup", "Cost Optimization", "24/7 Monitoring"],
    },
    {
      icon: MessageSquare,
      title: "Content Creation",
      description: "High-quality content that engages your audience",
      features: ["Blog Writing", "Video Production", "Graphic Design", "Social Media Content"],
    },
    {
      icon: Search,
      title: "SEO Optimization",
      description: "Improve your search engine rankings and organic traffic",
      features: ["Keyword Research", "On-page SEO", "Link Building", "Technical SEO"],
    },
    {
      icon: Mail,
      title: "Email Marketing",
      description: "Targeted email campaigns that convert prospects into customers",
      features: ["Campaign Design", "Automation", "A/B Testing", "Performance Analytics"],
    },
    {
      icon: Camera,
      title: "Photography",
      description: "Professional photography services for your business needs",
      features: ["Product Photography", "Corporate Headshots", "Event Coverage", "Photo Editing"],
    },
    {
      icon: Headphones,
      title: "Customer Support",
      description: "24/7 customer support solutions to keep your clients happy",
      features: ["Live Chat", "Help Desk", "Knowledge Base", "Multi-channel Support"],
    },
  ]

  const ServiceCard = ({ service }: { service: Service }) => (
    <Card
      className="group backdrop-blur-lg bg-white/70 dark:bg-slate-800/70 border border-white/20 dark:border-slate-700/40 
                 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
    >
      <CardHeader>
        <div className="flex items-center space-x-3 mb-4">
          <div
            className="p-3 rounded-xl bg-gradient-to-tr from-teal-400 to-blue-500 text-white shadow-md 
                       group-hover:scale-105 transition-transform"
          >
            <service.icon className="h-6 w-6" />
          </div>
          <CardTitle className="text-lg font-semibold">{service.title}</CardTitle>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 mb-6">
          {service.features.map((feature: string, idx: number) => (
            <li
              key={idx}
              className="text-sm text-muted-foreground flex items-center group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors"
            >
              <div className="w-1.5 h-1.5 bg-gradient-to-tr from-teal-400 to-blue-500 rounded-full mr-2" />
              {feature}
            </li>
          ))}
        </ul>
        <Button
          variant="outline"
          size="sm"
          className="w-full border border-slate-300 dark:border-slate-600 rounded-full hover:bg-gradient-to-tr hover:from-teal-400 hover:to-blue-500 hover:text-white transition-all duration-300"
        >
          Learn More
        </Button>
      </CardContent>
    </Card>
  )

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-black">
      <div className="container mx-auto px-4">
        {/* Section Intro */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
            Our Micro-Services
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-4">
            Specialized services designed to help your business thrive in the digital era
          </p>
        </div>

        {/* Core Services */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold mb-10 text-center text-slate-800 dark:text-slate-200">
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
          <h3 className="text-2xl font-semibold mb-10 text-center text-slate-800 dark:text-slate-200">
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
