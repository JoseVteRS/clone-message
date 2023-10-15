import getCurrentUser from "@/actions/getCurrentUser"
import { NextResponse } from "next/server"

import prisma from "@/libs/prismadb"

export async function POST(req: Request) {

  try {

    const currentUser = await getCurrentUser()
    const body = await req.json()
    const { name, image } = body

    if (!currentUser) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const updatdUser = await prisma.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        name,
        image
      }
    })

    return NextResponse.json(updatdUser, { status: 200 })

  } catch (error) {
    console.log('ERROR_SETTINGS', error)
    return new NextResponse('Internal error', { status: 500 })
  }

}