import styles from './footer.module.css'

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Lama</div>
      <div className={styles.text}>
        Lama creative agency copyright &copy; All rights reserved
      </div>
    </div>
  )
}

export default Footer