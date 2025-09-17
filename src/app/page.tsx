
'use client'
import { Header } from "./components/header"
import { HeroSection } from "./components/hero-section"
// import { MetricsDashboard } from "./components/metrics-dashboard"
import { ServicesSection } from "./components/services-section"
import { PortfolioSection } from "./components/portfolio-section"
import { TeamSection } from "./components/team-section"
import { ValuesSection } from "./components/values-section"
import { TestimonialsSection } from "./components/testimonials-section"
import { MetricsDashboard } from "./components/metrics-dasboard"
 import { Footer } from "./components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <MetricsDashboard />
      <ServicesSection />
      <PortfolioSection />
      <TeamSection />
      <ValuesSection />
      <TestimonialsSection />
      <Footer />
    </main>
  )
}