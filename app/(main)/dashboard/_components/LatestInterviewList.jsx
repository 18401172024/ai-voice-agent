"use client"
import { useUser } from '@/app/provider';
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supabaseClient';
import {  Video } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import InterviewCard1 from './InterviewCard1';
import { toast } from 'sonner';

function LatestInterviewList() {
  const [interviewList,setInterviewList] = useState([]);
  const {user} = useUser();

  useEffect(()=>{
    user&&GetInterviewList()
  },[user])

  const GetInterviewList = async()=>{
    let {data: Interviews,error}= await supabase
    .from('Interviews')
    .select('*')
    .eq('userEmail', user?.email ?? "unknown")
    .order('id',{ascending:false})
    .limit(6)
    console.log(Interviews);
    setInterviewList(Interviews);
  }
  

  return (
    
    <div className='my-5'>
      <h2 className='font-bold text-2xl'>Previously Created Interviews</h2>
      {interviewList?.length==0&&
      <div className='p-5 flex flex-col gap-3 items-center bg-white mt-5'>
        <Video className='h-10 w-10 text-primary'/>
        <h2>You don't have any interview created!</h2>
        <Button>Create New Interview</Button>
      </div>}
      {interviewList&&
      <div className='grid grid-cols-2 xl:grid-cols-3 gap-10 mt-10'>
        {interviewList.map((interview,index)=>(
          <InterviewCard1 interview={interview} key={index}/>
        ))}
      </div>}
    </div>
  )
}

export default LatestInterviewList
