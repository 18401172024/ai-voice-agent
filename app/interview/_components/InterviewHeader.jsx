// import React from 'react'
// import Image from "next/image";


// function InterviewHeader() {
//   return (
//     <div className='p-4 shadow-sm'>
//       <Image src={'/download.jpeg'} alt='logo' width={200} height={100} className='w-[140px]' />
//     </div>
//   )
// }

// export default InterviewHeader





import React from "react";
import Image from "next/image";

function InterviewHeader() {
  return (
    <header className="w-full bg-gradient-to-r from-blue-50 to-blue-100 shadow-sm py-3 px-6 rounded-b-2xl flex items-center justify-between">
      
      {/* Logo */}
      <Image 
        src="/download.jpeg" 
        alt="logo" 
        width={120} 
        height={60} 
        className="w-[90px] h-auto object-contain"
      />

      {/* Cute tagline */}
      <h3 className="text-sm font-semibold text-blue-700 tracking-wide">
        Smart • Fast • AI Interviews
      </h3>
    </header>
  );
}

export default InterviewHeader;
