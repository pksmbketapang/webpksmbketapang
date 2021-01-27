import Head from 'next/head'

import Layout from '../../components/layout'
import Date from '../../components/date'
import styles from '../../styles/posts.module.scss'

import { getAllPostsIds, getPostsData } from '../../data/posts'

export async function getStaticPaths() {
    const paths = getAllPostsIds()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const postData = await getPostsData(params.id)
    return {
        props: {
            postData
        }
    }
}

export default function Posts({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{ postData.title } | PKS MB Ketapang</title>
            </Head>
            <article>
                <header className={styles.header}>
                    <p className={styles.description}>{ postData.description }</p>
                    <h1 className={styles.title}>
                        <span>{ postData.title }</span>
                    </h1>
                    <p className={styles.date}>
                        <Date dateString={ postData.date } />
                    </p>
                    <img 
                        src={`https://res.cloudinary.com/dpc-pks-mb-ketapang/image/fetch/w_1024,h_737,c_fit,f_auto/${postData.image}`}
                        width={1280}
                        height={920}
                        className={styles.featuredImage}
                    />
                </header>
                <main className={styles.content} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    )
} 