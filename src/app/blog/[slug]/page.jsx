import Image from 'next/image'
import styles from './singlePost.module.css'
import PostUser from '@/components/postUser/postUser'
import { Suspense } from 'react'
// import { getPost } from '@/lib/request'

const getPost = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/blog/${slug}`, {
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export const generateMetadata = async ({ params }) => {
  const { slug } = params
  const post = await getPost(slug)
  return {
    title: post.title,
    description: post.desc,
  }
}

const SinglePostPage = async ({ params }) => {
  const { slug } = params
  const post = await getPost(slug)
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
          <Suspense fallback={<p>Loading...</p>}>
            <PostUser userId={post.userId} />
          </Suspense>
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>
              {post.createdAt.toString().slice(4, 16)}
            </span>
          </div>
        </div>
        <div className={styles.contact}>{post.desc}</div>
      </div>
    </div>
  )
}

export default SinglePostPage
