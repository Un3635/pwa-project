var webpack = require("webpack");
var path = require("path");

module.exports = {
    entry:{
        home:"./server.js",
    },
    output:{
        path:__dirname + "/dist/js",
        filename:"[name].min.js"
    },
    plugins:[
      new webpack.ProvidePlugin({
        $:"jquery",
        jQuery:"jquery",
        "window.jQuery":"jquery"
      })
    ]
}