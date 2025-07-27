"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

interface AnimatedFlowLineProps {
  pathData: string
  strokeColor: string
  animationDuration?: number // in milliseconds for one full cycle
  segmentLengthRatio?: number // ratio of the total length for the animated segment
  animationKey: string // Unique key for this animation instance - changed from number to string
  onAnimationComplete: (key: string) => void // Callback when animation finishes - changed from number to string
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

  // Animate the stroke-dashoffset with smooth transitions
  useEffect(() => {
    if (pathLength === 0) return

    let animationFrameId: number
    let startTime: DOMHighResTimeStamp
    let completed = false

    const animate = (currentTime: DOMHighResTimeStamp) => {
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime

      const progress = Math.min(elapsed / animationDuration, 1)

      if (progress >= 1 && !completed) {
        completed = true
        // Delay completion callback slightly to prevent race conditions
        setTimeout(() => onAnimationComplete(animationKey), 50)
      }

      // Calculate segment length based on path length
      const segmentLength = pathLength * segmentLengthRatio

      // Smooth easing function for fluid movement
      const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1

      // Apply easing to progress for smoother animation
      const easedProgress = easeInOutCubic(progress)

      // Animate offset: smooth movement from right to left
      const currentOffset = pathLength - (pathLength + segmentLength) * easedProgress
      setOffset(currentOffset)

      // Simplified opacity: fade in quickly, stay visible, fade out at end
      let currentOpacity = 1
      if (progress < 0.1) {
        currentOpacity = progress / 0.1 // Fade in over first 10%
      } else if (progress > 0.9) {
        currentOpacity = (1 - progress) / 0.1 // Fade out over last 10%
      }
      
      setOpacity(Math.max(0, Math.min(1, currentOpacity)))

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
      completed = true
    }
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
      strokeWidth="2.0" // Slightly thicker for better visibility
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dashArray}
      strokeDashoffset={offset}
      opacity={opacity * 0.8 * layerOpacity} // Higher opacity for better visibility
      // Ensure no CSS transitions interfere with the JS animation
      className="transition-none"
    />
  )
}
