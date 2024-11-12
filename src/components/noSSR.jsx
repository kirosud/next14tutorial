import dynamic from 'next/dynamic'

const NoSSR = ({ children }) => {
  return <div>{children}</div>
}

export default dynamic(() => Promise.resolve(NoSSR), { ssr: false })
