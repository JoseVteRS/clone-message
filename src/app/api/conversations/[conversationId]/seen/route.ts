import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

interface IParams {
  conversationId: string;
}

export async function POST(req: Request, { params }: { params: IParams }) {

  try {

    const currentUser = await getCurrentUser()
    const { conversationId } = params

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!conversationId) {
      return new NextResponse('Conversation ID missing', { status: 400 })
    }

    // Find the existing conversation
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        messages: {
          include: {
            seen: true
          }
        },
        users: true
      },
    })

    if (!conversation) {
      return new NextResponse('Invalid ID', { status: 400 })
    }

    // FInd last message
    const lastMessage = conversation.messages[conversation.messages.length - 1]

    if (!lastMessage) {
      return NextResponse.json(conversation)
    }

    // Update seen of last message
    const updatedMessage = await prisma.message.update({
      where: {
        id: lastMessage.id
      },
      include: {
        seen: true
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id
          }
        }
      }
    })

    return NextResponse.json(updatedMessage)

  } catch (error) {
    console.log('ERROR_CONVERSATION_SEEN_POST', error)
    return new NextResponse('Interanl error', { status: 500 })
  }

}