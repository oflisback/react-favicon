import React, { useState } from 'react'

import Favicon from 'react-favicon'
import nyan from './nyan'

const favicons = [
  {
    name: 'Github',
    url: 'img/github.ico'
  },
  {
    animated: true,
    name: 'Nyancat',
    url: nyan
  },
  {
    name: 'Wikipedia',
    url: 'img/wikipedia.ico'
  }
]

const App = () => {
  const [animated, setAnimated] = useState(false)
  const [alert, setAlert] = useState(false)
  const [alertCount, setAlertCount] = useState(1)
  const [url, setUrl] = useState(favicons[0].url)

  return (
    <>
      <Favicon
        alertCount={alert ? alertCount : null}
        animated={animated}
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
          width: '100%'
        }}
      >
        <div>
          <div
            style={{
              margin: '5px',
              textAlign: 'center',
              width: '200px'
            }}
          >
            Pick a favicon
          </div>
          {favicons.map((favicon) => (
            <div style={{ display: 'flex' }}>
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
                  width: '200px'
                }}
                onClick={() => setUrl(favicon.url)}
              >
                {favicon.name}
              </div>
              {favicon.animated && (
                <div
                  style={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '10px',
                    visibility: favicon.url === url ? 'visible' : 'hidden'
                  }}
                >
                  <div>Animated</div>
                  <input
                    onChange={(e) => setAnimated(e.target.checked)}
                    type='checkbox'
                    style={{ height: '20px', width: '20px' }}
                  />
                </div>
              )}
            </div>
          ))}
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
                    marginLeft: '5px'
                  }}
                >
                  <div
                    onClick={() => setAlertCount(alertCount + 1)}
                    style={{
                      border: '1px solid black',
                      display: 'flex',
                      justifyContent: 'center',
                      margin: '1px'
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
                      margin: '1px'
                    }}
                  >
                    -
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
