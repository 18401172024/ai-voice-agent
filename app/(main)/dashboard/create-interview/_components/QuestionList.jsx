import { Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { toast } from "sonner";
import { Button } from '@/components/ui/button';
import { useUser } from '@/app/provider';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/services/supabaseClient';
import QuestionListContainer from './QuestionListContainer';
import { Loader2 } from "lucide-react";




function QuestionList({formData,onCreateLink}) {

  const [loading,setLoading] = useState(true);
  const [questionList,setQuestionList] = useState();
  const {user} = useUser();
  const [saveLoading,setSaveLoading] = useState(false);
  useEffect(()=>{
    if(formData){
      GenerateQuestionList();
    }
  },[formData])
  const GenerateQuestionList=async()=>{
    setLoading(true);
    try{
      const result = await axios.post('/api/ai-model',{
        ...formData
      })
      console.log(result.data.content);
      const Content = result.data.content;
      const FINAL_CONTENT = Content
      .replace("```json", "")
      .replace("```", "")
      .trim();
      const parsed = JSON.parse(FINAL_CONTENT);
      setQuestionList(parsed.interviewQuestions || parsed.question || parsed);
      setLoading(false);
    }
    catch(e){
      toast('Server Error, Try Again!')
      setLoading(false);
    }
  }

  const onFinish=async()=>{
    setSaveLoading(true);
    const interview_id=uuidv4();
    const { data, error } = await supabase
      .from('Interviews')
      .insert([
        { ...formData,
          questionList:questionList,
          userEmail:user?.email,
          interview_id:interview_id
         },
      ])
      .select()
      setSaveLoading(false);
      onCreateLink(interview_id)
  }
  return (
    <div>
      {loading&&
      <div className='p-5 bg-blue-50 rounded-xl border border-primary gap-5       items-center '>
        <Loader2Icon className='animate-spin'/>
        <div>
          <h2 className='font-medium'>Generating Interview Questions</h2>
          <p className='text-primary'>Our AI is crafting personalized questions bases on your job position</p>
        </div>

        

      </div>}
      {questionList?.length>0&&
      <div>
        <QuestionListContainer questionList={questionList}/>
      </div>
      }

      <div className='flex justify-end mt-10'>
        <Button onClick={()=>onFinish()} disabled={saveLoading}>
          {saveLoading&&<Loader2 className='aanimate-spin'/>}
          Create Interview Link & Finish</Button>
      </div>
    </div>
  )
}

export default QuestionList

