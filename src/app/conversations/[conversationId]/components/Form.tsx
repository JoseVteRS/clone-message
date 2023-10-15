"use client"

import { useConversation } from "@/hooks/useConversation"
import axios from "axios"
import {
  FieldValues,
  useForm
} from "react-hook-form"
import { HiPhoto, HiPaperAirplane } from "react-icons/hi2"
import { MessageInput } from "./MessageInput"
import { CldUploadButton } from "next-cloudinary"


export const Form = () => {

  const { conversationId } = useConversation()

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      message: ''
    }
  })

  const onSubmit = (data: FieldValues) => {
    setValue('message', '', { shouldValidate: true })
    axios.post('/api/messages', { ...data, conversationId })
  }


  const handleUpload = (result: any) => {
    axios.post('/api/messages', {
      image: result?.info?.secure_url,
      conversationId
    })
  }

  return (
    <div
      className="p-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full"
    >
      <CldUploadButton
        options={{ maxFiles: 1, resourceType: 'image' }}
        onUpload={handleUpload}
        uploadPreset="tzoaybuy"
      >
        <HiPhoto size={30} className="text-sky-500" />

      </CldUploadButton >


      <form onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-23 lg:gap-4 w-full"
      >

        <MessageInput
          id="message"
          type="text"
          register={register}
          errors={errors}
          required
          placeholder="Write a message here"
        />

        <button type="submit" className="rounded-full p-2 cursor-pointer bg-sky-500 hover:bg-sky-600 transition">
          <HiPaperAirplane size={18} className="text-white" />
        </button>

      </form>

    </div >
  )
}
