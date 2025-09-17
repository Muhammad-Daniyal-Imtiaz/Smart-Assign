"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"

type Theme = "light" | "dark"

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("light")

  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as Theme) || "light"
    setTheme(savedTheme)
    applyTheme(savedTheme)
  }, [])

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement
    root.className = root.className.replace(/\b(light|dark)\b/g, "")
    root.classList.add(newTheme)
  }

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    applyTheme(newTheme)
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="bg-white/60 backdrop-blur-sm border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-white/80"
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4 mr-2" />
      ) : (
        <Sun className="h-4 w-4 mr-2" />
      )}
      {theme === "light" ? "Dark" : "Light"}
    </Button>
  )
}