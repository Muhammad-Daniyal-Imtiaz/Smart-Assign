"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sun, Moon, Droplets, Leaf, Carrot as Mirror } from "lucide-react"

type Theme = "light" | "dark" | "blue" | "green" | "grey"

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("light")

  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as Theme) || "light"
    setTheme(savedTheme)
    applyTheme(savedTheme)
  }, [])

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement
    root.className = root.className.replace(/\b(light|dark|blue|green|grey)\b/g, "")
    root.classList.add(newTheme)
  }

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    applyTheme(newTheme)
  }

  const themeIcons = {
    light: Sun,
    dark: Moon,
    blue: Droplets,
    green: Leaf,
    grey: Mirror,
  }

  const themeLabels = {
    light: "Light",
    dark: "Dark",
    blue: "Blue",
    green: "Green",
    grey: "Grey Mirror",
  }

  const CurrentIcon = themeIcons[theme]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-white/60 backdrop-blur-sm border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-white/80"
        >
          <CurrentIcon className="h-4 w-4 mr-2" />
          {themeLabels[theme]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white/90 backdrop-blur-xl border-slate-200">
        {Object.entries(themeIcons).map(([key, Icon]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => handleThemeChange(key as Theme)}
            className="cursor-pointer text-slate-700 hover:text-slate-900"
          >
            <Icon className="h-4 w-4 mr-2" />
            {themeLabels[key as Theme]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
