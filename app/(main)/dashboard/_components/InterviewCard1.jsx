import { Button } from '@/components/ui/button';
import { ArrowRight, Copy, Send } from 'lucide-react';
import moment from 'moment/moment';
import React from 'react';
import Link from 'next/link';
import { toast } from 'sonner';

function InterviewCard1({ interview, viewDetail = false }) {

  const url = process.env.NEXT_PUBLIC_HOST_URL + '/' + interview?.interview_id;

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast('Copied');
  };

  const onSend = () => {
    window.location.href = `mailto:accounts@tubeguruji.com?subject=AICruiter Interview Link&body=Interview Link: ${url}`;
  };

  return (
    <div className="p-5 bg-white rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 w-[300px]">

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow">
          {interview?.jobPosition?.charAt(0)?.toUpperCase()}
        </div>

        <div>
          <h2 className="font-semibold text-lg capitalize">{interview?.jobPosition}</h2>
          <p className="text-gray-500 text-sm">
            {moment(interview?.created_at).format('DD MMM YYYY')}
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="mt-4 text-sm text-gray-600 flex justify-between">
        <p>Duration: <span className="font-medium">{interview?.duration}</span></p>
        <p>
          <span className="text-green-600 font-semibold">
            {interview['interviewFeedback']?.length || 1}
          </span>{" "}
          Candidates
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-5 grid grid-cols-2 gap-3">

        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 py-2 text-sm"
          onClick={copyLink}
        >
          <Copy className="h-4 w-4" /> Copy
        </Button>

        <Button
          className="w-full flex items-center justify-center gap-2 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm"
          onClick={onSend}
        >
          <Send className="h-4 w-4" /> Send
        </Button>

      </div>

    </div>
  );
}

export default InterviewCard1;