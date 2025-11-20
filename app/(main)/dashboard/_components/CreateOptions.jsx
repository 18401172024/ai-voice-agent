// import { Phone, Video } from 'lucide-react'
// import React from 'react'
// import Link from 'next/link'

// function CreateOptions() {
//   return (
//     <div className='grid grid-cols-2 gap-5'>
//       <Link href={'/dashboard/create-interview'} className='bg-whiteborder border-gray-200 rounded-lg p-5 cursor-pointer'>
//         <Video className='p-3 text-primary bg-blue-50 rounded-lg h-12 w-12'/>
//         <h2 className='font-bold'>Create New Interview</h2>
//         <p className='text-gray-500'>Create AI Interviews and schedule them with Candidates</p>
//       </Link>
//       <div className='bg-whiteborder border-gray-200 rounded-lg p-5'>
//         <Phone className='p-3 text-primary bg-blue-50 rounded-lg h-12 w-12'/>
//         <h2 className='font-bold'>Create Phone Screening Call</h2>
//         <p className='text-gray-500'>Schedule phone screening call with Candidates</p>
//       </div>
      
//     </div>
//   )
// }

// export default CreateOptions






import { Phone, Video } from "lucide-react";
import React from "react";
import Link from "next/link";

function CreateOptions() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6">

      {/* INTERVIEW CARD */}
      <Link
        href={"/dashboard/create-interview"}
        className="group relative rounded-3xl border border-gray-200 
        bg-white p-7 shadow-sm hover:shadow-xl transition-all 
        duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden"
      >
        {/* Soft gradient glow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
        bg-gradient-to-br from-blue-50 to-transparent transition-all duration-500 rounded-3xl" />

        <div className="flex items-start gap-5 relative z-10">
          
          {/* Icon Box */}
          <div className="h-16 w-16 rounded-2xl flex items-center justify-center
          bg-gradient-to-br from-blue-100 to-blue-50 shadow-inner">
            <Video className="text-primary h-8 w-8" />
          </div>

          {/* Text */}
          <div>
            <h2 className="font-semibold text-xl">Create Interview</h2>
            <p className="text-gray-500 text-sm mt-1 leading-relaxed">
              Generate AI-powered interviews and share smart links with candidates.
            </p>
          </div>
        </div>
      </Link>

      {/* PHONE CALL CARD */}
      <div
        className="group relative rounded-3xl border border-gray-200 
        bg-white p-7 shadow-sm hover:shadow-xl transition-all 
        duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden"
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
        bg-gradient-to-br from-blue-50 to-transparent transition-all duration-500 rounded-3xl" />

        <div className="flex items-start gap-5 relative z-10">
          <div className="h-16 w-16 rounded-2xl flex items-center justify-center
          bg-gradient-to-br from-blue-100 to-blue-50 shadow-inner">
            <Phone className="text-primary h-8 w-8" />
          </div>

          <div>
            <h2 className="font-semibold text-xl">Phone Screening</h2>
            <p className="text-gray-500 text-sm mt-1 leading-relaxed">
              Schedule quick phone screening calls with job applicants.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default CreateOptions;

