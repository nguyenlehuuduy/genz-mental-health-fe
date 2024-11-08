import { callGetRequest } from "./apiService";

interface HotContentForResponse {
  id: string;
  title: string;
  thumbnailFileName: string;
  url: string;
}

export type HotContentForCard = {
  id: string;
  title: string;
  thumbnail_file_name: string;
  url: string;
};

export async function getListHotContent(): Promise<
  Array<HotContentForCard> | undefined
> {
  const res = await callGetRequest(`/hot-content`);
  if (res.status === 200) {
    const data: Array<HotContentForResponse> = res.response;
    const listHotContent: Array<HotContentForCard> = [];
    for (const item of data) {
      listHotContent.push({
        thumbnail_file_name: item.thumbnailFileName
          ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${item.thumbnailFileName}`
          : "",
        id: item.id,
        title: item.title,
        url: item.url,
      });
    }
    return listHotContent;
  }
}
