import { callGetRequest } from "./apiService";

interface FeatureForResponse {
  id: string;
  name: string;
  thumbnailFileName: string;
  url: string;
}

export type FeatureForCard = {
  id: string;
  name: string;
  thumbnail_file_name: string;
  url: string;
};

export async function getListHotFeature(): Promise<
  Array<FeatureForCard> | undefined
> {
  const res = await callGetRequest(`/feature`);
  if (res.status === 200) {
    const data: Array<FeatureForResponse> = res.response;
    const listFeature: Array<FeatureForCard> = [];
    for (const item of data) {
      listFeature.push({
        thumbnail_file_name: item.thumbnailFileName
          ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${item.thumbnailFileName}`
          : "",
        id: item.id,
        name: item.name,
        url: item.url,
      });
    }
    return listFeature;
  }
}
