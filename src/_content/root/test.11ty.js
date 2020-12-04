/*
    FOR DATA TESTING PURPOSES ONLY!
*/

exports.data = {
    permalink: '/test.json',
    layout: false,
    eleventyExcludeFromCollections: true
}

exports.render = (data) => {
    const items = data.content.news_links
    return JSON.stringify(items, null, 2)
}