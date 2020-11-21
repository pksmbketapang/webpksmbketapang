module.exports = function(eleventyConfig) {
    //layout aliases
    eleventyConfig.addLayoutAlias('base', 'layouts/base.liquid')
    // default dirs
    return {
        dir: {
            input: 'src',
            output: 'dist'
        }
    }
}