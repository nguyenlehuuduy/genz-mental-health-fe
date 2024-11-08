import { callGetRequest } from "./apiService";

interface SuperAccountResponse {
  id: string;
  fullName: string;
  position: string;
  age: string;
  avata: string;
  quote: string;
  linkAddress1: string;
  linkAddress2: string;
  linkAddress3: string;
  linkAddress4: string;
  linkAddress5: string;
  created_at: string;
  updated_at: string;
}

export type SuperAccountForCard = {
  id: string;
  fullName: string;
  position: string;
  age: string;
  avata: string;
  quote: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
  website: string;
  created_at: string;
  updated_at: string;
};

export async function getListSuperAccount(): Promise<Array<SuperAccountForCard>> {
  try {
    const res = await callGetRequest(`/super-account-info`);
    const data: Array<SuperAccountResponse> = res.response;
    const listAccountResponse: Array<SuperAccountForCard> = [];
    for (const item of data) {
      listAccountResponse.push({
        id: item.id,
        age: item.age,
        fullName: item.fullName,
        avata: item.avata,
        position: item.position,
        quote: item.quote,
        created_at: item.created_at,
        updated_at: item.updated_at,
        facebook: item.linkAddress1,
        instagram: item.linkAddress2,
        linkedin: item.linkAddress3,
        twitter: item.linkAddress4,
        website: item.linkAddress5,
      });
    }
    return listAccountResponse;
  } catch (error) {
    return [];
  }
}
