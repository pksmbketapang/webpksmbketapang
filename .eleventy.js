const execSync = require('child_process').execSync
const ampPlugin = require('@ampproject/eleventy-plugin-amp')
const htmlmin = require('html-minifier')

module.exports = function(eleventyConfig) {
    //passthrough copy files
    eleventyConfig.addPassthroughCopy({
        "assets/img": "img"
    })

    //liquid Options
    eleventyConfig.setLiquidOptions({
        dynamicPartials: true
    })

    //layout aliases
    eleventyConfig.addLayoutAlias('base', 'templates/base.liquid')
    eleventyConfig.addLayoutAlias('layout', 'templates/layout.liquid')
    eleventyConfig.addLayoutAlias('content', 'templates/content.liquid')
    eleventyConfig.addLayoutAlias('page', 'templates/page.liquid')

    // build events
    eleventyConfig.on('beforeBuild', function() {
        execSync('npx gulp csscompile')
    })

    // AMP Plugin
    eleventyConfig.addPlugin(ampPlugin)

    //minify output
    eleventyConfig.addTransform('minify', function(content, outputPath) {
        if (outputPath.endsWith('.html')) {
            let minified = htmlmin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true,
                minifyJS: true,
                minifyCSS: true,
                processScripts: [
                    "text/javascript",
                    "application/ld+json"
                ]
            })
            return minified
        }
        return content
    })
    
    // default dirs
    return {
        dir: {
            input: 'src',
            output: 'dist'
        }
    }
}