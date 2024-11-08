import { callPostRequest } from "./apiService";

export type MessageSorrowForGet = {
  arrayQuote: Array<string>;
  mentalHeathQuote: string;
};

export async function generateMentalHeathQuote(body: {
  contentText: string;
}): Promise<MessageSorrowForGet | undefined> {
  try {
    const res = await callPostRequest(`/chat-bot/generate-quote`, body);
    if (res.status === 201) {
      return res?.response;
    }
  } catch (error) {
    console.error(error);
  }
}
