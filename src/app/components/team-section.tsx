"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Linkedin, Twitter, Mail } from "lucide-react"
import Image from "next/image"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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
    { name: "Michael Chen", position: "CTO", experience: "10 years", image: "/placeholder-pjqjf.png" },
    { name: "Emily Rodriguez", position: "Head of Design", experience: "8 years", image: "/placeholder-grlv7.png" },
    { name: "David Thompson", position: "Lead Developer", experience: "9 years", image: "/placeholder-uwujm.png" },
    { name: "Lisa Wang", position: "Marketing Director", experience: "7 years", image: "/placeholder-dk5ux.png" },
    { name: "James Wilson", position: "Project Manager", experience: "6 years", image: "/professional-male-project-manager-headshot.jpg" },
    { name: "Anna Kowalski", position: "Data Scientist", experience: "5 years", image: "/female-data-scientist-headshot.png" },
    { name: "Carlos Martinez", position: "DevOps Engineer", experience: "7 years", image: "/professional-hispanic-male-devops-engineer-headsho.jpg" },
    { name: "Sophie Laurent", position: "UX Researcher", experience: "4 years", image: "/professional-french-female-ux-researcher-headshot.jpg" },
    { name: "Ryan O'Connor", position: "Security Specialist", experience: "8 years", image: "/professional-male-cybersecurity-specialist-headsho.jpg" },
    { name: "Priya Patel", position: "Business Analyst", experience: "6 years", image: "/professional-indian-female-business-analyst-headsh.jpg" },
    { name: "Tom Anderson", position: "Quality Assurance Lead", experience: "9 years", image: "/professional-male-qa-engineer-headshot.jpg" },
  ]

  return (
    <section id="team" className="py-24 bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Meet Our <span className="text-primary">Team</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A passionate team of experts committed to delivering world-class digital solutions.
          </p>
        </div>

        {/* Founder Spotlight */}
        <Card className="glass-card shadow-xl mb-20 max-w-5xl mx-auto border border-border/40">
          <CardContent className="p-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
              {/* Founder Image */}
              <div className="lg:col-span-1 relative">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  width={400}
                  height={400}
                  className="w-full max-w-sm mx-auto rounded-2xl shadow-xl object-cover"
                />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                  <Badge variant="secondary" className="px-4 py-1 text-sm font-medium shadow-md">
                    {founder.experience} Experience
                  </Badge>
                </div>
              </div>

              {/* Founder Info */}
              <div className="lg:col-span-2">
                <h3 className="text-3xl font-bold mb-1">{founder.name}</h3>
                <p className="text-primary font-medium text-lg mb-4">{founder.position}</p>
                <p className="text-muted-foreground mb-6 leading-relaxed">{founder.bio}</p>

                {/* Achievements */}
                <div>
                  <h4 className="font-semibold mb-3">Key Achievements</h4>
                  <ul className="space-y-2">
                    {founder.achievements.map((achievement, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Social Links */}
                <div className="flex gap-5 mt-8">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Linkedin className="h-6 w-6 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                      </TooltipTrigger>
                      <TooltipContent>LinkedIn</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Twitter className="h-6 w-6 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                      </TooltipTrigger>
                      <TooltipContent>Twitter</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Mail className="h-6 w-6 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                      </TooltipTrigger>
                      <TooltipContent>Email</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="glass-card hover:scale-105 transition-all duration-300 group border border-border/40 shadow-md"
            >
              <CardContent className="p-8 text-center">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover group-hover:scale-110 transition-transform duration-500 shadow-lg"
                />
                <h4 className="font-semibold text-lg mb-1">{member.name}</h4>
                <p className="text-primary text-sm font-medium mb-2">{member.position}</p>
                <Badge variant="outline" className="text-xs px-2 py-0.5">
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
