"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"
import { AnimatedFlowLine } from "./animated-flow-line" // Import the new component
import { useState, useEffect, useCallback } from "react" // Import useState, useEffect, and useCallback

interface MeridianMapProps extends React.HTMLAttributes<HTMLDivElement> {}

// Helper to generate a random number within a range for adding "entropy"
const getRandomOffset = (max: number) => (Math.random() - 0.5) * 2 * max

// Function to generate SVG path data using cubic Bezier curves with randomness
const getBezierPathData = (points: { x: number; y: number }[]) => {
  if (points.length < 2) return ""

  let path = `M ${points[0].x} ${points[0].y}`
  const randomnessFactor = 10 // Adjust this value for more or less "wobble"

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i]
    const p1 = points[i + 1]

    // Calculate control points for a cubic Bezier curve
    // These are derived from the start and end points, with random perturbations
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
  // Adjusted the very light colors to be slightly darker for better visibility
  const customColors = ["#C0C0C0", "#656668", "#727273", "#727273", "#D0D0D0", "#BFBFBF"]
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
      strokeColor: customColors[i % customColors.length], // Use the custom hex colors
      points: points,
    })
  }
  return generatedLines
}

const SVG_WIDTH = 1000
const SVG_HEIGHT = 600

// Create multiple layers for depth effect - moved outside component to prevent regeneration
const createLayeredPaths = () => {
  const layers = []
  
  // Back layer - most subtle, lighter
  layers.push({
    name: 'back',
    lines: generateMeridianPaths(15, 6, SVG_WIDTH, SVG_HEIGHT),
    opacity: 0.08,
    strokeWidth: 0.4,
    colors: ["#E8E8E8", "#EEEEEE", "#F0F0F0", "#E5E5E5", "#EDEDED", "#EAEAEA"],
    blur: 'url(#depth-blur-back)'
  })
  
  // Middle layer - medium visibility
  layers.push({
    name: 'middle',
    lines: generateMeridianPaths(20, 6, SVG_WIDTH, SVG_HEIGHT),
    opacity: 0.18,
    strokeWidth: 0.5,
    colors: ["#D0D0D0", "#BABABA", "#C2C2C2", "#BCBCBC", "#CCCCCC", "#C8C8C8"],
    blur: 'url(#depth-blur-middle)'
  })
  
  // Front layer - most visible, darker
  layers.push({
    name: 'front',
    lines: generateMeridianPaths(18, 6, SVG_WIDTH, SVG_HEIGHT),
    opacity: 0.35,
    strokeWidth: 0.7,
    colors: ["#A0A0A0", "#888888", "#959595", "#8A8A8A", "#999999", "#909090"],
    blur: 'none'
  })
  
  return layers
}

// Generate the paths once outside the component
const layeredPaths = createLayeredPaths()
const allLinesFlat = layeredPaths.flatMap(layer => 
  layer.lines.map(line => ({ ...line, layer: layer.name }))
)

// Collect all unique node points from all layers
const allNodes = layeredPaths.flatMap(layer => layer.lines.flatMap(line => line.points))
const uniqueNodes = Array.from(new Map(allNodes.map((node) => [`${node.x},${node.y}`, node])).values())

export function MeridianMap({ className, ...props }: MeridianMapProps) {
  const [animatedLines, setAnimatedLines] = useState<Array<{ line: any, layer: string, animationKey: number }>>([])
  const maxAnimatedLines = 6 // Allow a few simultaneous animations

  // Callback to remove an animation when it completes
  const handleAnimationComplete = useCallback((keyToRemove: number) => {
    setAnimatedLines((prev) => prev.filter((item) => item.animationKey !== keyToRemove))
  }, [])

  useEffect(() => {
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
    }, 1200) // Slightly faster interval for more activity

    return () => clearInterval(interval)
  }, [maxAnimatedLines])

  // Get animation colors based on layer
  const getAnimationColor = (layer: string) => {
    switch (layer) {
      case 'back': return '#D8D8D8' // Very subtle grey
      case 'middle': return '#B8B8B8' // Medium grey
      case 'front': return '#888888' // Darker grey
      default: return '#B8B8B8'
    }
  }

  // Get animation opacity based on layer
  const getAnimationOpacity = (layer: string) => {
    switch (layer) {
      case 'back': return 0.3
      case 'middle': return 0.5
      case 'front': return 0.8
      default: return 0.5
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
          {/* Define a filter for the static/fuzz effect with finer grain */}
          <filter id="fuzz-effect">
            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" stitchTiles="stitch" result="fuzz" />
            <feColorMatrix type="saturate" values="0" in="fuzz" result="grayscaleFuzz" />
          </filter>
          
          {/* Depth blur filters for different layers */}
          <filter id="depth-blur-back">
            <feGaussianBlur stdDeviation="0.8" />
          </filter>
          <filter id="depth-blur-middle">
            <feGaussianBlur stdDeviation="0.3" />
          </filter>
        </defs>

        {/* Very subtle background grid lines for structure */}
        {Array.from({ length: 10 }).map((_, i) => (
          <line
            key={`h-line-${i}`}
            x1="0"
            y1={i * (SVG_HEIGHT / 10)}
            x2={SVG_WIDTH}
            y2={i * (SVG_HEIGHT / 10)}
            stroke="#f8f8f8" // Even more subtle light gray
            strokeWidth="0.3"
            opacity="0.4" // Very subtle opacity
          />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line
            key={`v-line-${i}`}
            x1={i * (SVG_WIDTH / 10)}
            y1="0"
            x2={i * (SVG_WIDTH / 10)}
            y2={SVG_HEIGHT}
            stroke="#f8f8f8" // Even more subtle light gray
            strokeWidth="0.3"
            opacity="0.4" // Very subtle opacity
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

        {/* Render the animated flow lines */}
        {animatedLines.map((item) => (
          <AnimatedFlowLine
            key={item.animationKey}
            pathData={getBezierPathData(item.line.points)}
            strokeColor={getAnimationColor(item.layer)}
            animationDuration={3000 + Math.random() * 3000} // Varied duration (3s to 6s)
            segmentLengthRatio={0.08 + Math.random() * 0.04} // Varied segment length
            animationKey={item.animationKey}
            onAnimationComplete={handleAnimationComplete}
            layerOpacity={getAnimationOpacity(item.layer)}
          />
        ))}

        {/* Render the subtle nodes with depth */}
        {uniqueNodes.map((node, index) => {
          const depthFactor = Math.random() // Random depth for each node
          const baseOpacity = 0.15 + (depthFactor * 0.25) // Nodes closer to front are more visible
          const nodeSize = 1.2 + (depthFactor * 0.8) // Front nodes are slightly larger
          
          return (
            <circle
              key={`node-${index}`}
              cx={node.x}
              cy={node.y}
              r={nodeSize}
              fill={depthFactor > 0.7 ? "#666" : depthFactor > 0.4 ? "#777" : "#888"} // Darker fill for front nodes
              stroke="none"
              opacity={baseOpacity}
              className="transition-all duration-300"
            />
          )
        })}

        {/* Add a semi-transparent rectangle with the fuzz filter applied (reduced opacity for muted grain) */}
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="white"
          filter="url(#fuzz-effect)"
          opacity="0.03" /* Even more reduced opacity */
          pointerEvents="none" /* Ensures the fuzz layer doesn't block interactions */
        />

        {/* Overlay rectangle for overall muting effect (adjusted opacity) */}
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="#E8E8E8" /* A very light gray for muting */
          opacity="0.06" /* Subtle opacity to mute the colors */
          pointerEvents="none"
        />
      </svg>
    </div>
  )
}
