import * as React from "react";

export interface FaviconProps {
  readonly url: string | string[];
  readonly alertCount?: number;
  readonly animated?: boolean;
  readonly animationDelay?: number;
  readonly keepIconLink?: () => boolean;
  readonly renderOverlay?: (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => void;
}

export default class Favicon extends React.Component<FaviconProps> {}
