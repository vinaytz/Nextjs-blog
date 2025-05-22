import authOptions from "@/app/auth/AuthOptions";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const post = await prisma.blog.findUnique({
    where: {
      Id: parseInt(id), // If `id` is a string in your schema. Convert to number if needed.
    },
  });

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function POST(request:NextRequest){
    const session = await getServerSession(authOptions)
    if(!session)
      return NextResponse.json({}, {status:401})

    const body = await request.json()
    const post = await prisma.blog.create({
        data:{
            title: body.title,
            description: body.description,
            tag:body.tag
        }  
    })
    return NextResponse.json(post)
}

    export async function DELETE(request: NextRequest) {
        const body = await request.json();
        const deletedPost = await prisma.blog.delete({
            where: {
                Id: body.id
            }
        });
        return NextResponse.json({ success: true, deletedPost });

    }