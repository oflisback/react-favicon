module.exports = {
  entry: './index.js',
  output: {
    filename: './dist/react-favicon.js',
    sourceMapFilename: './dist/react-favicon.map',
    library: 'Favicon',
    libraryTarget: 'umd'
  },
  externals: {
    'react/addons': 'React'
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'jsx-loader'}
    ]
  }
};
