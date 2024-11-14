import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { connectToDb } from './utils'
import { User } from './models'
import bcrypt from 'bcryptjs'
import { authConfig } from './auth.config'

const login = async (credentials) => {
  try {
    connectToDb()
    const user = await User.findOne({ username: credentials.username })

    if (!user) {
      throw new Error('Credentials does not match')
    }

    const isPasswordValid = await bcrypt.compare(
      credentials.password,
      user.password
    )

    if (!isPasswordValid) {
      throw new Error('Password does not match')
    }
    return user
  } catch (error) {
    console.log(error)
    throw new Error('Could not login:', error)
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    GitHub,
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials)
          return user
        } catch (error) {
          return null
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider !== 'github') return true
      try {
        connectToDb()
        const user = await User.findOne({ username: profile.login })
        console.log('user is -------', user)
        if (!user) {
          const newUser = new User({
            username: profile.login,
            email: profile.email,
            avatar: profile.avatar_url,
          })

          await newUser.save()
        }
      } catch (error) {
        console.log(error)
      }
      return true
    },
  },
})
