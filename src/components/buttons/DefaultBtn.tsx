import { ReactNode } from 'react'

const DefaultBtn = ({ children, className }: { children: ReactNode, className?: string }) => {
  return (
    <button className={`default-btn ${className}`}>{children}</button>
  )
}

export default DefaultBtn