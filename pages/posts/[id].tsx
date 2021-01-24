import Image from 'next/image'
import Head from 'next/head'

import Layout from '../../components/layout'
import Date from '../../components/date'
import styles from '../../styles/posts.module.css'

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
                    <Image 
                        src={`https://res.cloudinary.com/dpc-pks-mb-ketapang/image/fetch/f_auto/${postData.image}`}
                        width={600}
                        height={338}
                        layout='responsive'
                        className={styles.featuredImage}
                        priority={true}
                    />
                </header>
                <main className={styles.content} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    )
} 