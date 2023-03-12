import * as React from 'react'

export interface FaviconProps {
  readonly url: string | string[]
  readonly alertCount?: number | string
  readonly alertFillColor?: string
  readonly alertTextColor?: string
  readonly animated?: boolean
  readonly animationDelay?: number
  readonly keepIconLink?: () => boolean
  readonly renderOverlay?: (
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ) => void
  readonly iconSize?: number
}

declare const Favicon: React.SFC<FaviconProps>

export default Favicon
