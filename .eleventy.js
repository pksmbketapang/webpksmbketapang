const execSync = require('child_process').execSync
const ampPlugin = require('@ampproject/eleventy-plugin-amp')
const htmlmin = require('html-minifier')
const cheerio = require('cheerio')
const sitemap = require('@quasibit/eleventy-plugin-sitemap')

module.exports = function(eleventyConfig) {
    //passthrough copy files
    eleventyConfig.addPassthroughCopy({
        "assets/img": "img",
        "assets/media": "media",
        "assets/favicons": ".",
        "assets/static": "."
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
                    if ($(this).parent().is('amp-story-grid-layer')) {
                        imgUrl = `https://res.cloudinary.com/dpc-pks-mb-ketapang/image/fetch/w_${imgWidth},h_${imgHeight},c_pad,b_auto:predominant,f_auto/` + imgUrl
                    } else {
                        imgUrl = `https://res.cloudinary.com/dpc-pks-mb-ketapang/image/fetch/w_${imgWidth},h_${imgHeight},c_fill,f_auto/` + imgUrl
                    }
                    $(this).attr('src', imgUrl)
                })
                $('a.foto-personalia').each(function() {
                    let imgUrl = $(this).css('background-image').split("'")[1]
                    imgUrl = `https://res.cloudinary.com/dpc-pks-mb-ketapang/image/fetch/w_150,h_150,c_fill,f_auto/` + imgUrl
                    $(this).css('background-image', `url('${imgUrl}')`)
                })
                $('div#aleg-portal-image').each(function() {
                    let imgUrl = $(this).css('background-image').split("'")[1]
                    imgUrl = `https://res.cloudinary.com/dpc-pks-mb-ketapang/image/fetch/w_200,h_200,c_fill,f_auto/` + imgUrl
                    $(this).css('background-image', `url('${imgUrl}')`)
                })
                $('amp-video').each(function() {
                    let videoPath = $(this).attr('src').replace('https://pksmbketapang.org/media/', '').slice(0, -4)
                    let vWidth = $(this).attr('width')
                    let vHeight = $(this).attr('height')
                    $(this).attr('src', null)
                    $(this).attr('poster', `https://res.cloudinary.com/dpc-pks-mb-ketapang/video/upload/w_${vWidth},h_${vHeight},c_fill/media/${videoPath}.jpg`)
                    if ($(this).parent().is('amp-story-grid-layer')) {
                        $(this).append(`<source src="https://res.cloudinary.com/dpc-pks-mb-ketapang/video/upload/w_${vWidth},h_${vHeight},c_pad,b_blurred:400:10/media/${videoPath}.webm" type="video/webm" />`)
                        $(this).append(`<source src="https://res.cloudinary.com/dpc-pks-mb-ketapang/video/upload/w_${vWidth},h_${vHeight},c_pad,b_blurred:400:10/media/${videoPath}.mp4" type="video/mp4" />`)
                        $(this).append(`<source src="https://res.cloudinary.com/dpc-pks-mb-ketapang/video/upload/w_${vWidth},h_${vHeight},c_pad,b_blurred:400:10/media/${videoPath}.ogv" type="video/ogg" />`)
                    } else {
                        $(this).append(`<source src="https://res.cloudinary.com/dpc-pks-mb-ketapang/video/upload/w_${vWidth},h_${vHeight},c_fill/media/${videoPath}.webm" type="video/webm" />`)
                        $(this).append(`<source src="https://res.cloudinary.com/dpc-pks-mb-ketapang/video/upload/w_${vWidth},h_${vHeight},c_fill/media/${videoPath}.mp4" type="video/mp4" />`)
                        $(this).append(`<source src="https://res.cloudinary.com/dpc-pks-mb-ketapang/video/upload/w_${vWidth},h_${vHeight},c_fill/media/${videoPath}.ogv" type="video/ogg" />`)
                    }
                })
                return $.html()
            }
        } else {
            return content
        }
    })

    //Sitemap Plugin conf
    eleventyConfig.addPlugin(sitemap, {
        sitemap: {
            hostname: "https://pksmbketapang.org"
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