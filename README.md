# react-favicon

Control the favicon from a React app

## Demo

http://oflisback.github.io/react-favicon

This example is available in [example](./example).

## Installation

```
npm install react-favicon --save
```

## Features

- Update the favicon with a url or base64 encoded image
- Animate through a list of urls
- Toggle animation
- Alert bubbles
- Allow some favicons to be kept on the page, which may be desirable for desktop Safari

## Usage

```javascript
<Favicon url={[url1, url2, url3]} />
```

See [example](./example) for the demo page source code. Basic usage is as simple as importing the react-favicon package and including a Favicon component in the react component tree.

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import Favicon from 'react-favicon'

ReactDOM.render(
  <div>
    <Favicon url='http://oflisback.github.io/react-favicon/img/github.ico' />
    <h1>Hello, Favicon!</h1>
  </div>,
  document.getElementById('root')
)
```
