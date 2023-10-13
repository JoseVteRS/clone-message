"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { MdOutlineGroupAdd } from "react-icons/md"
import clsx from 'clsx'
import { FullConversationType } from '@/types'
import { useConversation } from '@/hooks/useConversation'
import { ConversationBox } from './ConversationBox'

interface ConversationListProps {
  initialItems: FullConversationType[]
}

export const ConversationList = ({ initialItems }: ConversationListProps) => {
  const [items, setItems] = useState(initialItems)
  const router = useRouter()
  const { conversationId, isOpen } = useConversation()

  return (
    <aside className={clsx("fixed inset-y-0 lg:pb-0 lg:left-20 lg:block lg:w-80 overflow-y-auto border-r bordder-gray-200",
      isOpen ? 'hidden' : 'block w-ful lleft-0'
    )}>
      <div className='px-5' >
        <div className="flex justify-between mb-4 pt-4">
          <div className="text-2xl font-bold text-neutral-800 ">Messages</div>
          <div className="rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition" >
            <MdOutlineGroupAdd size={20} />
          </div>
        </div>

        {items.map((item) => (
          <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
        ))}

      </div>
    </aside>
  )
}
