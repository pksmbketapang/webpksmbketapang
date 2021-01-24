import Head from 'next/head'
import Layout from '../components/layout'
import styles from '../styles/news.module.css'

const page = {
    title: 'Bersama Melayani Rakyat'
}

import { getSortedPostsData } from '../data/posts'

export default function news() {
    return (
        <Layout>
            <Head>
                <title>{ page.title } | PKS MB Ketapang</title>
            </Head>
            <article>
                <header className={styles.header}>
                    <h1 className={styles.header_title}>{ page.title }</h1>
                </header>
                <main>

                </main>
            </article>
        </Layout>
    )
}