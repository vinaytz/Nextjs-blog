"use client"

import React, { useEffect, useState } from 'react'

const CreatePosts = () => {
    const [title, settitle] = useState('')
    const [tag, settag] = useState('')
    const [description, setdescription] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault(); // prevent page reload

  const res = await fetch("/api/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, tag, description }),
  });

  const data = await res.json();
  console.log("Post created:", data);
  // Optionally: reset fields
  settitle('');
  settag('');
  setdescription('');
};


  return (
    <> 
    <div className='m-50 ml-60 mt-15 mb-0'>
        <h1 className='font-bold text-3xl'>Create your Post</h1>

        <form onSubmit={handleSubmit} className='flex flex-col mt-7'>
            <label htmlFor="title">Title</label>
            <input
            value={title}
            onChange={(e) => settitle(e.target.value)} 
            className='border-1 border-zinc-800 rounded p-2 pl-4 mb-7 w-100 mt-2' placeholder='Enter title'  type="text" name='title'/>
            <label htmlFor="title">Tag</label>
            <input
            value={tag}
            onChange={(e) => settag(e.target.value)} 
            className='border-1 border-zinc-800 rounded p-2 pl-4 mb-7 pt-4 mt-2' placeholder='message discription here..' name='tag'/>
            <label htmlFor="tag">Description</label>
            <textarea
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            className='border-1 border-zinc-800 rounded p-2 pl-4 mb-7 pt-4 mt-2' placeholder='message discription here..' rows={8} name='description'/>
            <button type='submit'className='bg-blue-500 p-3 rounded hover:bg-blue-600 mb-10'>SUBMIT</button>
        </form>
    </div>
        
    </>
  )
}

export default CreatePosts