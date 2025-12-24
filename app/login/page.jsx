"use client"
import React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { createClient } from '@supabase/supabase-js';




const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);




function Login() {
  const signInWithGoogle = async() => {
    const {error} = await supabase.auth.signInWithOAuth({
      provider:'google',
      options: {
        //redirectTo: "https://ai-voice-agent-app1.vercel.app/dashboard"
        redirectTo: "http://localhost:3001/dashboard"
      }
    })
    if(error){
      console.log('Error:',error.message)
    }
  }
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='flex flex-col items-center border rounded-2xl p-8'>
        <Image src={'/download.jpeg'} alt='logo' width={400} height = {100} 
        className='w-[180px] '/>
        <div className='flex items-center flex-col'>
          <Image src={'/login.webp'} alt='login' width={600} height={400} 
          className='w-[400px] h-[250px] rounded-2xl'/>
          <h2 className='text-2xl font-bold text-center'>Welcome to AiCruiter</h2>
          <p className='text-gray-500 text-center'>Sign in with Google Authentication</p>
          <Button type="button" className='mt-7 w-full' onClick={signInWithGoogle}>Login with Google</Button>
        </div>
      </div>
    </div>
  )
}

export default Login






