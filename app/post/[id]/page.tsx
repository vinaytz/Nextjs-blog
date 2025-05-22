'use client'
import React, { useState } from 'react'

const Post = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = React.use(params) 

  const [title, settitle] = useState('')
  const [tag, settag] = useState('')
  const [description, setdescription] = useState('')
  const[nopost, setnopost] = useState('')

  React.useEffect(() => {
    fetch(`/api/post/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data.title)
        settitle(data.title);
        settag(data.tag);
        setdescription(data.description);
        if(data.error){setnopost("1")}
        else{setnopost("0")}
      })
  }, [id])

  return <>
  <div className="m-30 mt-13">
    {nopost == "0" && 
    <div>
        <h1 className='font-bold text-3xl border-l-3 p-3 border-b-1 border-b-zinc-900 border-emerald-700'>{title}</h1>
        <div className='mt-10 text-zinc-500 font-semibold'>Tags <span className='rounded border text-zinc-200 w-fit p-1 px-3 m-3 border-zinc-800'>{tag}</span></div>
        <div className='mt-10 text-zinc-400'><span className='text-4xl font-bold'>{description.charAt(0).toUpperCase()}</span>{description.slice(1)}</div>
    </div>
    }
    {nopost == "1" && <h1 className='font-bold text-3xl'>No post found wiht id {id}</h1>} 
  </div>
    
  </>
}

export default Post
