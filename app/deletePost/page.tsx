"use client"
import React, { useState } from 'react'

const DeletePost = () => {  
    const [Id, setId] = useState('')

   const deleteThePost = async (e: React.FormEvent) => {
  e.preventDefault();

  const res = await fetch("/api/post", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: Number(Id) }), // ✅ also convert to number
  });

  if (!res.ok) {
    console.error("Error deleting post");
    return;
  }

  // Check if there's content to parse
  const text = await res.text();

  if (text) {
    const data = JSON.parse(text);
    console.log("Deleted:", data);
  } else {
    console.log("Deleted successfully. No data returned.");
  }

  setId('');
};

 
  return (
    <>
         <div className='m-50 ml-60 mt-15 mb-0'>
        <h1 className='font-bold text-3xl'>Delete the post</h1>
        <div className='text-gray-500 mb-8'>Enter the Post Id to delete a post</div>
        <form  onSubmit={deleteThePost}>

        <label htmlFor="title">BLOG ID</label><br />
            <input
            value={Id}
            onChange={(e) => setId(e.target.value)} 
            className='border-1 border-zinc-800 rounded p-2 pl-4 mb-3 w-100 mt-2' placeholder='Enter ID'  type='number' name='Id'/>
        <br /><button type='submit'  className='bg-red-500 p-2 px-8 rounded hover:bg-red-600'>SUBMIT</button>
            </form>

      </div>
    </>

  )
}

export default DeletePost