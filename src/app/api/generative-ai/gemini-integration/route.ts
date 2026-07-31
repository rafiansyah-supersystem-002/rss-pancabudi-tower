import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.SILVERWOOD_GEMINI_API_KEY;
    if (!apiKey) throw new Error("Missing API key");

    const genAI = new GoogleGenerativeAI(apiKey);

    const { query } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    

    const result = await model.generateContent(query);
    const text = result.response.text();

    return NextResponse.json({ text });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
