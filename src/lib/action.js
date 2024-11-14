'use server'
import { revalidatePath } from 'next/cache'
import { Post } from './models'
import { connectToDb } from './utils'
import { signIn, signOut } from '@/lib/auth'
import { User } from './models'
import bcrypt from 'bcryptjs'

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

export const register = async (previousState, formData) => {
  const { username, email, password, avatar, passwordRepeat } =
    Object.fromEntries(formData)

  if (password !== passwordRepeat) {
    return { error: 'Password do not match' }
  }

  try {
    connectToDb()

    const user = await User.findOne({ email })

    if (user) {
      return { error: 'Email already exists' }
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      avatar,
    })
    await newUser.save()
  } catch (error) {
    return { error: 'Something went wrong!' }
  }
}

export const handleGithubLogin = async () => {
  'use server'

  await signIn('github')
}

export const handleGithubLogout = async () => {
  'use server'

  await signOut('github')
}

export const passwordLogin = async (previousState, formData) => {
  const { username, password } = Object.fromEntries(formData)

  try {
    await signIn('credentials', {
      username,
      password,
    })
  } catch (error) {
    console.log(error)
    if (error.message.includes('Password does not match')) {
      return { error: 'Password does not match' }
    }
    throw error
  }
}
