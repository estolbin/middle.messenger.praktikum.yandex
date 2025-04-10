import postcssNesting from 'postcss-nesting'

module.exports = {
    plugins: [
        require('precss')({}),
        require('autoprefixer')({}),
    ]
}