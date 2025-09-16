"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, DollarSign, Briefcase, Calendar } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"

export function MetricsDashboard() {
  const stats = [
    {
      title: "Happy Clients",
      value: "500+",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Revenue Generated",
      value: "$2.5M+",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Projects Completed",
      value: "1,200+",
      icon: Briefcase,
      color: "text-purple-600",
    },
    {
      title: "Years in Business",
      value: "8+",
      icon: Calendar,
      color: "text-orange-600",
    },
  ]

  const marketData = [
    { name: "North America", value: 45, color: "#3b82f6" },
    { name: "Europe", value: 35, color: "#10b981" },
    { name: "Asia Pacific", value: 20, color: "#f59e0b" },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Company Dashboard</h2>
          <p className="text-muted-foreground text-lg">Real-time metrics and achievements</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="glass-card hover:scale-105 transition-transform duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Market Presence Chart */}
        <Card className="glass-card max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Global Market Presence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={marketData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {marketData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
