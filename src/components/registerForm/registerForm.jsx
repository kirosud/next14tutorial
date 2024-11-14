'use client'
import { register } from '@/lib/action'
import styles from './registerForm.module.css'
import { useFormState } from 'react-dom'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const RegisterForm = () => {
  const [state, formAction] = useFormState(register, undefined)
  const router = useRouter()

  useEffect(() => {
    state?.success && router.push('/login')
  }, [state?.success, router])

  return (
    <form action={formAction} className={styles.form}>
      <input type="text" placeholder="User name" name="username" />
      <input type="text" placeholder="Email" name="email" />
      <input type="password" placeholder="Password" name="password" />
      <input
        type="password"
        placeholder="Password again"
        name="passwordRepeat"
      />
      <button>Register</button>
      {state?.error}
      <Link href="/login">
        Have an account? <b>Login</b>
      </Link>
    </form>
  )
}

export default RegisterForm
