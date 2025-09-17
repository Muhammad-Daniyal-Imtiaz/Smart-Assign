"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, DollarSign, Briefcase, Calendar } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

export function MetricsDashboard() {
  const stats = [
    {
      title: "Happy Clients",
      value: "500+",
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Revenue Generated",
      value: "$2.5M+",
      icon: DollarSign,
      color: "text-green-500",
    },
    {
      title: "Projects Completed",
      value: "1,200+",
      icon: Briefcase,
      color: "text-purple-500",
    },
    {
      title: "Years in Business",
      value: "8+",
      icon: Calendar,
      color: "text-orange-500",
    },
  ]

  const marketData = [
    { name: "North America", value: 45, color: "#3b82f6" },
    { name: "Europe", value: 35, color: "#10b981" },
    { name: "Asia Pacific", value: 20, color: "#f59e0b" },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-black">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
            Company Dashboard
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A snapshot of our impact, performance, and global presence
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="backdrop-blur-lg bg-white/70 dark:bg-slate-800/70 border border-white/30 dark:border-slate-700/50 
                         rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Market Presence Chart */}
        <Card
          className="backdrop-blur-lg bg-white/70 dark:bg-slate-800/70 border border-white/30 dark:border-slate-700/50 
                     rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 max-w-3xl mx-auto"
        >
          <CardHeader>
            <CardTitle className="text-center text-xl font-semibold">
              Global Market Presence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={marketData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    dataKey="value"
                    label={({ name, value }) => `${name} – ${value}%`}
                    labelLine={false}
                  >
                    {marketData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255,255,255,0.9)",
                      borderRadius: "8px",
                      border: "1px solid #e5e7eb",
                    }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
