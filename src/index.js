'use strict'

const React = require('react')
const PropTypes = require('prop-types')

const CanvasSize = 16
let linkEl

const drawAlert = (context, alertCount) => {
  context.font = 'bold 10px arial'
  const Padding = 3

  const w = context.measureText(alertCount).width + Padding
  const x = CanvasSize - w - Padding
  const y = CanvasSize / 2 - Padding
  const h = Padding + CanvasSize / 2
  const r = Math.min(w / 2, h / 2)

  context.beginPath()
  context.moveTo(x + r, y)
  context.arcTo(x + w, y, x + w, y + h, r)
  context.arcTo(x + w, y + h, x, y + h, r)
  context.arcTo(x, y + h, x, y, r)
  context.arcTo(x, y, x + w, y, r)
  context.closePath()
  context.fillStyle = 'red'
  context.fill()
  context.fillStyle = 'white'
  context.textBaseline = 'bottom'
  context.textAlign = 'right'
  context.fillText(alertCount, CanvasSize - 1.5 * Padding, CanvasSize)
}

function drawIcon({ url: src, alertCount, callback: cb, renderOverlay }) {
  const img = document.createElement('img')
  img.crossOrigin = 'Anonymous'
  img.onload = function () {
    const canvas = document.createElement('canvas')
    canvas.width = CanvasSize
    canvas.height = CanvasSize

    const context = canvas.getContext('2d')
    context.clearRect(0, 0, img.width, img.height)
    context.drawImage(img, 0, 0, canvas.width, canvas.height)

    if (alertCount) {
      drawAlert(context, alertCount)
    }

    if (renderOverlay) {
      renderOverlay(canvas, context)
    }

    cb(context.canvas.toDataURL())
  }
  img.src = src
}

class Favicon extends React.Component {
  static displayName = 'Favicon'

  static mountedInstances = []

  static getActiveInstance() {
    return Favicon.mountedInstances[Favicon.mountedInstances.length - 1]
  }

  static draw() {
    if (typeof document === 'undefined') return

    var activeInstance = Favicon.getActiveInstance()
    if (typeof linkEl === 'undefined') {
      var head = document.getElementsByTagName('head')[0]
      linkEl = document.createElement('link')
      linkEl.type = 'image/x-icon'
      linkEl.rel = 'icon'

      // remove existing favicons
      var links = head.getElementsByTagName('link')
      for (var i = links.length; --i >= 0; ) {
        if (
          /\bicon\b/i.test(links[i].getAttribute('rel')) &&
          !activeInstance.props.keepIconLink(links[i])
        ) {
          head.removeChild(links[i])
        }
      }

      head.appendChild(linkEl)
    }

    var currentUrl

    if (activeInstance.props.url instanceof Array) {
      currentUrl = activeInstance.props.url[activeInstance.state.animationIndex]
    } else {
      currentUrl = activeInstance.props.url
    }

    if (activeInstance.props.alertCount || activeInstance.props.renderOverlay) {
      drawIcon({
        alertCount: activeInstance.props.alertCount,
        callback: (url) => {
          linkEl.href = url
        },
        renderOverlay: activeInstance.props.renderOverlay,
        url: currentUrl,
      })
    } else {
      linkEl.href = currentUrl
    }
  }

  static update() {
    if (typeof document === 'undefined') return

    var activeInstance = Favicon.getActiveInstance()
    var isAnimated =
      activeInstance.props.url instanceof Array && activeInstance.props.animated

    // clear any running animations
    var intervalId = null
    clearInterval(activeInstance.state.animationLoop)

    if (isAnimated) {
      var animateFavicon = function animateFavicon() {
        var nextAnimationIndex =
          (activeInstance.state.animationIndex + 1) %
          activeInstance.props.url.length
        Favicon.draw()
        activeInstance.setState({ animationIndex: nextAnimationIndex })
      }
      intervalId = setInterval(
        animateFavicon,
        activeInstance.props.animationDelay
      )
      animateFavicon()
    } else {
      Favicon.draw()
    }

    activeInstance.setState({ animationLoop: intervalId })
  }

  state = {
    animationIndex: 0,
    animationLoop: null,
    animationRunning: false,
  }

  componentDidMount() {
    Favicon.mountedInstances.push(this)
    Favicon.update()
  }

  componentWillUnmount() {
    var activeInstance = Favicon.getActiveInstance()
    clearInterval(activeInstance.state.animationLoop)
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.url === this.props.url &&
      prevProps.animated === this.props.animated &&
      prevProps.alertCount === this.props.alertCount &&
      prevProps.renderOverlay === this.props.renderOverlay &&
      prevProps.keepIconLink === this.props.keepIconLink
    )
      return

    Favicon.update()
  }

  render() {
    return null
  }
}

Favicon.defaultProps = {
  alertCount: null,
  animated: true,
  animationDelay: 500,
  keepIconLink: () => false,
  renderOverlay: null,
  url: null,
}

Favicon.propTypes = {
  alertCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  animated: PropTypes.bool,
  animationDelay: PropTypes.number,
  keepIconLink: PropTypes.func,
  renderOverlay: PropTypes.func,
  url: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]).isRequired,
}

module.exports = Favicon
