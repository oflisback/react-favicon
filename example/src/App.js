import React, { useState } from 'react'

import Favicon from 'react-favicon'
import nyan from './nyan'

const favicons = [
  {
    animated: true,
    name: 'Nyan cat',
    url: nyan,
  },
  {
    name: 'Github',
    url: 'img/github.ico',
  },
  {
    name: 'Wikipedia',
    url: 'img/wikipedia.ico',
  },
]

const App = () => {
  const [animated, setAnimated] = useState(true)
  const [alertCount, setAlertCount] = useState(undefined)
  const [alertFillColor, setAlertFillColor] = useState('red')
  const [alertTextColor, setAlertTextColor] = useState('white')
  const [renderOverlay, setRenderOverlay] = useState(false)
  const [iconSize, setIconSize] = useState(16);
  const [url, setUrl] = useState(favicons[0].url)

  return (
    <>
      <Favicon
        alertCount={alert ? alertCount : null}
        alertFillColor={alertFillColor}
        alertTextColor={alertTextColor}
        animated={animated}
        renderOverlay={
          renderOverlay
            ? (canvas, context) => {

                // Create a rounded square taking 1/4 of the icon size;
                const top = canvas.height / 2;
                const left = canvas.width / 2;
                const bottom = canvas.height;
                const right = canvas.width;
                const radius = iconSize / 8;

                context.fillStyle = 'green'
                context.strokeStyle = 'green'
                context.lineWidth = 1

                context.beginPath()
                context.moveTo(left + radius, top)
                context.quadraticCurveTo(left, top, left, top + radius)
                context.lineTo(left, bottom - radius)
                context.quadraticCurveTo(left, bottom, left + radius, bottom)
                context.lineTo(right - radius, bottom)
                context.quadraticCurveTo(right, bottom, right, bottom - radius)
                context.lineTo(right, top + radius)
                context.quadraticCurveTo(right, top, right - radius, top)
                context.closePath()
                context.fill()

                // Make the text size dynamic depending on the icon size
                // Useful to avoid shrinking on bigger high res icons
                context.font = `bold ${iconSize / 1.8}px arial`
                context.fillStyle = '#FFF'
                context.textAlign = 'left'
                context.textBaseline = 'top'
                context.fillText('a', left + canvas.width / 8, top);
              }
            : null
        }
        url={url}
        iconSize={iconSize}
      />
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          justifyContent: 'center',
          userSelect: 'none',
          width: '100%',
        }}
      >
        <div>
          {favicons.map((favicon) => (
            <div key={favicon.url} style={{ display: 'flex' }}>
              <div
                style={{
                  border: '1px solid black',
                  cursor: 'pointer',
                  fontSize: '20pt',
                  fontWeight: favicon.url === url ? 'bold' : 'normal',
                  height: '50px',
                  lineHeight: '50px',
                  margin: '5px',
                  textAlign: 'center',
                  width: '200px',
                }}
                onClick={() => setUrl(favicon.url)}
              >
                {favicon.name}
              </div>
            </div>
          ))}
          <div
            style={{
              border: '1px solid black',
              cursor: 'pointer',
              fontSize: '20pt',
              fontWeight:
                typeof url === 'object' && url[0] === favicons[1].url
                  ? 'bold'
                  : 'normal',
              height: '50px',
              lineHeight: '50px',
              margin: '5px',
              textAlign: 'center',
              width: '200px',
            }}
            onClick={() => setUrl([favicons[1].url, favicons[2].url])}
          >
            Combination
          </div>
          <div
            style={{ alignItems: 'center', display: 'flex', height: '50px' }}
          >
            <input
              checked={animated}
              onChange={(e) => setAnimated(e.target.checked)}
              style={{ height: '20px', width: '20px' }}
              type='checkbox'
            />
            <div>Animated</div>
          </div>
          <div
            style={{ alignItems: 'center', display: 'flex', height: '50px' }}
          >
            <input
              onChange={(e) => setAlertCount(e.target.checked ? 1 : 0)}
              type='checkbox'
              style={{ height: '20px', width: '20px' }}
              checked={alertCount > 0}
            />
            <div>Alert count</div>
            <input type={"text"} value={alertCount} onChange={(e) => setAlertCount(e.target.value)} />
          </div>
          <div style={{ alignItems: 'center', display: 'flex' }}>
            {['red', 'black', 'blue'].map((color) => (
              <div
                key={color}
                onClick={() => setAlertFillColor(color)}
                style={{
                  border:
                    alertFillColor === color
                      ? '2px solid black'
                      : '1px solid black',
                  margin: '2px',
                  width: '20px',
                  height: '20px',
                  backgroundColor: color,
                }}
              />
            ))}
            <div
              style={{ alignItems: 'center', display: 'flex', height: '50px' }}
            >
              <div style={{ marginLeft: '4px' }}>Alert fill color</div>
            </div>
          </div>
          <div style={{ alignItems: 'center', display: 'flex' }}>
            {[16, 32, 57, 72, 96, 114, 120, 128, 144, 152, 180, 192, 195].map((size) => (
              <div
                key={size}
                onClick={() => setIconSize(size)}
                value={size}
                style={{
                  border: iconSize === size ? "2px solid black" : "1px solid black",
                  margin: '2px',
                  width: '25px',
                  height: '20px',
                }}
              >
                {size}
              </div>
            ))}
            <div
              style={{ alignItems: 'center', display: 'flex', height: '50px' }}
            >
              <div style={{ marginLeft: '4px' }}>Icon size</div>
            </div>
          </div>
          <div style={{ alignItems: 'center', display: 'flex' }}>
            {['white', 'black', 'yellow'].map((color) => (
              <div
                key={color}
                onClick={() => setAlertTextColor(color)}
                style={{
                  border:
                    alertTextColor === color
                      ? '2px solid black'
                      : '1px solid black',
                  margin: '2px',
                  width: '20px',
                  height: '20px',
                  backgroundColor: color,
                }}
              />
            ))}
            <div
              style={{ alignItems: 'center', display: 'flex', height: '50px' }}
            >
              <div style={{ marginLeft: '4px' }}>Alert text color</div>
            </div>
          </div>
          <div
            style={{ alignItems: 'center', display: 'flex', height: '50px' }}
          >
            <input
              onChange={(e) => setRenderOverlay(e.target.checked)}
              type='checkbox'
              style={{ height: '20px', width: '20px' }}
            />
            <div>Custom render overlay function</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
