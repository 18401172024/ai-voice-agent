// "use client"
// import { Input } from '@/components/ui/input'
// import { Textarea } from '@/components/ui/textarea'
// import React, { useEffect,useState } from 'react'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { InterviewType } from '@/services/Constants'
// import { Button } from '@/components/ui/button'
// import { ArrowRight } from 'lucide-react'

// function FormContainer({onHandleInputChange,GoToNext}) {
//   const [interviewType,setInterviewType] = useState([]);

//   useEffect(()=>{
//     if(interviewType){
//       onHandleInputChange('type',interviewType)
//     }
//   },[interviewType])

//   const AddInterviewType = (type)=>{
//     const data = interviewType.includes(type);
//     if(!data){
//       setInterviewType(prev => [...prev,type])
//     }else{
//       const result = interviewType.filter(item=>item!=type);
//       setInterviewType(result);
//     }
//   }
//   return (
//     <div className='p-5 bg-white rounded-xl'>
//       <div>
//         <h2 className='text-sm font-medium'>Job Position</h2>
//         <Input placeholder="e.g. Full Stack Developer" className="mt-2"
//           onChange={(event)=>onHandleInputChange('jobPosition',event.target.value)}
//         />
//       </div>
//       <div className='mt-5'>
//         <h2 className='text-sm font-medium'>Job description</h2>
//         <Textarea placeholder='Enter details job description' className='h-[200px] mt-2'
//         onChange={(event)=>onHandleInputChange('jobDescription',event.target.value)}/>
//       </div>
//       <div className='mt-5'>
//         <h2 className='text-sm font-medium'>Interview Duration</h2>
//         <Select onValueChange={(value)=>onHandleInputChange('duration',value)}>
//           <SelectTrigger className="w-full mt-2">
//             <SelectValue placeholder="Select Duration" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="5 Min">5 Min</SelectItem>
//             <SelectItem value="15 Min">15 Min</SelectItem>
//             <SelectItem value="30 Min">30 Min</SelectItem>
//             <SelectItem value="45 Min">45 Min</SelectItem>
//             <SelectItem value="60 Min">60 Min</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       <div className='mt-5'>
//         <h2 className='text-sm font-medium'>Interview Type</h2>
//         <div className='flex gap-3 flex-wrap mt-2'>
//           {InterviewType.map((type,index)=>(
//             <div key={index} className={`flex gap-2 items-center cursor-pointer p-1 px-2 border border-gray-300 rounded-2xl hover:bg-secondary ${
//   interviewType.includes(type.title) ? 'bg-blue-100 text-primary' : 'bg-white'
// }`}
//             onClick={()=>AddInterviewType(type.title)}>
//               <type.icon className='h-4 w-4'/>
//               <span>{type.title}</span>
//             </div>
//           ))}
//         </div>
        
//       </div>
//       <div className='mt-7 flex justify-end' onClick={()=>GoToNext()}>
//         <Button>Generate Question <ArrowRight/></Button>
//       </div>
      
      
//     </div>
//   )
// }

// export default FormContainer












"use client";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InterviewType } from '@/services/Constants';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

function FormContainer({ onHandleInputChange, GoToNext }) {
  const [interviewType, setInterviewType] = useState([]);

  useEffect(() => {
    if (interviewType) {
      onHandleInputChange('type', interviewType);
    }
  }, [interviewType]);

  const AddInterviewType = (type) => {
    const exists = interviewType.includes(type);
    if (!exists) {
      setInterviewType(prev => [...prev, type]);
    } else {
      setInterviewType(prev => prev.filter(i => i !== type));
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 space-y-6 transition-all">
      
      {/* Heading */}
      <div>
        <h2 className="text-xl font-semibold mb-1 text-gray-800">Create Interview Details</h2>
        <p className="text-sm text-gray-500">Fill in the required fields to generate an AI-driven interview.</p>
      </div>

      {/* Job Position */}
      <div>
        <label className="text-sm font-medium text-gray-700">Job Position</label>
        <Input
          placeholder="e.g. Full Stack Developer"
          className="mt-2 h-11"
          onChange={(e) => onHandleInputChange('jobPosition', e.target.value)}
        />
      </div>

      {/* Job Description */}
      <div>
        <label className="text-sm font-medium text-gray-700">Job Description</label>
        <Textarea
          placeholder="Enter detailed job description..."
          className="mt-2 h-40 resize-none"
          onChange={(e) => onHandleInputChange('jobDescription', e.target.value)}
        />
      </div>

      {/* Duration */}
      <div>
        <label className="text-sm font-medium text-gray-700">Interview Duration</label>
        <Select onValueChange={(value) => onHandleInputChange('duration', value)}>
          <SelectTrigger className="w-full mt-2 h-11">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5 Min">5 Minutes</SelectItem>
            <SelectItem value="15 Min">15 Minutes</SelectItem>
            <SelectItem value="30 Min">30 Minutes</SelectItem>
            <SelectItem value="45 Min">45 Minutes</SelectItem>
            <SelectItem value="60 Min">60 Minutes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Interview Type */}
      <div>
        <label className="text-sm font-medium text-gray-700">Interview Type</label>
        <div className="flex gap-3 flex-wrap mt-3">
          {InterviewType.map((type, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-xl border 
              transition-all shadow-sm hover:shadow-md text-sm 
              ${interviewType.includes(type.title)
                ? "bg-blue-100 border-blue-300 text-blue-700"
                : "bg-white border-gray-300 text-gray-700"
              }`}
              onClick={() => AddInterviewType(type.title)}
            >
              <type.icon className="h-4 w-4" />
              <span>{type.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Button */}
      <div className="flex justify-end pt-3">
        <Button
          onClick={GoToNext}
          className="gap-2 px-6 h-11 rounded-xl shadow-sm hover:shadow-md transition-all"
        >
          Generate Questions <ArrowRight className="w-4" />
        </Button>
      </div>
    </div>
  );
}

export default FormContainer;
