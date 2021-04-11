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
  const [alert, setAlert] = useState(false)
  const [alertCount, setAlertCount] = useState(1)
  const [renderOverlay, setRenderOverlay] = useState(false)
  const [url, setUrl] = useState(favicons[0].url)

  return (
    <>
      <Favicon
        alertCount={alert ? alertCount : null}
        animated={animated}
        renderOverlay={
          renderOverlay
            ? (canvas, context) => {
                const top = canvas.height - 9
                const left = canvas.width - 7 - 1
                const bottom = 16
                const right = 16
                const radius = 2

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

                context.font = 'bold 10px arial'
                context.fillStyle = '#FFF'
                context.textAlign = 'right'
                context.textBaseline = 'top'
                context.fillText('a', 15, 6)
              }
            : null
        }
        url={url}
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
              onChange={(e) => setAlert(e.target.checked)}
              type='checkbox'
              style={{ height: '20px', width: '20px' }}
            />
            <div>Alert count</div>
            {alert && (
              <>
                : {alertCount}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: '5px',
                  }}
                >
                  <div
                    onClick={() => setAlertCount(alertCount + 1)}
                    style={{
                      border: '1px solid black',
                      display: 'flex',
                      justifyContent: 'center',
                      margin: '1px',
                    }}
                  >
                    +
                  </div>
                  <div
                    onClick={() => setAlertCount(Math.max(0, alertCount - 1))}
                    style={{
                      border: '1px solid black',
                      display: 'flex',
                      justifyContent: 'center',
                      margin: '1px',
                    }}
                  >
                    -
                  </div>
                </div>
              </>
            )}
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
