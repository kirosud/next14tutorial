'use client'
import { useState } from 'react'
import styles from './links.module.css'
import NavLink from './navLink/navLink'

const links = [
  {
    title: 'HomePage',
    path: '/',
  },
  {
    title: 'About',
    path: '/about',
  },
  {
    title: 'Contact',
    path: '/contact',
  },
  {
    title: 'Blog',
    path: '/blog',
  },
]

const session = true
const isAdmin = true

const Links = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink key={link.path} item={link} />
        ))}
        {session ? (
          <>
            {isAdmin && <NavLink item={{ title: "Admin", path: "/admin" }} />}
            <button className={styles.logout}>Logout</button>
          </>
        ) : (
          <NavLink item={{ title: "Login", path: "/login" }} />
        )}
      </div>
      <button className={styles.menuButton} onClick={() => setOpen((prev) => !prev)}>Menu</button>
      {
        open && (
          <div className={styles.mobileLinks}>
            {links.map((link) => (
              <NavLink key={link.path} item={link} />
            ))}
          </div>
        )
      }
    </div>
  )
}

export default Links