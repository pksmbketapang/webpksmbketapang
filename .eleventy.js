const execSync = require('child_process').execSync
const ampPlugin = require('@ampproject/eleventy-plugin-amp')
const htmlmin = require('html-minifier')
const cheerio = require('cheerio')

module.exports = function(eleventyConfig) {
    //passthrough copy files
    eleventyConfig.addPassthroughCopy({
        "assets/img": "img",
        "assets/media": "media",
        "assets/favicons": "."
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
    eleventyConfig.addLayoutAlias('blank', 'templates/blank.liquid')
    eleventyConfig.addLayoutAlias('amp-story', 'templates/amp-story.liquid')

    // build events
    eleventyConfig.on('beforeBuild', function() {
        execSync('npx gulp csscompile')
    })

    //replace image links
    eleventyConfig.addTransform('replaceImgLinks', function(content, outputPath) {
        if (process.env.ELEVENTY_ENV === 'prod') {
            if (outputPath.endsWith('.html')) {
                let $ = cheerio.load(content)
                $('amp-img').each(function() {
                    let imgUrl = $(this).attr('src')
                    let imgWidth = $(this).attr('width')
                    let imgHeight = $(this).attr('height')
                    imgUrl = `https://res.cloudinary.com/dpc-pks-mb-ketapang/image/fetch/w_${imgWidth},h_${imgHeight},c_fill,f_auto/` + imgUrl
                    $(this).attr('src', imgUrl)
                })
                $('a.foto-personalia').each(function() {
                    let imgUrl = $(this).css('background-image').split("'")[1]
                    let imgWidth = 150
                    let imgHeight = 150
                    imgUrl = `https://res.cloudinary.com/dpc-pks-mb-ketapang/image/fetch/w_${imgWidth},h_${imgHeight},c_fill,f_auto/` + imgUrl
                    $(this).css('background-image', `url('${imgUrl}')`)
                })
                $('div#aleg-portal-image').each(function() {
                    let imgUrl = $(this).css('background-image').split("'")[1]
                    let imgWidth = 200
                    let imgHeight = 200
                    imgUrl = `https://res.cloudinary.com/dpc-pks-mb-ketapang/image/fetch/w_${imgWidth},h_${imgHeight},c_fill,f_auto/` + imgUrl
                    $(this).css('background-image', `url('${imgUrl}')`)
                })
                return $.html()
            }
        } else {
            return content
        }
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