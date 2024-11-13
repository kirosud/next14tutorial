import { Post, User } from './models'
import { connectToDb } from './utils'
import { unstable_noStore as noStore } from 'next/cache'

export const getPosts = async () => {
  try {
    connectToDb()
    const posts = Post.find()
    return posts
  } catch (error) {
    console.log(error)
    throw new Error('Could not fetch posts:', error)
  }
}

export const getPost = async (slug) => {
  try {
    connectToDb()
    const post = Post.findOne({ slug })
    return post
  } catch (error) {
    console.log(error)
    throw new Error('Could not fetch post:', error)
  }
}

export const getUsers = async () => {
  try {
    connectToDb()
    const users = User.find()
    return users
  } catch (error) {
    console.log(error)
    throw new Error('Could not fetch users:', error)
  }
}

export const getUser = async (id) => {
  noStore()
  try {
    connectToDb()
    const user = User.findById(id)
    return user
  } catch (error) {
    console.log(error)
    throw new Error('Could not fetch user:', error)
  }
}
