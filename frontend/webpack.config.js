const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssets = require("optimize-css-assets-webpack-plugin");

let config = {
  entry: {
    style : "./assets/style/style.js",
    vendors: ['./assets/vendors/js/jquery.min.js',],
    //These are all the available  vendors in the vendors folder. Load what you use only to generate a lightweight file!
    //vendors: ['./assets/vendors/js/jquery.min.js','./assets/vendors/js/fresco.js','./assets/vendors/js/remodal.js','./assets/vendors/js/slick.min.js','./assets/vendors/css/fresco.css','./assets/vendors/css/remodal/remodal.css','./assets/vendors/css/remodal/remodal-default-theme.css','./assets/vendors/css/slick.css'],
    main_script : "./assets/js/script.js",
  },
  output: {
    path: path.resolve(__dirname, "../ressources"),
    filename: '[name].js',
  },
  externals: {
    jquery: 'jQuery'
  },
  mode: 'development',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    },
    {
                // Apply rule for .sass, .scss or .css files
                test: /\.(sa|sc|c)ss$/,

                // Set loaders to transform files.
                // Loaders are applying from right to left(!)
                // The first loader will be applied after others
                use: [
                {
                    // After all CSS loaders we use plugin to do his work.
                    // It gets all transformed CSS and extracts it into separate
                    // single bundled file
                    loader: MiniCssExtractPlugin.loader
                },
                {
                    // This loader resolves url() and @imports inside CSS
                    loader: "css-loader",
                },
                {
                    // Then we apply postCSS fixes like autoprefixer and minifying
                    loader: "postcss-loader"
                },
                {
                    // First we transform SASS to standard CSS
                    loader: "sass-loader",
                    options: {
                        implementation: require("sass")
                    }
                }
                ]
            },
            {
                  test: /\.(png|svg|jpg|jpeg|gif)$/,
                  use: {
                      loader: 'url-loader?limit=false'
                  },
                  exclude: /node_modules/
              },

              {
                test: /jquery.+\.js$/,
                use: [{
                    loader: 'expose-loader',
                    options: {
                      exposes: ['$', 'jQuery'],
                    },
                }]
            }
    ]
  },

  plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
    ],

}

module.exports = config;

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(
    new OptimizeCSSAssets()
  );
}
