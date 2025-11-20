// import { FEEDBACK_PROMPT } from "@/services/Constants";
// import { OpenAI } from "openai/client.js";

// export async function POST(req){
//   const {conversation}=await req.json();
//   const FINAL_PROMPT=FEEDBACK_PROMPT.replace('{{conversation}}',JSON.stringify(conversation))
// }


// try{
//   const openai = new OpenAI({
//     baseURL: "https://openrouter.ai/api/v1",
//     apiKey: process.env.OPENROUTER_API_KEY,
//   })
//   const completion = await openai.chat.completions.create({
//     //model: "google/gemini-2.0-flash-exp:free",
//     //model: "meta-llama/llama-3.2-3b-instruct:free",
//     model: "openai/gpt-4o-mini",

    

//     messages: [
//       { role: "user", content: FINAL_PROMPT }
//     ],
//   })
//   return NextResponse.json(completion.choices[0].message)
// }
// catch(e){
//   console.log(e)
//   return NextResponse.json(e)
// }


import { FEEDBACK_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import { OpenAI } from "openai/client.js";

export async function POST(req) {
  try {
    const { conversation } = await req.json();

    const FINAL_PROMPT = FEEDBACK_PROMPT.replace(
      "{{conversation}}",
      JSON.stringify(conversation)
    );

    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini",

      messages: [
        { role: "user", content: FINAL_PROMPT }
      ],
    });

    return NextResponse.json({
      success: true,
      message: completion.choices[0].message,
    });

  } catch (e) {
    console.log("AI FEEDBACK ERROR:", e);

    return NextResponse.json({
      success: false,
      error: e.message || "Something went wrong",
    });
  }
}
