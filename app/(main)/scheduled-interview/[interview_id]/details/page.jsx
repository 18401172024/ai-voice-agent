"use client";
import { supabase } from "@/services/supabaseClient";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useUser } from "@/app/provider";
import InterviewDetailContainer from "./_components/InterviewDetailContainer";
import CandidatList from "./_components/CandidatList";

function InterviewDetail() {
  const { interview_id } = useParams();
  const { user } = useUser();
  const [interviewDetail, setInterviewDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      GetInterviewDetail();
    }
  }, [user]);

  const GetInterviewDetail = async () => {
    try {
      setLoading(true);
      const result = await supabase
        .from("Interviews")
        .select(
          `jobPosition, jobDescription, type, questionList, duration, interview_id, created_at, interviewFeedback(userEmail, userName,feedback, created_at)`
        )
        .eq("interview_id", interview_id);
      setInterviewDetail(result?.data[0] || null);
    } catch (err) {
      console.error("Error fetching interview details:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="mt-5">Loading interview details...</div>;
  }

  if (error) {
    return <div className="mt-5 text-red-500">Error: {error}</div>;
  }

  if (!interviewDetail) {
    return <div className="mt-5">No interview found</div>;
  }

  return (
    <div className="mt-5 space-y-6">
      <h2 className="font-bold text-2xl">Interview Details</h2>
      <InterviewDetailContainer interviewDetail={interviewDetail} />
      <CandidatList 
        candidateList={interviewDetail?.["interviewFeedback"] || []} 
      />
    </div>
  );
}

export default InterviewDetail;










// "use client";
// import { supabase } from "@/services/supabaseClient";
// import { useParams } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import InterviewDetailContainer from "./_components/InterviewDetailContainer";
// import CandidatList from "./_components/CandidatList";

// function InterviewDetail() {
//   const { interview_id } = useParams();
//   const [interviewDetail, setInterviewDetail] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     GetInterviewDetail();
//   }, [interview_id]);

//   const GetInterviewDetail = async () => {
//     try {
//       setLoading(true);
//       const { data, error } = await supabase
//         .from("Interviews")
//         .select(
//           `jobPosition, jobDescription, type, questionList, duration, interview_id, created_at, interviewFeedback(userName, userEmail, feedback, created_at)`
//         )
//         .eq("interview_id", interview_id);

//       if (error) throw error;

//       console.log("Interview Detail:", data[0]);
//       console.log("Candidate List:", data[0]?.interviewFeedback);

//       setInterviewDetail(data[0] || null);
//     } catch (err) {
//       console.error("Error fetching interview details:", err);
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <div className="mt-5">Loading interview details...</div>;
//   if (error) return <div className="mt-5 text-red-500">Error: {error}</div>;
//   if (!interviewDetail) return <div className="mt-5">No interview found</div>;

//   return (
//     <div className="mt-5 space-y-6">
//       <h2 className="font-bold text-2xl">Interview Details</h2>
//       <InterviewDetailContainer interviewDetail={interviewDetail} />
//       <CandidatList candidateList={interviewDetail?.interviewFeedback || []} />
//     </div>
//   );
// }

// export default InterviewDetail;
