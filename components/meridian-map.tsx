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
  
  // Back layer - pre-defined stable coordinates
  const backLines = [
    { id: 'back-1', points: [{ x: 150, y: 120 }, { x: 250, y: 180 }, { x: 400, y: 160 }, { x: 550, y: 200 }] },
    { id: 'back-2', points: [{ x: 300, y: 250 }, { x: 450, y: 300 }, { x: 600, y: 280 }, { x: 750, y: 320 }] },
    { id: 'back-3', points: [{ x: 100, y: 350 }, { x: 280, y: 400 }, { x: 460, y: 380 }, { x: 640, y: 420 }] },
    { id: 'back-4', points: [{ x: 200, y: 480 }, { x: 350, y: 520 }, { x: 500, y: 500 }, { x: 680, y: 540 }] },
    { id: 'back-5', points: [{ x: 80, y: 200 }, { x: 220, y: 240 }, { x: 380, y: 220 }, { x: 520, y: 260 }] },
    { id: 'back-6', points: [{ x: 250, y: 350 }, { x: 400, y: 390 }, { x: 570, y: 370 }, { x: 720, y: 410 }] },
    { id: 'back-7', points: [{ x: 120, y: 450 }, { x: 270, y: 490 }, { x: 420, y: 470 }, { x: 570, y: 510 }] },
    { id: 'back-8', points: [{ x: 180, y: 150 }, { x: 320, y: 190 }, { x: 480, y: 170 }, { x: 620, y: 210 }] }
  ]
  
  layers.push({
    name: 'back',
    lines: backLines,
    opacity: 0.15,
    strokeWidth: 0.7,
    colors: ["#D5E8D5", "#D7E8D7", "#D0E8D0", "#D8E8D8", "#D2E8D2", "#D4E8D4"],
    blur: 'url(#depth-blur-back)'
  })
  
  // Middle layer - pre-defined stable coordinates
  const middleLines = [
    { id: 'mid-1', points: [{ x: 130, y: 100 }, { x: 280, y: 140 }, { x: 430, y: 120 }, { x: 580, y: 160 }] },
    { id: 'mid-2', points: [{ x: 320, y: 230 }, { x: 470, y: 270 }, { x: 620, y: 250 }, { x: 770, y: 290 }] },
    { id: 'mid-3', points: [{ x: 90, y: 320 }, { x: 240, y: 360 }, { x: 390, y: 340 }, { x: 540, y: 380 }] },
    { id: 'mid-4', points: [{ x: 240, y: 460 }, { x: 390, y: 500 }, { x: 540, y: 480 }, { x: 690, y: 520 }] },
    { id: 'mid-5', points: [{ x: 160, y: 180 }, { x: 310, y: 220 }, { x: 460, y: 200 }, { x: 610, y: 240 }] },
    { id: 'mid-6', points: [{ x: 280, y: 330 }, { x: 430, y: 370 }, { x: 580, y: 350 }, { x: 730, y: 390 }] },
    { id: 'mid-7', points: [{ x: 110, y: 430 }, { x: 260, y: 470 }, { x: 410, y: 450 }, { x: 560, y: 490 }] },
    { id: 'mid-8', points: [{ x: 200, y: 130 }, { x: 350, y: 170 }, { x: 500, y: 150 }, { x: 650, y: 190 }] },
    { id: 'mid-9', points: [{ x: 350, y: 280 }, { x: 500, y: 320 }, { x: 650, y: 300 }, { x: 800, y: 340 }] },
    { id: 'mid-10', points: [{ x: 140, y: 380 }, { x: 290, y: 420 }, { x: 440, y: 400 }, { x: 590, y: 440 }] }
  ]
  
  layers.push({
    name: 'middle',
    lines: middleLines,
    opacity: 0.20,
    strokeWidth: 0.8,
    colors: ["#C8E0C8", "#CAEACA", "#CCE0CC", "#C6E0C6", "#CEE0CE", "#D0E0D0"],
    blur: 'url(#depth-blur-middle)'
  })
  
  // Front layer - pre-defined stable coordinates
  const frontLines = [
    { id: 'front-1', points: [{ x: 120, y: 80 }, { x: 270, y: 120 }, { x: 420, y: 100 }, { x: 570, y: 140 }] },
    { id: 'front-2', points: [{ x: 300, y: 210 }, { x: 450, y: 250 }, { x: 600, y: 230 }, { x: 750, y: 270 }] },
    { id: 'front-3', points: [{ x: 80, y: 300 }, { x: 230, y: 340 }, { x: 380, y: 320 }, { x: 530, y: 360 }] },
    { id: 'front-4', points: [{ x: 220, y: 440 }, { x: 370, y: 480 }, { x: 520, y: 460 }, { x: 670, y: 500 }] },
    { id: 'front-5', points: [{ x: 150, y: 160 }, { x: 300, y: 200 }, { x: 450, y: 180 }, { x: 600, y: 220 }] },
    { id: 'front-6', points: [{ x: 270, y: 310 }, { x: 420, y: 350 }, { x: 570, y: 330 }, { x: 720, y: 370 }] },
    { id: 'front-7', points: [{ x: 100, y: 410 }, { x: 250, y: 450 }, { x: 400, y: 430 }, { x: 550, y: 470 }] },
    { id: 'front-8', points: [{ x: 190, y: 110 }, { x: 340, y: 150 }, { x: 490, y: 130 }, { x: 640, y: 170 }] },
    { id: 'front-9', points: [{ x: 340, y: 260 }, { x: 490, y: 300 }, { x: 640, y: 280 }, { x: 790, y: 320 }] },
    { id: 'front-10', points: [{ x: 130, y: 360 }, { x: 280, y: 400 }, { x: 430, y: 380 }, { x: 580, y: 420 }] },
    { id: 'front-11', points: [{ x: 260, y: 490 }, { x: 410, y: 530 }, { x: 560, y: 510 }, { x: 710, y: 550 }] },
    { id: 'front-12', points: [{ x: 160, y: 240 }, { x: 310, y: 280 }, { x: 460, y: 260 }, { x: 610, y: 300 }] }
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
  const maxAnimatedLines = 1
  
  // Use ref to track animation counter for unique keys
  const animationCounterRef = useRef(0)
  const completingAnimationsRef = useRef(new Set<string>())

  // Improved callback to remove an animation when it completes
  const handleAnimationComplete = useCallback((keyToRemove: string) => {
    // Prevent duplicate completion calls
    if (completingAnimationsRef.current.has(keyToRemove)) {
      return
    }
    
    completingAnimationsRef.current.add(keyToRemove)
    
    setAnimatedLines((prev) => {
      const filtered = prev.filter((item) => item.animationKey !== keyToRemove)
      return filtered
    })
    
    // Clean up the completion tracking after a short delay
    setTimeout(() => {
      completingAnimationsRef.current.delete(keyToRemove)
    }, 100)
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
    }, 6000) // Increased interval to 6 seconds to reduce flashing and allow animations to complete more smoothly

    return () => clearInterval(interval)
  }, [maxAnimatedLines, allLinesFlat])

  // Get animation colors based on layer - green tinted
  const getAnimationColor = (layer: string) => {
    switch (layer) {
      case 'back': return '#9BF2CA' // Light green
      case 'middle': return '#48D995' // Medium green  
      case 'front': return '#27F293' // Bright green
      default: return '#48D995'
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

        {/* Background grid lines - subtle green tint */}
        {Array.from({ length: 8 }).map((_, i) => ( // Reduced from 10 for less visual noise
          <line
            key={`h-line-${i}`}
            x1="0"
            y1={i * (SVG_HEIGHT / 8)}
            x2={SVG_WIDTH}
            y2={i * (SVG_HEIGHT / 8)}
            stroke="#e0ede0" // Very subtle green tint
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
            stroke="#e0ede0" // Very subtle green tint
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
          // Use deterministic duration based on path index to avoid randomness
          const baseDuration = 6000 + (pathIndex % 5) * 500 // 6s to 8s based on path
          const segmentRatio = 0.06 + (pathIndex % 3) * 0.01 // 0.06 to 0.08 based on path
          
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
