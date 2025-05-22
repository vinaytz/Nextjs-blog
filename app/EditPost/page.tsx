'use client'
import React, { useState } from 'react'
import EditThePost from "@/app/EditPost/EditThePost"


interface theId{
    id:number
}

const EditPost = () => {
    const [getId, setgetId] = useState('')
    const validID = getId.trim() !== '' && !isNaN(Number(getId));

    return (
        <>
         <div className='m-50 ml-60 mt-15 mb-0'>
        <h1 className='font-bold text-3xl'>Edit the post</h1>
        <div className='text-gray-500 mb-8'>Enter the Post Id to Edit a post</div>

        <label htmlFor="title">BLOG ID</label><br />
            <input
            value={getId}
            onChange={(e) => setgetId(e.target.value)} 
            className='border-1 border-zinc-800 rounded p-2 pl-4 mb-3 w-100 mt-2' placeholder='Enter ID'  type='text        ' name='Id'/>
        <br />
        {validID && getId && <EditThePost id={parseInt(getId)} />}

      </div>
    </>
    )
}

export default EditPost