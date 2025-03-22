import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const { query } = await req.json();

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [{ role: "user", content: query }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        }
      }
    );

    const answer = response.data.choices[0].message.content;
    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ answer: "Error generating response" });
  }
}
