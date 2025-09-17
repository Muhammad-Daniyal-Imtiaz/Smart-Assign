"use client"

import { useState, useEffect } from "react"
import { Users, DollarSign, Briefcase, Calendar } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

export function MetricsDashboard() {
  const [clients, setClients] = useState(0)
  const [projects, setProjects] = useState(0)
  const [revenue, setRevenue] = useState(0)
  const [years, setYears] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Set visibility for fade-in animation
    setIsVisible(true)
    
    // Animate counting up the stats
    const interval = setInterval(() => {
      setClients(prev => (prev < 500 ? prev + 10 : 500))
      setProjects(prev => (prev < 1200 ? prev + 24 : 1200))
      setRevenue(prev => (prev < 2.5 ? prev + 0.05 : 2.5))
      setYears(prev => (prev < 8 ? prev + 0.16 : 8))
    }, 50)

    return () => clearInterval(interval)
  }, [])

  const stats = [
    {
      title: "Happy Clients",
      value: `${clients}+`,
      icon: Users,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/30"
    },
    {
      title: "Revenue Generated",
      value: `$${revenue.toFixed(1)}M+`,
      icon: DollarSign,
      color: "text-teal-400",
      bgColor: "bg-teal-500/10",
      borderColor: "border-teal-500/30"
    },
    {
      title: "Projects Completed",
      value: `${projects}+`,
      icon: Briefcase,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/30"
    },
    {
      title: "Years in Business",
      value: `${years.toFixed(0)}+`,
      icon: Calendar,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30"
    },
  ]

  const marketData = [
    { name: "North America", value: 45, color: "#10b981" }, // emerald
    { name: "Europe", value: 35, color: "#0ea5e9" },       // blue
    { name: "Asia Pacific", value: 20, color: "#06b6d4" }, // cyan
  ]

  return (
    <section className="py-20 bg-emerald-50/30 relative overflow-hidden">
      {/* Lightest green background with subtle pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(209,250,229,0.2),transparent_70%)]"></div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(167,243,208,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(167,243,208,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-100/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-100/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            Company <span className="text-emerald-600">Dashboard</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Real-time metrics and achievements that showcase our impact
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`backdrop-blur-sm bg-white/90 border rounded-2xl shadow-lg p-6 
                         transition-all duration-500 hover:shadow-xl hover:-translate-y-1 
                         ${stat.borderColor} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-row items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-slate-700">
                  {stat.title}
                </h3>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-slate-900">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Market Presence Chart */}
        <div className={`max-w-3xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white border border-emerald-200 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <h3 className="text-center text-xl font-semibold text-slate-800 mb-6">
              Global Market Presence
            </h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={marketData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    innerRadius={70}
                    dataKey="value"
                    label={({ name, value }) => `${name} – ${value}%`}
                    labelLine={false}
                  >
                    {marketData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color} 
                        stroke="#fff"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      borderRadius: "8px",
                      border: "1px solid #e5e7eb",
                      color: "#1f2937",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                    }}
                    formatter={(value) => [`${value}%`, 'Market Share']}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                    iconSize={10}
                    formatter={(value, entry) => (
                      <span className="text-slate-700 text-sm">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className={`mt-12 text-center transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-slate-600">
            Trusted by 500+ businesses worldwide with a 98% satisfaction rate
          </p>
        </div>
      </div>
    </section>
  )
}