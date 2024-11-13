'use server'
import { revalidatePath } from 'next/cache'
import { Post } from './models'
import { connectToDb } from './utils'

export const addPost = async (formData) => {
  const { title, desc, slug, userId, img } = Object.fromEntries(formData)

  try {
    connectToDb()
    const newPost = new Post({
      title,
      desc,
      slug,
      userId,
      img,
    })
    await newPost.save()
    revalidatePath('/blog')
  } catch (error) {
    console.log(error)
  }
}

export const deletePost = async (formData) => {
  const { postId } = Object.fromEntries(formData)

  try {
    connectToDb()

    await Post.findByIdAndDelete(postId)
    revalidatePath('/blog')
  } catch (error) {
    console.log(error)
  }
}
