"use client"

import * as React from "react"
import { Search, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Toolbar } from "@/components/ui/toolbar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navigation() {
  const [isVisible, setIsVisible] = React.useState(true)
  const [lastScrollY, setLastScrollY] = React.useState(0)

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Show navbar at top of page
      if (currentScrollY < 50) {
        setIsVisible(true)
      }
      // Hide when scrolling down, show when scrolling up
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      }
      // Show when scrolling up with significant movement
      else if (lastScrollY - currentScrollY > 50) {
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <div
      className={`fixed top-4 left-4 right-4 z-50 transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <Toolbar>
      {/* Brand */}
      <div className="flex items-center gap-2">
        <img src="/meridian-4.svg" alt="Meridian Logo" className="w-8 h-8" />
        <span className="font-meridian font-semibold text-white">meridian</span>
      </div>

      {/* Navigation Items */}
      <nav className="hidden md:flex items-center gap-6">
        <a 
          href="#" 
          className="text-gray-300 hover:text-white transition-colors text-body-small font-medium"
        >
          Dashboard
        </a>
        <a 
          href="#" 
          className="text-gray-300 hover:text-white transition-colors text-body-small font-medium"
        >
          Analytics
        </a>
        <a 
          href="#" 
          className="text-gray-300 hover:text-white transition-colors text-body-small font-medium"
        >
          Projects
        </a>
        <a 
          href="#" 
          className="text-gray-300 hover:text-white transition-colors text-body-small font-medium"
        >
          Teams
        </a>
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="rounded-full w-9 h-9 p-0 text-gray-300 hover:text-white hover:bg-gray-800">
          <Search className="w-4 h-4" />
        </Button>
        
        <Button variant="ghost" size="sm" className="rounded-full w-9 h-9 p-0 text-gray-300 hover:text-white hover:bg-gray-800">
          <User className="w-4 h-4" />
        </Button>

        <Button 
          variant="default" 
          size="sm" 
          className="rounded-full bg-white hover:bg-gray-100 text-black hidden sm:flex text-body-small font-medium"
        >
          Get Started
        </Button>

        {/* Mobile Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="rounded-full w-9 h-9 p-0 md:hidden text-gray-300 hover:text-white hover:bg-gray-800">
              <Menu className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>Dashboard</DropdownMenuItem>
            <DropdownMenuItem>Analytics</DropdownMenuItem>
            <DropdownMenuItem>Projects</DropdownMenuItem>
            <DropdownMenuItem>Teams</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      </Toolbar>
    </div>
  )
} 