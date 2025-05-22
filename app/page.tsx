"use client"
import Link from "next/link";
import { useEffect, useState } from "react";


type Blog = {
  Id: number;
  title: string;
  description: string;
  tag: string;
};


export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]); // TS knows it's array of Blog

  useEffect(() => {
    fetch("api/post")
    .then(res=>res.json())
    .then(data => {
      setBlogs(data)
      console.log(data)
      console.log('');
    })
  }, [])
  
  return (
    <>
   
   <main className="ml-10 mr-20">
    <h1 className="font-bold text-shadow-2xs text-3xl p-8 text-gray-300">All Blogs</h1>
    <section>
      {
        blogs.map((elem, index)=>(
          <Link href={`/post/${elem.Id}`} key={index}>
          <div  className="border-1 p-5 bg-zinc-950 mb-5 rounded-xl border-zinc-900 hover:bg-zinc-900 transition-colors" >
            <div className="flex gap-5 p-3 pb-0 border-b-1 border-amber-950 border-x-zinc-900 text-3xl font-bold">
              <div>{elem.Id}</div>
              <div>{elem.title}</div>
            </div>
            <div  className="mt-5 text-gray-500 font-sans font-light">{elem.description}</div>
          </div>
          </Link>
        ))
      }
    </section>
   </main>
    </>
  );
}
