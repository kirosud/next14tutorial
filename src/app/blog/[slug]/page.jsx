import Image from 'next/image'
import styles from './singlePost.module.css'
import PostUser from '@/components/postUser/postUser'
import { Suspense } from 'react'

const SinglePostPage = async ({ params }) => {
  const post = await getPost(params.slug)

  return (
    <div className={styles.container}>
      {post.img && (
        <div className={styles.imgContainer}>
          <Image
            src={post.img}
            alt=""
            fill
            sizes="100%"
            className={styles.img}
          />
        </div>
      )}
      <div className={styles.textContainer}>
        <div className={styles.title}>{post.title}</div>
        <div className={styles.detail}>
          <Image
            className={styles.avatar}
            src="https://images.pexels.com/photos/29139391/pexels-photo-29139391.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            width={50}
            height={50}
          />
          <Suspense fallback={<p>Loading...</p>}>
            <PostUser userId={post.userId} />
          </Suspense>
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>01.01.2024</span>
          </div>
        </div>
        <div className={styles.contact}>{post.desc}</div>
      </div>
    </div>
  )
}

export default SinglePostPage
