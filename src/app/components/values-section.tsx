"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Heart, Target } from "lucide-react"

export function ValuesSection() {
  const values = [
    {
      icon: Award,
      title: "Excellence First",
      description:
        "We never compromise on quality. Every project is delivered with meticulous attention to detail and the highest standards of craftsmanship.",
      color: "text-yellow-600",
    },
    {
      icon: Heart,
      title: "Client-Centric",
      description:
        "Your success is our success. We build lasting partnerships by understanding your unique needs and delivering solutions that exceed expectations.",
      color: "text-red-600",
    },
    {
      icon: Target,
      title: "Results Driven",
      description:
        "We focus on measurable outcomes that drive real business value. Every strategy is designed to achieve your specific goals and objectives.",
      color: "text-blue-600",
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">The principles that guide everything we do</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="glass-card hover:scale-105 transition-all duration-300 group text-center">
              <CardHeader>
                <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit group-hover:bg-primary/20 transition-colors">
                  <value.icon className={`h-8 w-8 ${value.color}`} />
                </div>
                <CardTitle className="text-xl">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}