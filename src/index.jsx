import { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

const DefaultCanvasSize = 16
const linkElements = []

const drawAlert = (context, { fillColor, text, textColor, canvasSize }) => {
  // Allow same looking padding over differents iconSizes
  const Padding = canvasSize / 5
  // Allow readable text across differnts iconSizes
  context.font = `bold ${canvasSize - Padding * 2}px arial`

  const w =
    Math.min(
      // Take the text with if it's smaller than available space (eg: '2')
      context.measureText(text).width,
      // Or take the maximum size we'll force our text to fit in anyway (eg: '1000000')
      canvasSize - Padding
    ) + Padding

  const x = canvasSize - w
  const y = canvasSize / 2 - Padding
  const h = Padding + canvasSize / 2
  const r = Math.min(w / 2, h / 2)

  context.beginPath()
  context.moveTo(x + r, y)
  context.arcTo(x + w, y, x + w, y + h, r)
  context.arcTo(x + w, y + h, x, y + h, r)
  context.arcTo(x, y + h, x, y, r)
  context.arcTo(x, y, x + w, y, r)
  context.closePath()
  context.fillStyle = fillColor
  context.fill()
  context.fillStyle = textColor
  context.textBaseline = 'bottom'
  context.textAlign = 'right'
  context.fillText(
    text,
    canvasSize - Padding / 2,
    canvasSize,
    // This will prevent the text from going outside the favicon, instead it'll squeeze his with to fit in
    canvasSize - Padding
  )
}

const drawIcon = ({
  alertCount,
  alertFillColor,
  alertTextColor,
  callback,
  renderOverlay,
  url: src,
  canvasSize,
}) => {
  const img = document.createElement('img')
  img.crossOrigin = 'Anonymous'
  img.onload = function () {
    const canvas = document.createElement('canvas')
    canvas.width = canvasSize
    canvas.height = canvasSize

    const context = canvas.getContext('2d')
    context.clearRect(0, 0, img.width, img.height)
    context.drawImage(img, 0, 0, canvas.width, canvas.height)

    if (alertCount) {
      drawAlert(context, {
        fillColor: alertFillColor,
        textColor: alertTextColor,
        text: alertCount,
        canvasSize,
      })
    }

    if (renderOverlay) {
      renderOverlay(canvas, context)
    }
    callback(context.canvas.toDataURL())
  }
  img.src = src
}

const updateHtmlIconLink = (keepIconLink) => {
  if (typeof document === 'undefined') {
    return
  }

  if (linkElements.length === 0) {
    var head = document.getElementsByTagName('head')[0]

    const linkEl = document.createElement('link')
    linkEl.type = 'image/x-icon'
    linkEl.rel = 'icon'

    const linkApple = document.createElement('link')
    linkApple.rel = 'apple-touch-icon'

    linkElements.push(linkEl, linkApple)

    // remove existing favicons
    var links = head.getElementsByTagName('link')
    for (var i = links.length; --i >= 0; ) {
      if (
        /\bicon\b/i.test(links[i].getAttribute('rel')) &&
        !keepIconLink(links[i])
      ) {
        head.removeChild(links[i])
      }
    }

    linkElements.forEach((el) => head.appendChild(el))
  }
}

const Favicon = ({
  iconSize = DefaultCanvasSize,
  alertCount = null,
  alertFillColor = 'red',
  alertTextColor = 'white',
  animated = true,
  animationDelay = 500,
  keepIconLink = () => false,
  renderOverlay = null,
  url = null,
}) => {
  const animationIndex = useRef(0)
  const animationTickIntervalId = useRef(null)

  const [, updateState] = useState()
  const forceUpdate = useCallback(() => updateState({}), [])

  const onAnimationTick = useCallback(() => {
    updateHtmlIconLink(keepIconLink)
    animationIndex.current = (animationIndex.current + 1) % url.length
    forceUpdate()
  }, [forceUpdate, keepIconLink, url])

  // Perform initial favicon update
  useEffect(() => {
    onAnimationTick()
  }, [onAnimationTick])

  const isAnimated = url instanceof Array && animated

  useEffect(() => {
    if (isAnimated) {
      if (!animationTickIntervalId.current) {
        const intervalId = setInterval(onAnimationTick, animationDelay)
        animationTickIntervalId.current = intervalId
      }
    } else {
      if (animationTickIntervalId.current) {
        clearInterval(animationTickIntervalId.current)
        animationTickIntervalId.current = null
        updateHtmlIconLink(keepIconLink)
      }
    }
  }, [animationDelay, isAnimated, keepIconLink, onAnimationTick, url])

  const currentUrl = isAnimated
    ? url[animationIndex.current]
    : url instanceof Array
    ? url[0]
    : url

  if (alertCount || renderOverlay) {
    drawIcon({
      alertCount,
      alertFillColor,
      alertTextColor,
      callback: (url) => {
        linkElements.forEach((el) => (el.href = url))
      },
      renderOverlay,
      url: currentUrl,
      canvasSize: iconSize,
    })
  } else {
    linkElements.forEach((el) => (el.href = currentUrl))
  }

  return null
}

Favicon.propTypes = {
  iconSize: PropTypes.number,
  alertCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  alertFillColor: PropTypes.string,
  alertTextColor: PropTypes.string,
  animated: PropTypes.bool,
  animationDelay: PropTypes.number,
  keepIconLink: PropTypes.func,
  renderOverlay: PropTypes.func,
  url: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]).isRequired,
}

export default Favicon
