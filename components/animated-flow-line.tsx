"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

interface AnimatedFlowLineProps {
  pathData: string
  strokeColor: string
  animationDuration?: number // in milliseconds for one full cycle
  segmentLengthRatio?: number // ratio of the total length for the animated segment
  animationKey: number // Unique key for this animation instance
  onAnimationComplete: (key: number) => void // Callback when animation finishes
  layerOpacity?: number // Opacity multiplier for depth effect
}

export const AnimatedFlowLine: React.FC<AnimatedFlowLineProps> = ({
  pathData,
  strokeColor,
  animationDuration = 6000, // Slower duration for a more deliberate pulse
  segmentLengthRatio = 0.15,
  animationKey,
  onAnimationComplete,
  layerOpacity = 1, // Default to full opacity if not provided
}) => {
  const pathRef = useRef<SVGPathElement>(null)
  const [pathLength, setPathLength] = useState(0)
  const [offset, setOffset] = useState(0)
  const [opacity, setOpacity] = useState(1)

  // Get the total length of the path once it's rendered
  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength()
      setPathLength(length)
      // Initial offset: place the segment just off the end of the path
      setOffset(length)
    }
  }, [pathData])

  // Animate the stroke-dashoffset and opacity
  useEffect(() => {
    if (pathLength === 0) return

    let animationFrameId: number
    let startTime: DOMHighResTimeStamp

    const animate = (currentTime: DOMHighResTimeStamp) => {
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime

      const progress = elapsed / animationDuration

      if (progress >= 1) {
        // Animation complete, trigger callback and stop
        cancelAnimationFrame(animationFrameId)
        onAnimationComplete(animationKey)
        return
      }

      // Calculate segment length based on path length
      const segmentLength = pathLength * segmentLengthRatio

      // Animate offset: from pathLength (off-screen end) down to -segmentLength (off-screen start)
      // This makes a single segment travel from end to start
      const currentOffset = pathLength - (pathLength + segmentLength) * progress
      setOffset(currentOffset)

      // Animate opacity: fade out towards the end
      const fadeStartTimeRatio = 0.7 // Start fading when 70% of animation is done
      if (progress > fadeStartTimeRatio) {
        const fadeProgress = (progress - fadeStartTimeRatio) / (1 - fadeStartTimeRatio)
        setOpacity(1 - fadeProgress)
      } else {
        setOpacity(1) // Fully opaque during the main travel
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrameId)
  }, [pathLength, animationDuration, segmentLengthRatio, animationKey, onAnimationComplete])

  // Define the dash array: visible segment length, then a gap equal to the rest of the path
  // This ensures only ONE segment is ever visible on the path
  const segmentLength = pathLength * segmentLengthRatio
  const dashArray = `${segmentLength} ${pathLength}` // Visible segment, then a gap covering the rest of the path

  return (
    <path
      ref={pathRef}
      d={pathData}
      fill="none"
      stroke={strokeColor}
      strokeWidth="1.5" // Slightly thinner for more subtle effect
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dashArray}
      strokeDashoffset={offset}
      opacity={opacity * 0.6 * layerOpacity} // Apply both animation opacity and layer opacity
      // Ensure no CSS transitions interfere with the JS animation
      className="transition-none"
    />
  )
}
