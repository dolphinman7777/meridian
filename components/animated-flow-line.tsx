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

      // Smooth opacity animation with fade-in and fade-out to prevent flashing
      let currentOpacity = 1
      const fadeInDuration = 0.15 // Fade in over first 15% of animation
      const fadeOutStart = 0.75 // Start fading out at 75% completion
      
      if (progress < fadeInDuration) {
        // Smooth fade-in using easeOut function
        const fadeInProgress = progress / fadeInDuration
        currentOpacity = fadeInProgress * fadeInProgress * (3.0 - 2.0 * fadeInProgress) // smoothstep
      } else if (progress > fadeOutStart) {
        // Smooth fade-out using easeIn function
        const fadeOutProgress = (progress - fadeOutStart) / (1 - fadeOutStart)
        const easedFadeOut = fadeOutProgress * fadeOutProgress * (3.0 - 2.0 * fadeOutProgress) // smoothstep
        currentOpacity = 1 - easedFadeOut
      } else {
        // Fully opaque in the middle
        currentOpacity = 1
      }
      
      setOpacity(Math.max(0, Math.min(1, currentOpacity))) // Clamp between 0 and 1

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
