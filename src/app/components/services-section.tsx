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
    <Card className="glass-card hover:scale-105 transition-all duration-300 group">
      <CardHeader>
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
            <service.icon className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-lg">{service.title}</CardTitle>
        </div>
        <p className="text-muted-foreground text-sm">{service.description}</p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 mb-4">
          {service.features.map((feature: string, idx: number) => (
            <li key={idx} className="text-sm text-muted-foreground flex items-center">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
              {feature}
            </li>
          ))}
        </ul>
        <Button variant="outline" size="sm" className="w-full bg-transparent">
          Learn More
        </Button>
      </CardContent>
    </Card>
  )

  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Micro-Services</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Specialized services designed to help your business thrive
          </p>
        </div>

        {/* Core Services */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 text-center">Our Core Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreServices.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>

        {/* Additional Services */}
        <div>
          <h3 className="text-2xl font-semibold mb-8 text-center">Additional Specialized Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}