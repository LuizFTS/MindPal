'use client'
import React, { MouseEventHandler } from 'react'

interface QuantityCardProps {
  title?: string | number | null,
  children?: string,
  status?: string,
  className?: string,
  onClick?: MouseEventHandler<HTMLDivElement> | undefined
}

const QuantityCard = ({ title, children, status, className, onClick }: QuantityCardProps) => {

  const verifyStatus = () => {
    switch (status) {
      case "veryeasy":
        return "statusBorder-veryeasy"
      case "easy":
        return "statusBorder-easy"
      case "medium":
        return "statusBorder-medium"
      case "hard":
        return "statusBorder-hard"
      default:
        return "transparent"
    }
  }

  return (
    <div className={`relative flex flex-col justify-center items-center bg-zinc-700 rounded p-4 w-[200px] h-[80px] mx-2 overflow-hidden cursor-pointer ${!className ? '' : className} ${verifyStatus()}`}
      onClick={onClick}
    >
      {/* <CardPin status={status} /> */}
      <h1 className={`text-3xl`}>{typeof title !== 'number' ? '' : title}</h1>
      {children}
    </div>
  )
}

export default QuantityCard