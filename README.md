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
- Custom icon overlay

## Props

| Name           | Type                       | Default     | Required | Description                                        |
| -------------- | -------------------------- | ----------- | -------- | -------------------------------------------------- |
| alertCount     | number or string           | null        | No       | Number or string to display as icon overlay.       |
| alertFillColor | string                     | red         | No       | Alert bubble background color.                     |
| alertTextColor | string                     | white       | No       | Alert bubble text color.                           |
| iconSize       | number                     | 16          | No       | Size of the favicon to avoid pixelization          |
| animated       | boolean                    | true        | No       | True to animate favicon (for supported icons)      |
| animationDelay | number                     | 500         | No       | Time between animation frames                      |
| keepIconLink   | function()                 | () => false | No       | Return true to remove icon link from document head |
| renderOverlay  | function(canvas, context)  | null        | No       | Function called to to draw custom favicon overlay  |
| url            | string or array of strings |             | Yes      | Favicon url or array of url:s to animate the icons |

## Usage

```javascript
<Favicon url={[url1, url2, url3]} />
```

See [example](./example) for the demo page source code. Basic usage is as simple as importing the react-favicon package and including a Favicon component in the react component tree.

```javascript
import React from "react";
import ReactDOM from "react-dom";
import Favicon from "react-favicon";

ReactDOM.render(
  <div>
    <Favicon url="http://oflisback.github.io/react-favicon/img/github.ico" />
    <h1>Hello, Favicon!</h1>
  </div>,
  document.getElementById("root")
);
```
