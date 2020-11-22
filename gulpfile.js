const gulp = require('gulp')
const pipeline = require('readable-stream').pipeline

// SASS Compiler task
const sass = require('gulp-sass')
sass.compiler = require('sass')
const replace = require('gulp-replace')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const importcss = require('postcss-import-url')

const SRC = './src/_scss/main.scss'
const DEST = './src/_includes/css/'

function csscompile() {
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

// Clean output folder task
const del = require('del')
function clean(cb) {
    del(['dist', 'debug.log', 'src/_includes/css'])
    cb()
}

exports.csscompile = csscompile
exports.clean = clean