import clsx from "clsx"
import Link from "next/link"

interface MobileItemProps {
  key: string
  href: string
  icon: any
  active?: boolean
  onClick?: () => void
}

export const MobileItem = ({
  href,
  icon: Icon,
  active,
  onClick
}: MobileItemProps) => {

  const handleOnClick = () => {
    if (onClick) {
      return onClick()
    }
  }

  return (
    <Link
      onClick={onClick}
      className={clsx(`group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 text-gray-500
      hover:text-black hover:bg-gray-100
      `,
        active && "bg-gray-100 text-black")}
      href={href}>
      <Icon className="h-6 w-6 shrink-0" />
    </Link>
  )
}
