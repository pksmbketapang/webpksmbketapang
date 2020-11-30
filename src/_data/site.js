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
    description: "Bersama Melayani Rakyat",
    logo: `${baseUrl}/img/logo/logo.png`,
    logo_alt: `${baseUrl}/img/logo/logo-w.png`,
    logo_txt: `${baseUrl}/img/logo/logo-t.png`,
    logo_txt_alt: `${baseUrl}/img/logo/logo-tw.png`,
    url: baseUrl
}