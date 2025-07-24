"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"
import { AnimatedFlowLine } from "./animated-flow-line" // Import the new component
import { useState, useEffect, useCallback } from "react" // Import useState, useEffect, and useCallback

interface MeridianMapProps extends React.HTMLAttributes<HTMLDivElement> {}

// Helper to generate a random number within a range for adding "entropy" - reduced for smoother curves
const getRandomOffset = (max: number) => (Math.random() - 0.5) * 2 * max

// Function to generate SVG path data using cubic Bezier curves with reduced randomness
const getBezierPathData = (points: { x: number; y: number }[]) => {
  if (points.length < 2) return ""

  let path = `M ${points[0].x} ${points[0].y}`
  const randomnessFactor = 3 // Reduced from 10 for smoother, less glitchy curves

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i]
    const p1 = points[i + 1]

    // Calculate control points for a cubic Bezier curve with less randomness
    const cp1x = p0.x + (p1.x - p0.x) / 3 + getRandomOffset(randomnessFactor)
    const cp1y = p0.y + (p1.y - p0.y) / 3 + getRandomOffset(randomnessFactor)
    const cp2x = p0.x + ((p1.x - p0.x) * 2) / 3 + getRandomOffset(randomnessFactor)
    const cp2y = p0.y + ((p1.y - p0.y) * 2) / 3 + getRandomOffset(randomnessFactor)

    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`
  }
  return path
}

// Function to generate a random point within the SVG viewBox
const getRandomPoint = (maxX: number, maxY: number) => ({
  x: Math.random() * maxX,
  y: Math.random() * maxY,
})

// Generate a set of interconnected paths with more "meridian-like" flow
const generateMeridianPaths = (numPaths: number, numSegmentsPerPath: number, maxX: number, maxY: number) => {
  const generatedLines = []
  // Much more subtle colors
  const customColors = ["#E5E5E5", "#E8E8E8", "#EAEAEA", "#ECECEC", "#EEEEEE", "#F0F0F0"]
  for (let i = 0; i < numPaths; i++) {
    const points = []
    let currentPoint = getRandomPoint(maxX, maxY)
    points.push(currentPoint)

    for (let j = 0; j < numSegmentsPerPath; j++) {
      // Generate next point, potentially biased towards a direction or nearby
      const nextPoint = getRandomPoint(maxX, maxY)
      points.push(nextPoint)
      currentPoint = nextPoint
    }

    generatedLines.push({
      id: `path-${i}`,
      strokeColor: customColors[i % customColors.length], // Use the more subtle colors
      points: points,
    })
  }
  return generatedLines
}

const SVG_WIDTH = 1000
const SVG_HEIGHT = 600

// Static paths for SSR - simple grid-like pattern
const createStaticPaths = () => {
  const layers = []
  
  // Simple static lines that won't change between server and client
  const staticLines = [
    { id: 'static-1', points: [{ x: 100, y: 100 }, { x: 300, y: 150 }, { x: 500, y: 200 }] },
    { id: 'static-2', points: [{ x: 200, y: 300 }, { x: 400, y: 350 }, { x: 600, y: 400 }] },
    { id: 'static-3', points: [{ x: 150, y: 450 }, { x: 350, y: 500 }, { x: 550, y: 550 }] }
  ]
  
  layers.push({
    name: 'static',
    lines: staticLines,
    opacity: 0.25, // Increased for more visibility
    strokeWidth: 1.0, // Thicker lines
    colors: ["#B8B8B8"], // Darker gray that's clearly visible
    blur: 'none'
  })
  
  return layers
}

// Create multiple layers for depth effect - reduced number of paths for less visual noise
const createLayeredPaths = () => {
  const layers = []
  
  // Back layer - subtle but clearly visible
  layers.push({
    name: 'back',
    lines: generateMeridianPaths(8, 4, SVG_WIDTH, SVG_HEIGHT), // Reduced from 15, 6
    opacity: 0.15, // Increased for visibility
    strokeWidth: 0.7, // Thicker
    colors: ["#CCCCCC", "#CECECE", "#D0D0D0", "#CACACA", "#D2D2D2", "#D4D4D4"],
    blur: 'url(#depth-blur-back)'
  })
  
  // Middle layer - more visible
  layers.push({
    name: 'middle',
    lines: generateMeridianPaths(10, 4, SVG_WIDTH, SVG_HEIGHT), // Reduced from 20, 6
    opacity: 0.20, // Increased for visibility
    strokeWidth: 0.8, // Thicker
    colors: ["#B8B8B8", "#BABABA", "#BCBCBC", "#B6B6B6", "#BEBEBE", "#C0C0C0"],
    blur: 'url(#depth-blur-middle)'
  })
  
  // Front layer - most visible
  layers.push({
    name: 'front',
    lines: generateMeridianPaths(12, 4, SVG_WIDTH, SVG_HEIGHT), // Reduced from 18, 6
    opacity: 0.30, // Increased for clear visibility
    strokeWidth: 1.0, // Thicker
    colors: ["#A0A0A0", "#A2A2A2", "#A4A4A4", "#9E9E9E", "#A6A6A6", "#A8A8A8"],
    blur: 'none'
  })
  
  return layers
}

export function MeridianMap({ className, ...props }: MeridianMapProps) {
  const [layeredPaths, setLayeredPaths] = useState(() => createStaticPaths())
  const [allLinesFlat, setAllLinesFlat] = useState<any[]>([])
  const [uniqueNodes, setUniqueNodes] = useState<{ x: number; y: number }[]>([])
  const [isClient, setIsClient] = useState(false)
  const [animatedLines, setAnimatedLines] = useState<Array<{ line: any, layer: string, animationKey: number }>>([])
  const maxAnimatedLines = 2 // Reduced from 6 for less visual chaos

  // Generate paths only on client side to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true)
    const clientLayeredPaths = createLayeredPaths()
    setLayeredPaths(clientLayeredPaths)
    
    const clientAllLinesFlat = clientLayeredPaths.flatMap(layer => 
      layer.lines.map(line => ({ ...line, layer: layer.name }))
    )
    setAllLinesFlat(clientAllLinesFlat)
    
    // Collect all unique node points from all layers
    const allNodes = clientLayeredPaths.flatMap(layer => layer.lines.flatMap(line => line.points))
    const clientUniqueNodes = Array.from(new Map(allNodes.map((node) => [`${node.x},${node.y}`, node])).values())
    setUniqueNodes(clientUniqueNodes)
  }, [])

  // Callback to remove an animation when it completes
  const handleAnimationComplete = useCallback((keyToRemove: number) => {
    setAnimatedLines((prev) => prev.filter((item) => item.animationKey !== keyToRemove))
  }, [])

  useEffect(() => {
    if (!isClient || allLinesFlat.length === 0) return

    const interval = setInterval(() => {
      // Add a new animated line from any layer
      const randomIndex = Math.floor(Math.random() * allLinesFlat.length)
      const lineToAnimate = allLinesFlat[randomIndex]

      setAnimatedLines((prev) => {
        // Add a unique key for React's list rendering and to re-trigger animation
        const newAnimatedLine = { 
          line: lineToAnimate, 
          layer: lineToAnimate.layer,
          animationKey: Date.now() + Math.random() 
        }

        // If we're at the max, don't add more, wait for one to finish
        if (prev.length >= maxAnimatedLines) {
          return prev
        }
        return [...prev, newAnimatedLine]
      })
    }, 4000) // Much slower interval - increased from 1200ms for calmer animation

    return () => clearInterval(interval)
  }, [maxAnimatedLines, allLinesFlat, isClient])

  // Get animation colors based on layer - much more subtle
  const getAnimationColor = (layer: string) => {
    switch (layer) {
      case 'back': return '#A8A8A8' // More visible grey
      case 'middle': return '#909090' // More visible grey  
      case 'front': return '#808080' // More visible grey
      default: return '#909090'
    }
  }

  // Get animation opacity based on layer - much more subtle
  const getAnimationOpacity = (layer: string) => {
    switch (layer) {
      case 'back': return 0.5 // Increased for visibility
      case 'middle': return 0.6 // Increased for visibility
      case 'front': return 0.8 // Increased for visibility
      default: return 0.6
    }
  }

  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden bg-gray-50", // Light gray background for old map feel
        className,
      )}
      {...props}
    >
      <svg className="h-full w-full" viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} preserveAspectRatio="xMidYMid meet">
        <defs>
          {/* Define a filter for the static/fuzz effect with finer grain - much more subtle */}
          <filter id="fuzz-effect">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" stitchTiles="stitch" result="fuzz" />
            <feColorMatrix type="saturate" values="0" in="fuzz" result="grayscaleFuzz" />
          </filter>
          
          {/* Depth blur filters for different layers - increased blur for smoother look */}
          <filter id="depth-blur-back">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
          <filter id="depth-blur-middle">
            <feGaussianBlur stdDeviation="0.6" />
          </filter>
        </defs>

        {/* Background grid lines - more visible */}
        {Array.from({ length: 8 }).map((_, i) => ( // Reduced from 10 for less visual noise
          <line
            key={`h-line-${i}`}
            x1="0"
            y1={i * (SVG_HEIGHT / 8)}
            x2={SVG_WIDTH}
            y2={i * (SVG_HEIGHT / 8)}
            stroke="#dddddd" // More visible
            strokeWidth="0.4" // Slightly thicker
            opacity="0.4" // More visible
          />
        ))}
        {Array.from({ length: 8 }).map((_, i) => ( // Reduced from 10
          <line
            key={`v-line-${i}`}
            x1={i * (SVG_WIDTH / 8)}
            y1="0"
            x2={i * (SVG_WIDTH / 8)}
            y2={SVG_HEIGHT}
            stroke="#dddddd" // More visible
            strokeWidth="0.4" // Slightly thicker
            opacity="0.4" // More visible
          />
        ))}

        {/* Render the layered static lines from back to front */}
        {layeredPaths.map((layer) => (
          <g key={layer.name}>
            {layer.lines.map((line, index) => (
              <path
                key={`${layer.name}-${line.id}`}
                d={getBezierPathData(line.points)}
                fill="none"
                stroke={layer.colors[index % layer.colors.length]}
                strokeWidth={layer.strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={layer.opacity}
                filter={layer.blur}
              />
            ))}
          </g>
        ))}

        {/* Render the animated flow lines - only on client */}
        {isClient && animatedLines.map((item) => (
          <AnimatedFlowLine
            key={item.animationKey}
            pathData={getBezierPathData(item.line.points)}
            strokeColor={getAnimationColor(item.layer)}
            animationDuration={5000 + Math.random() * 4000} // Longer, more consistent duration (5s to 9s)
            segmentLengthRatio={0.06 + Math.random() * 0.02} // Smaller, more consistent segments
            animationKey={item.animationKey}
            onAnimationComplete={handleAnimationComplete}
            layerOpacity={getAnimationOpacity(item.layer)}
          />
        ))}

        {/* Render the subtle nodes with depth - more visible */}
        {isClient && uniqueNodes.map((node, index) => {
          const depthFactor = Math.random() // Random depth for each node
          const baseOpacity = 0.15 + (depthFactor * 0.2) // More visible nodes
          const nodeSize = 1.2 + (depthFactor * 0.6) // Larger nodes
          
          return (
            <circle
              key={`node-${index}`}
              cx={node.x}
              cy={node.y}
              r={nodeSize}
              fill={depthFactor > 0.7 ? "#999999" : depthFactor > 0.4 ? "#A5A5A5" : "#B0B0B0"} // Darker, more visible fills
              stroke="none"
              opacity={baseOpacity}
              className="transition-all duration-300"
            />
          )
        })}

        {/* Remove the overlay to allow full visibility */}
      </svg>
    </div>
  )
}
