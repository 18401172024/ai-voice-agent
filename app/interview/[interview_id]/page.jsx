"use client"
import React, { useContext, useEffect, useState } from 'react'
import { Clock, Loader2Icon, Video } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/services/supabaseClient'
import { InterviewDataContext } from '@/context/InterviewDataContext'
import Image from "next/image";

function Interview() {
  const { interview_id } = useParams();
  const [interviewData, setInterviewData] = useState();
  const [userName, setUserName] = useState('');
  const [userEmail,setUserEmail] = useState();
  const [loading, setLoading] = useState(false);
  const { setInterviewInfo } = useContext(InterviewDataContext);
  const router = useRouter();

  useEffect(() => {
    interview_id && GetInterviewDetails();
  }, [interview_id]);

  const GetInterviewDetails = async () => {
    setLoading(true);
    try {
      let { data: Interviews, error } = await supabase
        .from('Interviews')
        .select("jobPosition,jobDescription,duration,type")
        
        .eq('interview_id', interview_id);
      setInterviewData(Interviews?.[0]);
      setLoading(false);
      if (!Interviews || Interviews.length === 0) {
        alert('Incorrect Interview Link');
        return;
      }
    } catch (e) {
      setLoading(false);
      alert('Incorrect Interview Link');
    }
  };

  const onJoinInterview = async () => {
    setLoading(true);
    let { data: Interviews } = await supabase
      .from('Interviews')
      .select('*')
      .eq('interview_id', interview_id);
    setInterviewInfo({
      userName: userName,
      userEmail:userEmail,
      interviewData: Interviews?.[0]
    });
    router.push('/interview/' + interview_id + '/start');
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 py-10">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8 flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <Image src={'/download.jpeg'} alt='logo' width={120} height={60} className='mb-2' />
          <h1 className="text-2xl font-bold text-gray-800">AI-Powered Interview Platform</h1>
        </div>
        <Image src={'/interview.jpeg'} alt='interview' width={320} height={180} className='rounded-lg mx-auto my-2' />
        <div className="text-center">
          <h2 className="font-semibold text-xl text-gray-700">{interviewData?.jobPosition || 'Loading...'}</h2>
          <div className="flex justify-center items-center gap-2 text-gray-500 mt-1">
            <Clock className="h-4 w-4" />
            <span>{interviewData?.duration ? `${interviewData.duration} min` : ''}</span>
          </div>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Enter your full name</label>
          <Input
            placeholder="e.g. John Smith"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
            className="w-full"
          />
          <p className="text-xs text-gray-400 mt-1">This will be used for your interview record.</p>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Enter your email</label>
          <Input
            placeholder="johnsmith@gmail.com"
            value={userEmail??""}
            onChange={(event) => setUserEmail(event.target.value)}
            className="w-full"
          />
          <p className="text-xs text-gray-400 mt-1">This will be used for your interview record.</p>
        </div>
        <div className="bg-gray-100 rounded-md p-4">
          <h3 className="font-semibold mb-2 text-gray-700">Before you begin</h3>
          <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
            <li>Ensure you have a stable internet connection.</li>
            <li>Find a quiet and well-lit place.</li>
            <li>Keep your camera and microphone ready.</li>
          </ul>
        </div>
        <Button
          className="mt-2 w-full font-bold flex items-center justify-center gap-2"
          disabled={loading || !userName}
          onClick={onJoinInterview}
        >
          <Video />
          {loading && <Loader2Icon className="animate-spin" />}
          {loading ? "Joining..." : "Join Interview"}
        </Button>
      </div>
    </div>
  );
}

export default Interview






