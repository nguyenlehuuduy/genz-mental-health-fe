import { callGetRequest } from "./apiService";

interface TabMenuResponseType {
  id: string;
  name: string;
  iconUrl: string;
  url: string
}

export type TabMenuForCard = {
  id: string;
  name: string;
  icon_url: string;
  url: string
}

export async function getListTabMenu(): Promise<Array<TabMenuForCard> | undefined> {
  const res = await callGetRequest(`/tab-menu`);
  if (res.status === 200) {
    const data: Array<TabMenuResponseType> = res.response;
    const listTagMenuForResponse: Array<TabMenuForCard> = [];
    for (const item of data) {
      listTagMenuForResponse.push({
        icon_url: item.iconUrl,
        id: item.id,
        name: item.name,
        url: item.url
      })
    }
    return listTagMenuForResponse;
  }
}
