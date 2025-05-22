'use client'
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'


const Navbar = () => {
  const {status, data:session} = useSession()
  const name = session?.user?.name;
  return (
     <nav className="mt-0 pt-12 p-10" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#222', borderRadius: '8px', maxWidth: 'full', gap: '3.5rem' }}>
      {name && <h1>Hello, {name}</h1>}
      <Link href="/" style={{ padding: '0.5rem 1.2rem', background: 'white', color: 'black', border: 'none', borderRadius: '20px', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s' }}>
        Home
      </Link>
      <Link href="/MyBlog" style={{ padding: '0.5rem 1.2rem', background: 'green', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s' }}>
        My Blogs
      </Link>
      <Link href="/createPost" style={{ padding: '0.5rem 1.2rem', background: '#4f8cff', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s' }}>
        Create Blog
      </Link>
    
      <Link href="/deletePost" style={{ padding: '0.5rem 1.2rem', background: '#ff4f4f', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s' }}>
        Delete Blog
      </Link>
      <Link href="/EditPost" style={{ padding: '0.5rem 1.2rem', background: '#ffb84f', color: '#222', border: 'none', borderRadius: '4px', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s' }}>
        Edit Blog
      </Link>
     
     {status == "unauthenticated" &&  <Link href="/api/auth/signin" style={{ padding: '0.5rem 1.2rem', background: 'black', color: 'white', border: 'none', borderRadius: '20px', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s' }}>
      Login
      </Link>}
     {status == "authenticated" &&  <Link href="/api/auth/signout" style={{ padding: '0.5rem 1.2rem', background: 'black', color: 'white', border: 'none', borderRadius: '20px', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s' }}>
        Logout
      </Link>}
    </nav>
  )
}

export default Navbar;