import Head from 'next/head'
import Image from 'next/image'
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
                    <Image 
                        src={`https://res.cloudinary.com/dpc-pks-mb-ketapang/image/fetch/c_fit,f_auto/${postData.image}`}
                        alt={postData.title}
                        width={1024}
                        height={737}
                        className={styles.featuredImage}
                    />
                </header>
                <main className={styles.content} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    )
} 