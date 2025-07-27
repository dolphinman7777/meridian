"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"
import { AnimatedFlowLine } from "./animated-flow-line" // Import the new component
import { useState, useEffect, useCallback, useRef } from "react" // Import useState, useEffect, useCallback, and useRef

interface MeridianMapProps extends React.HTMLAttributes<HTMLDivElement> {}

// Helper to generate a deterministic offset based on index for consistent curves
const getDeterministicOffset = (index: number, max: number) => {
  // Use sine function for deterministic but varied offsets
  return Math.sin(index * 2.17) * max // 2.17 is a prime-like number for good distribution
}

// Function to generate SVG path data using cubic Bezier curves with deterministic offsets
const getBezierPathData = (points: { x: number; y: number }[], pathIndex: number = 0) => {
  if (points.length < 2) return ""

  let path = `M ${points[0].x} ${points[0].y}`
  const offsetFactor = 3 // Consistent offset factor

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i]
    const p1 = points[i + 1]

    // Calculate control points for a cubic Bezier curve with deterministic offsets
    const cp1x = p0.x + (p1.x - p0.x) / 3 + getDeterministicOffset(pathIndex * 10 + i, offsetFactor)
    const cp1y = p0.y + (p1.y - p0.y) / 3 + getDeterministicOffset(pathIndex * 10 + i + 1, offsetFactor)
    const cp2x = p0.x + ((p1.x - p0.x) * 2) / 3 + getDeterministicOffset(pathIndex * 10 + i + 2, offsetFactor)
    const cp2y = p0.y + ((p1.y - p0.y) * 2) / 3 + getDeterministicOffset(pathIndex * 10 + i + 3, offsetFactor)

    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`
  }
  return path
}

// Function to generate a deterministic point based on index
const getDeterministicPoint = (index: number, maxX: number, maxY: number) => ({
  x: (Math.sin(index * 1.23) * 0.5 + 0.5) * maxX, // 1.23 for good distribution
  y: (Math.cos(index * 1.73) * 0.5 + 0.5) * maxY, // 1.73 for different pattern
})

// Generate a set of interconnected paths with deterministic "meridian-like" flow
const generateMeridianPaths = (numPaths: number, numSegmentsPerPath: number, maxX: number, maxY: number) => {
  const generatedLines = []
  // Subtle green-tinted colors
  const customColors = ["#E8F5E8", "#EAEAEA", "#E5F2E5", "#ECECEC", "#E7F4E7", "#F0F0F0"]
  for (let i = 0; i < numPaths; i++) {
    const points = []
    let pointIndex = i * 100 // Start each path with a different base index
    let currentPoint = getDeterministicPoint(pointIndex, maxX, maxY)
    points.push(currentPoint)

    for (let j = 0; j < numSegmentsPerPath; j++) {
      pointIndex += 1
      // Generate next point using deterministic function
      const nextPoint = getDeterministicPoint(pointIndex, maxX, maxY)
      points.push(nextPoint)
      currentPoint = nextPoint
    }

    generatedLines.push({
      id: `path-${i}`,
      strokeColor: customColors[i % customColors.length], // Use the green-tinted colors
      points: points,
    })
  }
  return generatedLines
}

const SVG_WIDTH = 1000
const SVG_HEIGHT = 600

// Pre-defined stable meridian paths to avoid any client/server switching
const createStableMeridianPaths = () => {
  const layers = []
  
  // Back layer - spread across full canvas
  const backLines = [
    { id: 'back-1', points: [{ x: 50, y: 80 }, { x: 300, y: 120 }, { x: 650, y: 100 }, { x: 950, y: 140 }] },
    { id: 'back-2', points: [{ x: 30, y: 180 }, { x: 350, y: 220 }, { x: 700, y: 200 }, { x: 970, y: 240 }] },
    { id: 'back-3', points: [{ x: 70, y: 280 }, { x: 400, y: 320 }, { x: 750, y: 300 }, { x: 980, y: 340 }] },
    { id: 'back-4', points: [{ x: 40, y: 380 }, { x: 320, y: 420 }, { x: 680, y: 400 }, { x: 940, y: 440 }] },
    { id: 'back-5', points: [{ x: 60, y: 480 }, { x: 380, y: 520 }, { x: 720, y: 500 }, { x: 960, y: 540 }] },
    { id: 'back-6', points: [{ x: 20, y: 130 }, { x: 280, y: 170 }, { x: 600, y: 150 }, { x: 920, y: 190 }] },
    { id: 'back-7', points: [{ x: 80, y: 230 }, { x: 420, y: 270 }, { x: 760, y: 250 }, { x: 990, y: 290 }] },
    { id: 'back-8', points: [{ x: 10, y: 330 }, { x: 360, y: 370 }, { x: 640, y: 350 }, { x: 900, y: 390 }] },
    { id: 'back-9', points: [{ x: 90, y: 430 }, { x: 340, y: 470 }, { x: 630, y: 450 }, { x: 930, y: 490 }] },
    { id: 'back-10', points: [{ x: 25, y: 530 }, { x: 310, y: 570 }, { x: 590, y: 550 }, { x: 880, y: 580 }] }
  ]
  
  layers.push({
    name: 'back',
    lines: backLines,
    opacity: 0.15,
    strokeWidth: 0.7,
    colors: ["#D5E8D5", "#D7E8D7", "#D0E8D0", "#D8E8D8", "#D2E8D2", "#D4E8D4"],
    blur: 'url(#depth-blur-back)'
  })
  
  // Middle layer - spread across full canvas
  const middleLines = [
    { id: 'mid-1', points: [{ x: 15, y: 60 }, { x: 250, y: 100 }, { x: 580, y: 80 }, { x: 895, y: 120 }] },
    { id: 'mid-2', points: [{ x: 85, y: 160 }, { x: 380, y: 200 }, { x: 680, y: 180 }, { x: 945, y: 220 }] },
    { id: 'mid-3', points: [{ x: 35, y: 260 }, { x: 320, y: 300 }, { x: 620, y: 280 }, { x: 915, y: 320 }] },
    { id: 'mid-4', points: [{ x: 105, y: 360 }, { x: 410, y: 400 }, { x: 740, y: 380 }, { x: 985, y: 420 }] },
    { id: 'mid-5', points: [{ x: 25, y: 460 }, { x: 280, y: 500 }, { x: 560, y: 480 }, { x: 835, y: 520 }] },
    { id: 'mid-6', points: [{ x: 95, y: 110 }, { x: 340, y: 150 }, { x: 640, y: 130 }, { x: 905, y: 170 }] },
    { id: 'mid-7', points: [{ x: 45, y: 210 }, { x: 390, y: 250 }, { x: 710, y: 230 }, { x: 975, y: 270 }] },
    { id: 'mid-8', points: [{ x: 115, y: 310 }, { x: 360, y: 350 }, { x: 660, y: 330 }, { x: 925, y: 370 }] },
    { id: 'mid-9', points: [{ x: 5, y: 410 }, { x: 330, y: 450 }, { x: 610, y: 430 }, { x: 875, y: 470 }] },
    { id: 'mid-10', points: [{ x: 75, y: 510 }, { x: 370, y: 550 }, { x: 690, y: 530 }, { x: 955, y: 570 }] },
    { id: 'mid-11', points: [{ x: 55, y: 35 }, { x: 300, y: 75 }, { x: 600, y: 55 }, { x: 865, y: 95 }] },
    { id: 'mid-12', points: [{ x: 125, y: 135 }, { x: 420, y: 175 }, { x: 750, y: 155 }, { x: 995, y: 195 }] }
  ]
  
  layers.push({
    name: 'middle',
    lines: middleLines,
    opacity: 0.20,
    strokeWidth: 0.8,
    colors: ["#C8E0C8", "#CAEACA", "#CCE0CC", "#C6E0C6", "#CEE0CE", "#D0E0D0"],
    blur: 'url(#depth-blur-middle)'
  })
  
  // Front layer - spread across full canvas
  const frontLines = [
    { id: 'front-1', points: [{ x: 10, y: 40 }, { x: 220, y: 80 }, { x: 540, y: 60 }, { x: 890, y: 100 }] },
    { id: 'front-2', points: [{ x: 65, y: 140 }, { x: 360, y: 180 }, { x: 650, y: 160 }, { x: 935, y: 200 }] },
    { id: 'front-3', points: [{ x: 20, y: 240 }, { x: 290, y: 280 }, { x: 590, y: 260 }, { x: 880, y: 300 }] },
    { id: 'front-4', points: [{ x: 90, y: 340 }, { x: 430, y: 380 }, { x: 720, y: 360 }, { x: 970, y: 400 }] },
    { id: 'front-5', points: [{ x: 40, y: 440 }, { x: 310, y: 480 }, { x: 580, y: 460 }, { x: 850, y: 500 }] },
    { id: 'front-6', points: [{ x: 120, y: 90 }, { x: 380, y: 130 }, { x: 670, y: 110 }, { x: 920, y: 150 }] },
    { id: 'front-7', points: [{ x: 5, y: 190 }, { x: 340, y: 230 }, { x: 630, y: 210 }, { x: 895, y: 250 }] },
    { id: 'front-8', points: [{ x: 75, y: 290 }, { x: 350, y: 330 }, { x: 640, y: 310 }, { x: 905, y: 350 }] },
    { id: 'front-9', points: [{ x: 110, y: 390 }, { x: 400, y: 430 }, { x: 700, y: 410 }, { x: 960, y: 450 }] },
    { id: 'front-10', points: [{ x: 30, y: 490 }, { x: 270, y: 530 }, { x: 550, y: 510 }, { x: 820, y: 550 }] },
    { id: 'front-11', points: [{ x: 100, y: 15 }, { x: 320, y: 55 }, { x: 610, y: 35 }, { x: 875, y: 75 }] },
    { id: 'front-12', points: [{ x: 50, y: 115 }, { x: 390, y: 155 }, { x: 680, y: 135 }, { x: 945, y: 175 }] },
    { id: 'front-13', points: [{ x: 15, y: 340 }, { x: 260, y: 380 }, { x: 520, y: 360 }, { x: 785, y: 400 }] },
    { id: 'front-14', points: [{ x: 85, y: 540 }, { x: 350, y: 580 }, { x: 620, y: 560 }, { x: 885, y: 590 }] }
  ]
  
  layers.push({
    name: 'front',
    lines: frontLines,
    opacity: 0.30,
    strokeWidth: 1.0,
    colors: ["#B0D0B0", "#B2D0B2", "#B4D0B4", "#AED0AE", "#B6D0B6", "#B8D0B8"],
    blur: 'none'
  })
  
  return layers
}

export function MeridianMap({ className, ...props }: MeridianMapProps) {
  // Use stable paths from the start - no client/server switching
  const [layeredPaths] = useState(() => createStableMeridianPaths())
  const [allLinesFlat] = useState(() => 
    layeredPaths.flatMap(layer => 
      layer.lines.map(line => ({ ...line, layer: layer.name }))
    )
  )
  const [uniqueNodes] = useState(() => {
    const allNodes = layeredPaths.flatMap(layer => layer.lines.flatMap(line => line.points))
    return Array.from(new Map(allNodes.map((node) => [`${node.x},${node.y}`, node])).values())
  })
  
  const [animatedLines, setAnimatedLines] = useState<Array<{ line: any, layer: string, animationKey: string }>>([])
  const maxAnimatedLines = 4
  
  // Use ref to track animation counter for unique keys
  const animationCounterRef = useRef(0)

  // Simplified callback to remove an animation when it completes
  const handleAnimationComplete = useCallback((keyToRemove: string) => {
    setAnimatedLines((prev) => prev.filter((item) => item.animationKey !== keyToRemove))
  }, [])

  useEffect(() => {
    if (allLinesFlat.length === 0) return

    const interval = setInterval(() => {
      setAnimatedLines((prev) => {
        // If we're at the max, don't add more
        if (prev.length >= maxAnimatedLines) {
          return prev
        }
        
        // Add a new animated line from any layer
        const randomIndex = Math.floor(Math.random() * allLinesFlat.length)
        const lineToAnimate = allLinesFlat[randomIndex]
        
        // Generate a truly unique key using counter and timestamp
        animationCounterRef.current += 1
        const uniqueKey = `anim-${animationCounterRef.current}-${Date.now()}`

        const newAnimatedLine = { 
          line: lineToAnimate, 
          layer: lineToAnimate.layer,
          animationKey: uniqueKey
        }

        return [...prev, newAnimatedLine]
      })
    }, 1800) // Balanced interval to prevent glitching while maintaining pulsating effect

    return () => clearInterval(interval)
  }, [maxAnimatedLines, allLinesFlat])

  // Get animation colors based on layer - brighter for more pronounced pulsating
  const getAnimationColor = (layer: string) => {
    switch (layer) {
      case 'back': return '#7EE8B5' // Brighter light green
      case 'middle': return '#2BC97D' // Brighter medium green  
      case 'front': return '#00E676' // Vibrant bright green
      default: return '#2BC97D'
    }
  }

  // Get animation opacity based on layer - higher for more pronounced pulsating
  const getAnimationOpacity = (layer: string) => {
    switch (layer) {
      case 'back': return 0.7 // Higher for more visible pulsating
      case 'middle': return 0.8 // Higher for more visible pulsating
      case 'front': return 1.0 // Full opacity for strongest pulsating effect
      default: return 0.8
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

        {/* Background grid lines - subtle green tint */}
        {Array.from({ length: 8 }).map((_, i) => ( // Reduced from 10 for less visual noise
          <line
            key={`h-line-${i}`}
            x1="0"
            y1={i * (SVG_HEIGHT / 8)}
            x2={SVG_WIDTH}
            y2={i * (SVG_HEIGHT / 8)}
            stroke="#d8e8d8" // Slightly darker green tint for better visibility
            strokeWidth="0.5" // Slightly thicker
            opacity="0.6" // More visible
          />
        ))}
        {Array.from({ length: 8 }).map((_, i) => ( // Reduced from 10
          <line
            key={`v-line-${i}`}
            x1={i * (SVG_WIDTH / 8)}
            y1="0"
            x2={i * (SVG_WIDTH / 8)}
            y2={SVG_HEIGHT}
            stroke="#d8e8d8" // Slightly darker green tint for better visibility
            strokeWidth="0.5" // Slightly thicker
            opacity="0.6" // More visible
          />
        ))}

        {/* Render the layered static lines from back to front */}
        {layeredPaths.map((layer) => (
          <g key={layer.name}>
            {layer.lines.map((line, index) => (
              <path
                key={`${layer.name}-${line.id}`}
                d={getBezierPathData(line.points, index)}
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
        {animatedLines.map((item, animIndex) => {
          // Extract numeric part from any ID format (back-1, mid-2, front-3, etc.)
          const pathIndex = parseInt(item.line.id.split('-')[1]) || animIndex
          // Consistent duration for smooth left-to-right flow
          const baseDuration = 3000 + (pathIndex % 2) * 200 // 3s to 3.2s for smooth consistent pulsating
          const segmentRatio = 0.15 + (pathIndex % 2) * 0.05 // 0.15 to 0.20 for visible pulse segments
          
          return (
            <AnimatedFlowLine
              key={item.animationKey}
              pathData={getBezierPathData(item.line.points, pathIndex)}
              strokeColor={getAnimationColor(item.layer)}
              animationDuration={baseDuration}
              segmentLengthRatio={segmentRatio}
              animationKey={item.animationKey}
              onAnimationComplete={handleAnimationComplete}
              layerOpacity={getAnimationOpacity(item.layer)}
            />
          )
        })}

        {/* Render the subtle nodes with depth - green tinted */}
        {uniqueNodes.map((node, index) => {
          const depthFactor = (Math.sin(index * 0.7) + 1) / 2 // Deterministic depth factor using sine
          const baseOpacity = 0.15 + (depthFactor * 0.2) // More visible nodes
          const nodeSize = 1.2 + (depthFactor * 0.6) // Larger nodes
          
          return (
            <circle
              key={`node-${index}`}
              cx={node.x}
              cy={node.y}
              r={nodeSize}
              fill={depthFactor > 0.7 ? "#A8D5A8" : depthFactor > 0.4 ? "#B5D5B5" : "#C0D5C0"} // Green-tinted fills
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
