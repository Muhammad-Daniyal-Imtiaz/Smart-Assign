"use client"

import { useState, useEffect } from "react"
import { Star, Quote } from "lucide-react"

export function TestimonialsSection() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

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
    },
    {
      quote:
        "The mobile app they developed for us has been a game-changer. User engagement is up 200% and the app store ratings are consistently 5 stars. Couldn't be happier with the results.",
      name: "Marcus Johnson",
      position: "Product Manager",
      company: "HealthTech Solutions",
      service: "Mobile App Development",
    },
    {
      quote:
        "Their UI/UX design expertise is unmatched. They completely reimagined our user experience, resulting in a 75% reduction in bounce rate and significantly improved user satisfaction.",
      name: "Sofia Martinez",
      position: "Marketing Director",
      company: "E-commerce Plus",
      service: "UI/UX Design",
    },
    {
      quote:
        "The digital marketing campaign they created exceeded all our expectations. We saw a 300% increase in qualified leads and our ROI improved dramatically. Truly exceptional service.",
      name: "Robert Chen",
      position: "Founder",
      company: "GrowthLab",
      service: "Digital Marketing",
    },
    {
      quote:
        "Their data management solution streamlined our entire operation. We now have real-time insights that have improved our decision-making process by 10x. Outstanding technical expertise.",
      name: "Amanda Thompson",
      position: "CTO",
      company: "DataFlow Systems",
      service: "Data Management",
    },
    {
      quote:
        "The cybersecurity audit and implementation they provided gave us complete peace of mind. Their proactive approach prevented potential threats and secured our entire infrastructure.",
      name: "David Wilson",
      position: "IT Director",
      company: "SecureBank",
      service: "Cybersecurity",
    },
  ]

  if (!isMounted) {
    return (
      <section id="testimonials" className="py-20 bg-emerald-50/30 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
              Client <span className="text-emerald-600">Testimonials</span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Don't just take our word for it – hear from our satisfied clients
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="testimonials" className="py-20 bg-emerald-50/30 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(167,243,208,0.2),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(167,243,208,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(167,243,208,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
            Client <span className="text-emerald-600">Testimonials</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Don't just take our word for it – hear from our satisfied clients
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`bg-white/90 border border-emerald-200 text-center p-6 rounded-2xl shadow-lg 
                         transition-all duration-500 hover:shadow-xl hover:-translate-y-1
                         ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-2xl md:text-3xl font-bold text-emerald-700 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-white/90 border border-emerald-200 rounded-2xl p-6 
                         hover:border-emerald-400 hover:shadow-xl 
                         transition-all duration-500 hover:-translate-y-1
                         ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex items-start space-x-4 mb-4">
                {/* Client Initial */}
                <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-200 shadow-sm flex items-center justify-center">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-emerald-400 text-emerald-400"
                      />
                    ))}
                  </div>
                  <span className="inline-block px-2 py-1 text-xs bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-full">
                    {testimonial.service}
                  </span>
                </div>
                <Quote className="h-6 w-6 text-emerald-300 flex-shrink-0" />
              </div>
              <p className="text-slate-700 mb-4 leading-relaxed text-sm">
                "{testimonial.quote}"
              </p>
              <div>
                <div className="font-semibold text-sm text-emerald-800">
                  {testimonial.name}
                </div>
                <div className="text-xs text-slate-500">
                  {testimonial.position}, {testimonial.company}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}