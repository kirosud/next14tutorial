'use client'

import Image from 'next/image'
import styles from './contact.module.css'
// import HytrationTestNoSSR from "@/components/hytrationTest";
// import NoSSR from "@/components/noSSR";
// import dynamic from "next/dynamic";

// const HytrationTestNoSSR = dynamic(() => import('@/components/hytrationTest'), { ssr: false })

const ContactPage = () => {
  const a = Math.random()

  console.log(a)

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src="/contact.png"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.img}
        />
      </div>
      <div className={styles.formContainer}>
        {/* <HytrationTestNoSSR /> */}
        {/* <NoSSR>
          {a}
        </NoSSR> */}
        <form action="" className={styles.form}>
          <input type="text" placeholder="Name and Surname" />
          <input type="text" placeholder="Email Address" />
          <input type="text" placeholder="Phone Number (Optional)" />
          <textarea
            name="message"
            id=""
            cols="30"
            rows="10"
            placeholder="Message"
          ></textarea>
          <button>Send</button>
        </form>
      </div>
    </div>
  )
}

export default ContactPage
