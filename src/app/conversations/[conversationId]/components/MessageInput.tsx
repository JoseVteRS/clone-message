import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

interface MessageInputProps {
  id: string
  required: boolean
  type?: string
  errors?: any
  register: UseFormRegister<FieldValues>,
  placeholder?: string
}

export const MessageInput = ({
  id,
  register,
  type,
  errors,
  required,
  placeholder,
}: MessageInputProps) => {
  return (
    <div className='relative w-full'>
      <input type={type} id={id} autoComplete={id} {...register(id, { required })} placeholder={placeholder}
        className='text-black font-light py-2 px-4 bg-neutral-100 rounded-full w-full focus:outline-none'
      />
    </div>
  )
}
