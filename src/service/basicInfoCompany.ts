"use server";

import { formatDate } from "@/lib/utils";
import { callGetRequest } from "./apiService";

interface BasicInfoCompanyForResponse {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  typeInfoCompany: {
    id: string;
    title: string;
  };
  created_at: string;
  updated_at: string;
}

export type BasicInfoCompanyForCard = {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  type_info_company: {
    id: string;
    title: string;
  };
  created_at: string;
  updated_at: string;
};

export async function getAllBasicInfoCompany(): Promise<
  Array<BasicInfoCompanyForCard> | undefined
> {
  try {
    const res = await callGetRequest(
      `/basic-info-company`,
      "get-list-basic-info-company",
    );
    if (res.status === 200) {
      const data: Array<BasicInfoCompanyForResponse> = res.response;
      const result: Array<BasicInfoCompanyForCard> = [];
      for (const item of data) {
        result.push({
          content: item.content,
          created_at: formatDate(item.created_at, "DD/MM/YYYY"),
          id: item.id,
          thumbnail: `${process.env.NEXT_PUBLIC_API_BASE_URL}${item.thumbnail}`,
          title: item.title,
          type_info_company: item.typeInfoCompany,
          updated_at: formatDate(item.updated_at, "DD/MM/YYYY"),
        });
      }
      return result;
    }
  } catch (error) {
    console.error(error);
  }
}
