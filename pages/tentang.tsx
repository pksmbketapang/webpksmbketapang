import Head from 'next/head'
import Layout from '../components/layout'

const page = {
    title: 'Tentang PKS MB Ketapang'
}

export default function tentang() {
    return (
        <Layout>
            <Head>
                <title>{ page.title } | PKS MB Ketapang</title>
            </Head>
            <article>
                <header>
                    <h1>{ page.title }</h1>
                </header>
                <main>
                    <h1>tentang dpc pks mb ketapang</h1>
                </main>
            </article>
        </Layout>
    )
}