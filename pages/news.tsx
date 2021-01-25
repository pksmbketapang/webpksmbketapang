import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import Date from '../components/date'
import styles from '../styles/news.module.css'

const page = {
    title: 'Bersama Melayani Rakyat'
}

import { getSortedPostsData } from '../data/posts'
export async function getStaticProps() {
    const allPostsData = getSortedPostsData()
    return {
        props: {
            allPostsData
        }
    }
}

export default function news({ allPostsData }) {
    return (
        <Layout>
            <Head>
                <title>{ page.title } | PKS MB Ketapang</title>
            </Head>
            <article>
                <header className={styles.header}>
                    <h1 className={styles.header_title}>{ page.title }</h1>
                </header>
                <main className={styles.main}>
                    {allPostsData.map(({ id, title, description, date, image }) => (
                        <Link href={`/posts/${ id }`} key={ id }>
                            <a className={styles.main_items} style={{backgroundImage: `url(https://res.cloudinary.com/dpc-pks-mb-ketapang/image/fetch/w_300,h_200,b_black,o_50,c_fill,f_auto/${ image })`}}>
                                <h3 title={ description }>{ description }</h3>
                                <h2><span>{ title }</span></h2>
                                <p><Date dateString={ date } /></p>
                            </a>
                        </Link>
                    ))}
                </main>
            </article>
        </Layout>
    )
}