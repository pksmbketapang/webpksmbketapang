const execSync = require('child_process').execSync
const ampPlugin = require('@ampproject/eleventy-plugin-amp')
const htmlmin = require('html-minifier')
const cheerio = require('cheerio')
const typeset = require('eleventy-plugin-typeset')
const moment = require('moment')
moment.locale('id')
const _ = require('lodash')

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

    //filters
    eleventyConfig.addFilter('dateIso', function(date){
        return moment(date).toISOString()
    })

    eleventyConfig.addFilter('dateReadable', function(date){
        return moment(date).format('LL')
    })

    // deep merge
    eleventyConfig.setDataDeepMerge(true)

    // build events
    eleventyConfig.on('beforeBuild', function() {
        execSync('npx gulp csscompile')
    })

    eleventyConfig.on('afterBuild', function() {
        execSync('npx gulp buildsw')
    })

    //typeset
    eleventyConfig.addPlugin(typeset({
        only: '#content-main',
        disable: ['hyphenate', 'ligatures']
    }))

    //replace image links
    eleventyConfig.addTransform('replaceImgLinks', function(content, outputPath) {
        if (process.env.ELEVENTY_ENV === 'prod') {
            if (outputPath.endsWith('.html')) {

                let $ = cheerio.load(content)

                $('amp-img').each(function() {
                    let imgUrl = $(this).attr('src')
                    let imgWidth = $(this).attr('width')
                    let imgHeight = $(this).attr('height')
                    let fetchmode = 'image/fetch'

                    if (imgUrl.endsWith('.mp4')) {
                        imgUrl = imgUrl.replace('.mp4', '.jpg').replace('https://pksmbketapang.org/', '')
                        fetchmode = 'video/upload'
                    }

                    if ($(this).parent().is('amp-story-grid-layer')) {
                        imgUrl = `https://res.cloudinary.com/dpc-pks-mb-ketapang/${fetchmode}/w_${imgWidth},h_${imgHeight},c_pad,b_auto:predominant,f_auto/` + imgUrl
                    } else {
                        imgUrl = `https://res.cloudinary.com/dpc-pks-mb-ketapang/${fetchmode}/w_${imgWidth},h_${imgHeight},c_fill,f_auto/` + imgUrl
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

                $('amp-story').each(function() {
                    let poster = $(this).attr('poster-portrait-src')
                    let fetchmode = 'image/fetch'
                    if (poster.endsWith('.mp4')) {
                        poster = poster.replace('.mp4', '.jpg').replace('https://pksmbketapang.org/', '')
                        fetchmode = 'video/upload'
                    }
                    poster = `https://res.cloudinary.com/dpc-pks-mb-ketapang/${fetchmode}/w_600,h_375,c_fill,f_auto/` + poster
                    $(this).attr('poster-portrait-src', poster)
                })

                $('amp-story-bookend').each(function() {
                    let bookend = JSON.parse($(this).children('script').html())
                    function newImgUrl(entry) {
                        let imgUrl = _.get(entry, 'image')
                        if (imgUrl.startsWith('http://') || imgUrl.startsWith('https://') ) {
                            return `https://res.cloudinary.com/dpc-pks-mb-ketapang/image/fetch/w_100,h_100,c_fill,f_auto/${imgUrl}`
                        } else if (imgUrl.endsWith('.mp4')) {
                            return `https://res.cloudinary.com/dpc-pks-mb-ketapang/video/upload/w_100,h_100,c_fill,f_auto${imgUrl.replace('.mp4', '.jpg')}`
                        } else {
                            return `https://res.cloudinary.com/dpc-pks-mb-ketapang/image/fetch/w_100,h_100,c_fill,f_auto/https://pksmbketapang.org${imgUrl}`
                        }
                    }
                    _.each(_.filter(bookend.components, _.matches({ 'type': 'small' })), entry => _.set(entry, 'image', newImgUrl(entry)))                    
                    $(this).children('script').html(JSON.stringify(bookend))
                })

                return $.html()
            }
            return content
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