import Link from 'next/link'
import Image from 'next/image'
import Layout from '../components/layout'
import styles from '../styles/index.module.css'

import { getSortedPostsData } from '../data/posts'
import MenuItems from '../data/menu.json'
export async function getStaticProps() {
    const allPostsData = getSortedPostsData()
    return {
        props: {
            MenuItems,
            allPostsData
        }
    }
}

export default function index({ MenuItems, allPostsData }) {
    return (
        <Layout>
            <section className={styles.index_top_grid}>
                <div className={styles.index_hero_grid} style={{ backgroundImage:'url("https://source.unsplash.com/random/1600x900")' }}>
                    <div className={styles.index_hero_grid_title}>
                        <p className="uppercase text-sm">Subjudul</p>
                        <h1>Artikel Tersemat</h1>
                    </div>
                </div>
                <div className={styles.index_menu_grid}>
                    <Link href="/aleg">
                        <a className={[styles.index_menu_item, styles.index_menu_item_aleg].join(' ')}>
                            <Image
                                src='/supriyanto.jpg'
                                alt='H. Suprianto, SE. MM'
                                width={100}
                                height={100}
                             />
                             <div>
                                <h1>H. Suprianto, SE, MM</h1>
                                <p>
                                    Anggota Legislatif DPRD Kab. Kotim <br/>
                                    Dapil I Mentawa Baru Ketapang <br/>
                                    &amp; Ketua DPD PKS Kotawaringin Timur
                                </p>
                             </div>
                        </a>
                    </Link>
                    {MenuItems.map(({title, url}) => (url === '/news') ?
                        (
                            <Link href={url} key={(title + '_' + url).replace(' ', '_')}>
                                <a className={[styles.index_menu_item, styles.index_menu_item_slogan].join(' ')}>{title}</a>
                            </Link>
                        ) :
                        (
                            <Link href={url} key={(title + '_' + url).replace(' ', '_')}>
                                <a className={styles.index_menu_item}>{title}</a>
                            </Link>
                        )
                    )}
                </div>
            </section>
            <section>
                <h1>Kabar Berita</h1>
                <div>
                    {allPostsData.map(({ id, date, title }) => (
                        <div key={ id }>
                            <h2>{ title }</h2>
                            <p>{ date }</p>
                        </div>
                    ))}
                </div>
            </section>
        </Layout>
    )
}