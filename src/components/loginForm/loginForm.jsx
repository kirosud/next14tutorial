'use client'
import { passwordLogin } from '@/lib/action'
import styles from './loginForm.module.css'
import { useFormState } from 'react-dom'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const LoginForm = () => {
  const [state, formAction] = useFormState(passwordLogin, undefined)
  const router = useRouter()

  useEffect(() => {
    state?.success && router.push('/')
  }, [state?.success, router])

  return (
    <form action={formAction} className={styles.form}>
      <input type="text" placeholder="User name" name="username" />
      <input type="password" placeholder="Password" name="password" />
      <button>Login</button>
      {state?.error}
      <Link href="/register">
        Don't have a account? <b>Login</b>
      </Link>
    </form>
  )
}

export default LoginForm
