import Links from './links/Links'
import styles from './navbar.module.css'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link href='/'>Logo</Link>
      </div>
      <div>
        <Links />
      </div>
    </div>
  )
}

export default Navbar