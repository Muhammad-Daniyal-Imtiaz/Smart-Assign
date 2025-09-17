"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

export function TestimonialsSection() {
  const stats = [
    { label: "Client Satisfaction", value: "98%" },
    { label: "Projects Completed", value: "1,200+" },
    { label: "Repeat Clients", value: "85%" },
    { label: "Average Rating", value: "4.9/5" },
  ]

  const testimonials = [
    {
      quote:
        "Smart Assign transformed our digital presence completely. Their web development team delivered a stunning website that increased our conversions by 150%. Absolutely phenomenal work!",
      name: "Jennifer Adams",
      position: "CEO",
      company: "TechStart Inc.",
      service: "Web Development",
      image: "/logos/webdev-logo.png",
    },
    {
      quote:
        "The mobile app they developed for us has been a game-changer. User engagement is up 200% and the app store ratings are consistently 5 stars. Couldn’t be happier with the results.",
      name: "Marcus Johnson",
      position: "Product Manager",
      company: "HealthTech Solutions",
      service: "Mobile App Development",
      image: "/logos/mobileapp-logo.png",
    },
    {
      quote:
        "Their UI/UX design expertise is unmatched. They completely reimagined our user experience, resulting in a 75% reduction in bounce rate and significantly improved user satisfaction.",
      name: "Sofia Martinez",
      position: "Marketing Director",
      company: "E-commerce Plus",
      service: "UI/UX Design",
      image: "/logos/uiux-logo.png",
    },
    {
      quote:
        "The digital marketing campaign they created exceeded all our expectations. We saw a 300% increase in qualified leads and our ROI improved dramatically. Truly exceptional service.",
      name: "Robert Chen",
      position: "Founder",
      company: "GrowthLab",
      service: "Digital Marketing",
      image: "/logos/marketing-logo.png",
    },
    {
      quote:
        "Their data management solution streamlined our entire operation. We now have real-time insights that have improved our decision-making process by 10x. Outstanding technical expertise.",
      name: "Amanda Thompson",
      position: "CTO",
      company: "DataFlow Systems",
      service: "Data Management",
      image: "/logos/datamanagement-logo.png",
    },
    {
      quote:
        "The cybersecurity audit and implementation they provided gave us complete peace of mind. Their proactive approach prevented potential threats and secured our entire infrastructure.",
      name: "David Wilson",
      position: "IT Director",
      company: "SecureBank",
      service: "Cybersecurity",
      image: "/logos/cybersecurity-logo.png",
    },
  ]

  return (
    <section
      id="testimonials"
      className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
    >
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-sky-400 drop-shadow-lg">
            What Our Clients Say
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Don’t just take our word for it – hear from our satisfied clients
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="bg-gray-800/90 border border-sky-500/30 text-center p-6 rounded-2xl shadow-md hover:shadow-sky-500/40 hover:scale-105 transition-all duration-300"
            >
              <div className="text-2xl md:text-3xl font-bold text-sky-400 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-gray-800/90 border border-gray-700 rounded-2xl hover:border-sky-500/60 hover:shadow-xl hover:shadow-sky-500/30 transition-all duration-500"
            >
              <CardHeader>
                <div className="flex items-start space-x-4">
                  {/* Client Image / Logo */}
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover border border-sky-500/40 shadow-md"
                  />
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-sky-400 text-sky-400 drop-shadow"
                        />
                      ))}
                    </div>
                    <Badge
                      variant="secondary"
                      className="text-xs bg-sky-600/30 text-sky-300 border border-sky-500/40"
                    >
                      {testimonial.service}
                    </Badge>
                  </div>
                  <Quote className="h-6 w-6 text-sky-500/50" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                  “{testimonial.quote}”
                </p>
                <div>
                  <div className="font-semibold text-sm text-sky-300">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-gray-400">
                    {testimonial.position}, {testimonial.company}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
