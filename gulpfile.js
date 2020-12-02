const gulp = require('gulp')
const pipeline = require('readable-stream').pipeline

// SASS Compiler task
const sass = require('gulp-sass')
sass.compiler = require('sass')
const replace = require('gulp-replace')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const importcss = require('postcss-import-url')

function csscompile() {
    const SRC = './src/_scss/main.scss'
    const DEST = './src/_includes/css/'

    const processors = [
        autoprefixer,
        importcss
    ]

    return pipeline(
        gulp.src(SRC),
        sass(),
        postcss(processors),
        replace('!important', ''),
        gulp.dest(DEST)
    )
}

// Service Worker build task
const workbox = require('workbox-build')

function buildsw(cb) {
    workbox.injectManifest({
        swSrc: './src/_sw/sw_src.js',
        swDest: './dist/sw.js',
        globDirectory: 'dist',
        globPatterns: [
            '**/logo.png',
            '**/logo-w.png',
            '**/logo-t.png',
            '**/logo-tw.png',
            '**/supriyanto.png',
            '**/rudini.png',
            '**/samsudin.png',
            '404.html',
            'offline.html',
            'manifest.json',
            'browserconfig.xml',
            'favicon*.*',
            'android-chrome-*.png',
            'apple-touch-icon.png',
            'mstile-*.png',
            'safari-pinned-tab.svg'
        ]
    }).then(({count, size}) => {
        console.log(`Service Worker telah ditulis dan akan melakukan precaching untuk ${count} file sebesar ${size} byte.`)
    })
    cb()
}

// Clean output folder task
const del = require('del')

function clean(cb) {
    del(['dist', 'debug.log', 'src/_includes/css'])
    cb()
}

exports.csscompile = csscompile
exports.clean = clean
exports.buildsw = buildsw