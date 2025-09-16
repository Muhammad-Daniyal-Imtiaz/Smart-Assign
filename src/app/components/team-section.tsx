"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Linkedin, Twitter, Mail } from "lucide-react"
import Image from "next/image"

export function TeamSection() {
  const founder = {
    name: "Sarah Johnson",
    position: "Founder & CEO",
    experience: "12+ years",
    bio: "Sarah is a visionary leader with over 12 years of experience in technology and business development. She founded Smart Assign with the mission to help businesses leverage technology for growth. Under her leadership, the company has grown from a small startup to a trusted partner for over 500 businesses worldwide.",
    achievements: [
      "Led digital transformation for 200+ companies",
      "Featured in Forbes 30 Under 30",
      "Speaker at major tech conferences",
      "MBA from Stanford Business School",
    ],
    image: "/professional-business-woman-ceo-headshot.jpg",
  }

  const teamMembers = [
    {
      name: "Michael Chen",
      position: "CTO",
      experience: "10 years",
      image: "/placeholder-pjqjf.png",
    },
    {
      name: "Emily Rodriguez",
      position: "Head of Design",
      experience: "8 years",
      image: "/placeholder-grlv7.png",
    },
    {
      name: "David Thompson",
      position: "Lead Developer",
      experience: "9 years",
      image: "/placeholder-uwujm.png",
    },
    {
      name: "Lisa Wang",
      position: "Marketing Director",
      experience: "7 years",
      image: "/placeholder-dk5ux.png",
    },
    {
      name: "James Wilson",
      position: "Project Manager",
      experience: "6 years",
      image: "/professional-male-project-manager-headshot.jpg",
    },
    {
      name: "Anna Kowalski",
      position: "Data Scientist",
      experience: "5 years",
      image: "/female-data-scientist-headshot.png",
    },
    {
      name: "Carlos Martinez",
      position: "DevOps Engineer",
      experience: "7 years",
      image: "/professional-hispanic-male-devops-engineer-headsho.jpg",
    },
    {
      name: "Sophie Laurent",
      position: "UX Researcher",
      experience: "4 years",
      image: "/professional-french-female-ux-researcher-headshot.jpg",
    },
    {
      name: "Ryan O&apos;Connor",
      position: "Security Specialist",
      experience: "8 years",
      image: "/professional-male-cybersecurity-specialist-headsho.jpg",
    },
    {
      name: "Priya Patel",
      position: "Business Analyst",
      experience: "6 years",
      image: "/professional-indian-female-business-analyst-headsh.jpg",
    },
    {
      name: "Tom Anderson",
      position: "Quality Assurance Lead",
      experience: "9 years",
      image: "/professional-male-qa-engineer-headshot.jpg",
    },
  ]

  return (
    <section id="team" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Talented professionals dedicated to delivering exceptional results
          </p>
        </div>

        {/* Founder Spotlight */}
        <Card className="glass-card mb-16 max-w-4xl mx-auto">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-1">
                <Image
                  src={founder.image || "/placeholder.svg"}
                  alt={founder.name}
                  width={400}
                  height={400}
                  className="w-full max-w-sm mx-auto rounded-2xl shadow-lg"
                />
              </div>
              <div className="lg:col-span-2">
                <div className="flex items-center gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">{founder.name}</h3>
                    <p className="text-primary font-medium">{founder.position}</p>
                    <Badge variant="secondary" className="mt-2">
                      {founder.experience} experience
                    </Badge>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">{founder.bio}</p>
                <div className="space-y-2">
                  <h4 className="font-semibold mb-3">Key Achievements:</h4>
                  <ul className="space-y-2">
                    {founder.achievements.map((achievement, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-4 mt-6">
                  <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                  <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                  <Mail className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <Card key={index} className="glass-card hover:scale-105 transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <h4 className="font-semibold text-lg mb-1">{member.name}</h4>
                <p className="text-primary text-sm mb-2">{member.position}</p>
                <Badge variant="outline" className="text-xs">
                  {member.experience} exp.
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}