















import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import moment from 'moment';

function InterviewCard({ interview, viewDetail = false }) {
  const url = `/scheduled-interview/${interview?.interview_id}/details`;

  return (
    <div className="p-5 bg-white rounded-lg border shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
      
      {/* Top section: Date and Job Position */}
      <div className="mb-3">
        <p className="text-sm text-gray-500">
          {moment(interview?.created_at).format('DD MMM YYYY')}
        </p>
        <h2 className="text-lg font-bold mt-1">
          {interview?.jobPosition}
        </h2>
      </div>

      {/* Middle section: Candidates count */}
      <div className="flex items-center justify-between mt-2 mb-3">
        <p className="text-sm text-gray-500">
          Min Candidates: <span className="text-green-600 font-semibold">
            {interview?.interviewFeedback?.length || 1}
          </span>
        </p>
      </div>

      {/* Bottom section: View Detail button */}
      <div className="mt-auto">
        {viewDetail ? (
          <Link href={url}>
            <Button variant="outline" className="w-full flex justify-between items-center">
              View Detail <ArrowRight className="ml-2" />
            </Button>
          </Link>
        ) : (
          <Button variant="outline" className="w-full">
            View Detail
          </Button>
        )}
      </div>
    </div>
  );
}

export default InterviewCard;

