import PostCard from '@/components/postCard/postCard'
import styles from './blog.module.css'
// import { getPosts } from '@/lib/request'

const getPosts = async () => {
  const res = await fetch('http://localhost:3000/api/blog')

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

const BlogPage = async () => {
  const posts = await getPosts()

  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div className={styles.post} key={post._id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  )
}

export default BlogPage
