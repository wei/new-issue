import CopyWebpackPlugin from 'copy-webpack-plugin'

export default (config, env, helpers) => {
  config.plugins.push( new CopyWebpackPlugin([
    {
      context: `${__dirname}`,
      from: `public`,
      force: true,
    }
  ]));

  delete config.entry.polyfills
  config.output.filename = '[name].js'

  let { plugin } = helpers.getPluginsByName(config, 'ExtractTextPlugin')[0]
  plugin.options.disable = true

  if (env.production) {
    config.output.libraryTarget = 'umd'
  }
}
