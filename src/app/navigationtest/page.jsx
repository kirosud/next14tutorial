'use client'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const NavigationTestPage = () => {
  // Client side navigation test
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const q = searchParams.get('q')

  console.log(pathname)
  console.log(q)
  const handleClick = () => {
    console.log('Clicked')
    router.back()
  }

  return (
    <div>
      <Link href="/" prefetch={false}>
        Click here
      </Link>
      <button onClick={handleClick}>Write and redirect</button>
    </div>
  )
}

export default NavigationTestPage
