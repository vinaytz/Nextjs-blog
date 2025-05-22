import React, { useEffect, useState } from 'react';

interface EditThePostProps {
  id: number;
}

const EditThePost = ({ id }: EditThePostProps) => {
  const [post, setpost] = useState();
  const [title, settitle] = useState('');
  const [tag, settag] = useState('');
  const [description, setdescription] = useState('');
  const [postExist, setpostExist] = useState('');
  useEffect(() => {
    fetch(`api/post/${  id}`).then(res=>res.json()).then(data=>{
      settitle(data.title)
      settag(data.tag)
      setdescription(data.description)
      if(data.error){
        setpostExist('0')
      }
      else{
        setpostExist('1')
      }
    })
  }, [id])
    const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault(); // prevent page reload

  const res = await fetch("/api/post", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({id, title, tag, description }),
  });

  // const data = await res.json();
  // console.log("Post created:", data);
  // Optionally: reset fields
  settitle('');
  settag('');
  setdescription('');
};


  return (
    <>
    { postExist == "1" &&   <div>
        <h1 className='font-bold text-3xl mt-10 border-t-3 border-indigo-900 pt-10'>Edit your Post</h1>
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
    </div>}

    {postExist == "0" &&   <h1 className='font-bold text-3xl mt-10 border-t-3 border-indigo-900 pt-10'>Blog Not Found</h1>}
   
      
 </>
  );
};
export default EditThePost;