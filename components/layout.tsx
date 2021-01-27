import Head from 'next/head'
import Header from './header'
import styles from '../styles/layout.module.scss'

export default function Layout({ children }) {
    return (
        <>
        <Head>
            <title>PKS MB Ketapang | Bersama Melayani Rakyat</title>
        </Head>

        <Header />

        <main className={styles.main}>
            { children }
        </main>
        </>
    )
}