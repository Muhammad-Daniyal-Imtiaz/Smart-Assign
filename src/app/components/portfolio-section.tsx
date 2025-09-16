"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, ArrowRight } from "lucide-react"
import Image from "next/image"

export function PortfolioSection() {
  const projects = [
    {
      category: "E-commerce",
      title: "Fashion Retail Platform",
      description:
        "A modern e-commerce platform with advanced filtering, payment integration, and inventory management.",
      tags: ["React", "Node.js", "MongoDB"],
      image: "/modern-ecommerce-fashion-website.jpg",
    },
    {
      category: "Healthcare",
      title: "Telemedicine App",
      description: "Mobile application connecting patients with healthcare providers for virtual consultations.",
      tags: ["React Native", "Firebase", "WebRTC"],
      image: "/telemedicine-mobile-app-interface.jpg",
    },
    {
      category: "Finance",
      title: "Investment Dashboard",
      description: "Real-time investment tracking dashboard with portfolio analytics and market insights.",
      tags: ["Vue.js", "Python", "PostgreSQL"],
      image: "/financial-investment-dashboard.png",
    },
    {
      category: "Education",
      title: "Learning Management System",
      description: "Comprehensive LMS with course management, student tracking, and interactive content.",
      tags: ["Angular", "Django", "MySQL"],
      image: "/lms-interface.png",
    },
    {
      category: "Real Estate",
      title: "Property Management Portal",
      description: "Full-featured property management system with tenant portals and maintenance tracking.",
      tags: ["Next.js", "Express", "Redis"],
      image: "/property-management-dashboard.png",
    },
    {
      category: "Food & Beverage",
      title: "Restaurant Ordering System",
      description: "Online ordering platform with menu management, delivery tracking, and payment processing.",
      tags: ["React", "Stripe", "AWS"],
      image: "/restaurant-ordering-app.png",
    },
  ]

  return (
    <section id="portfolio" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Work Portfolio</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Showcasing our expertise across various industries and technologies
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <Card key={index} className="glass-card hover:scale-105 transition-all duration-300 group overflow-hidden">
              <div className="relative overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={400}
                  height={192}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="glass">
                    {project.category}
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <p className="text-muted-foreground text-sm">{project.description}</p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full group bg-transparent">
                  View Details
                  <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="glass-card text-center p-8">
          <h3 className="text-2xl font-semibold mb-4">Want to See More?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We&apos;ve completed over 1,200 projects across various industries. Contact us to see more examples relevant to
            your business needs.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            View Full Portfolio
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Card>
      </div>
    </section>
  )
}