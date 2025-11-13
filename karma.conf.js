export default function (config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'src/**/*.spec.js'
    ],
    preprocessors: {
      'src/**/*.spec.js': ['webpack']
    },
    webpack: {
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-react', { runtime: 'automatic' }]
                ]
              }
            }
          }
        ]
      }
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },
    browsers: ['ChromeHeadless'],
    singleRun: true
  })
}
