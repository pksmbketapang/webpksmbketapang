import Layout from '../../components/layout'

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

export default function id({ postData }) {
    return (
        <Layout>
            <p>{ postData.title }</p>
            <p>{ postData.date }</p>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </Layout>
    )
} 