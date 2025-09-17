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
      color: "text-blue-300",
    },
    {
      title: "Revenue Generated",
      value: "$2.5M+",
      icon: DollarSign,
      color: "text-green-300",
    },
    {
      title: "Projects Completed",
      value: "1,200+",
      icon: Briefcase,
      color: "text-purple-300",
    },
    {
      title: "Years in Business",
      value: "8+",
      icon: Calendar,
      color: "text-orange-300",
    },
  ]

  const marketData = [
    { name: "North America", value: 45, color: "#3b82f6" }, // blue
    { name: "Europe", value: 35, color: "#10b981" },       // green
    { name: "Asia Pacific", value: 20, color: "#f59e0b" }, // orange
  ]

  return (
    <section
      className="py-20 bg-gradient-to-br from-emerald-900 via-slate-900 to-blue-950 
                 relative overflow-hidden"
    >
      {/* Mirror-like subtle overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.1),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.3),transparent_70%)]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-teal-300 via-blue-300 to-slate-200 bg-clip-text text-transparent">
            Company Dashboard
          </h2>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            A snapshot of our impact, performance, and global presence
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="backdrop-blur-lg bg-white/5 border border-slate-700/40 
                         rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-extrabold text-white">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Market Presence Chart */}
        <Card
          className="backdrop-blur-lg bg-white/5 border border-slate-700/40 
                     rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 max-w-3xl mx-auto"
        >
          <CardHeader>
            <CardTitle className="text-center text-xl font-semibold text-slate-200">
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
                      backgroundColor: "rgba(15, 23, 42, 0.9)", // deep slate tooltip
                      borderRadius: "8px",
                      border: "1px solid #334155",
                      color: "#f1f5f9",
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    wrapperStyle={{ color: "white" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
