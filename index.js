require("@babel/polyfill");
require('ignore-styles')
require('@babel/core')
require("@babel/register")({
    presets: ['@babel/preset-react', ['@babel/env', {
            'targets': {
                'node': 'current'
            }
    }]],
    plugins: ['@babel/plugin-transform-runtime']
});

require('./server')