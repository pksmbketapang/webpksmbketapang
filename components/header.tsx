import Link from 'next/link'
import styles from '../styles/header.module.css'

export default function Header() {
    return (
        <header className={styles.header}>
            <nav className={styles.header_nav}>
                <Link href="/">
                    <a className={styles.header_logo}>
                        <img
                            src={require('../public/logo/pks.png?lqip&resize&size=60')}
                            alt="logo"
                            width={60}
                            height={60} 
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