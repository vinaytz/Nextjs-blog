import authOptions from "@/app/auth/AuthOptions";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
    const post =await prisma.blog.findMany()
    return NextResponse.json(post)
}

{
// export async function POST(request:NextRequest){
//     const latestPost = await prisma.blog.findFirst({
//         select: { views: true }
//     });
//     const no_of_views = latestPost?.views ?? 0;
//     console.log(no_of_views)
//     const body = await request.json()
//     const post = await prisma.blog.create({
//         data:{
//             title: body.title,
//             description: body.description,
//             tag:body.tag,   
//             views:no_of_views+1
//         }  
//     })

//     return NextResponse.json(post)
// }

}

export async function POST(request:NextRequest){
    const session  = await getServerSession(authOptions);
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
    const session = await getServerSession(authOptions)
    if(!session)
      return NextResponse.json({}, {status:401})
    const body = await request.json();
    const deletedPost = await prisma.blog.delete({
        where: {
            Id: body.id
        }
    });
    return NextResponse.json({ success: true, deletedPost });

}


export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if(!session)
    return NextResponse.json({}, {status:401})
  
  const body = await request.json();

  const existingPost = await prisma.blog.findUnique({
    where: {
      Id: body.id,
    },
  });

  if (!existingPost) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const post = await prisma.blog.update({
    where: {
      Id: body.id,
    },
    data: {
      title: body.title,
      description: body.description,
      tag: body.tag,
    },
  });

  return NextResponse.json({ message: "Successfully updated!", post }, { status: 200 });
}

