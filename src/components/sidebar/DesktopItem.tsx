"use client"

import clsx from "clsx"
import Link from "next/link"


interface DesktopItemProps {
  href: string
  label: string
  icon: string
  active?: boolean
  onClick?: () => void
}

export const DesktopItem = ({
  href,
  label,
  icon,
  active,
  onClick
}: DesktopItemProps) => {

  const handleOnClick = () => {
    if (onClick) {
      return onClick()
    }
  }

  return (
    <li onClick={handleOnClick} >
      <Link href={href}>
        <span>{label}</span>
      </Link>

    </li>

  )
}
