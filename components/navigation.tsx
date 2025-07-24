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
  return (
    <Toolbar>
      {/* Brand */}
      <div className="flex items-center">
        <span className="font-meridian font-semibold text-white">meridian</span>
      </div>

      {/* Navigation Items */}
      <nav className="hidden md:flex items-center gap-6">
        <a 
          href="#" 
          className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
        >
          Dashboard
        </a>
        <a 
          href="#" 
          className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
        >
          Analytics
        </a>
        <a 
          href="#" 
          className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
        >
          Projects
        </a>
        <a 
          href="#" 
          className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
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
          className="rounded-full bg-white hover:bg-gray-100 text-black hidden sm:flex"
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
  )
} 