import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/header.module.css'

export default function Header() {
    return (
        <header className={styles.header}>
            <nav>
                <Link href="/">
                    <a className={styles.header_logo}>
                        <Image
                            src="/logo/pks.png"
                            alt="logo"
                            width={75}
                            height={75} 
                        />
                        <div className={styles.header_logo_title}>
                            <h1>PKS</h1>
                            <p>MB. Ketapang</p>
                        </div>
                    </a>
                </Link>
            </nav>
        </header>
    )
}