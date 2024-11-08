"use server";

import { formatDate } from "@/lib/utils";
import { callGetRequest } from "./apiService";

interface QuotesForResponse {
  id: string;
  description: string;
  thumbnailQuotes: string;
  scheduledAt: string;
  title: string;
  created_at: string;
  typeQuote: {
    id: string;
    title: string;
  };
}

export type QuotesForCard = {
  id: string;
  description: string;
  thumbnail_quotes: string;
  scheduled_at: string;
  title: string;
  created_at: string;
  type_quote: {
    id: string;
    title: string;
  };
};

export async function getQuoteCurrentDate(
  idTypeQuote: string,
): Promise<QuotesForCard | undefined> {
  try {
    const res = await callGetRequest(
      `/quotes/current?typeQuoteId=${idTypeQuote}`,
      "get-quote-current-date",
    );
    if (res.status == 200) {
      const data: QuotesForResponse = res.response;
      return {
        created_at: formatDate(data.created_at, "DD/MM/YYYY"),
        description: data.description,
        id: data.id,
        scheduled_at: formatDate(data.scheduledAt, "DD/MM/YYYY"),
        title: data.title,
        thumbnail_quotes: `${data.thumbnailQuotes ? process.env.NEXT_PUBLIC_API_BASE_URL + data.thumbnailQuotes : ""}`,
        type_quote: data.typeQuote,
      };
    }
  } catch (error) {
    console.error(error);
  }
}
