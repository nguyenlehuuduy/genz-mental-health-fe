"use server";

import { generateMentalHeathQuote } from "@/service/aiService";

export async function aiMentalHeathQuote(message: string) {
  return await generateMentalHeathQuote({ contentText: message });
}
