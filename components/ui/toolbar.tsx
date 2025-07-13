"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          "fixed top-4 left-4 right-4 z-50",
          // Glass morphism effect
          "bg-black/90 backdrop-blur-md border border-gray-700/50",
          // Rounded edges
          "rounded-2xl",
          // Shadows and effects
          "shadow-lg shadow-black/20",
          // Layout
          "px-6 py-3",
          // Responsive
          "w-auto",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between gap-4">
          {children}
        </div>
      </div>
    )
  }
)
Toolbar.displayName = "Toolbar"

export { Toolbar } 