const path = require('path');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.styl$/,
        loaders: [ 'style', 'raw', "stylus" ],
        include: path.resolve(__dirname, '../src/stylus')
      },
      {
        test: /\.css$/,
        loaders: [ 'style', 'raw' ],
        include: path.resolve(__dirname, '../src/static/css')
      }
    ]
  }
}
