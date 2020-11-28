const current_env = process.env.ELEVENTY_ENV
const PROD_ENV = 'prod'
const prodUrl = 'https://pksmbketapang.org'
const devUrl = 'http://localhost:8888'
const baseUrl = current_env === PROD_ENV ? prodUrl : devUrl
const isProd = current_env === PROD_ENV

module.exports = {
    current_env,
    isProd,
    title: "DPC PKS MB. Ketapang",
    description: "Berkhidmat Untuk Rakyat",
    logo: `${baseUrl}/img/logo.jpg`,
    url: baseUrl
}