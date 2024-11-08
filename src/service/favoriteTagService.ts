import { formatDate } from "@/lib/utils";
import { callGetRequest } from "./apiService";

interface FavoriteTagForResponse {
  id: string;
  nameFavorite: string;
  descriptionFavorite: string;
  created_at?: string;
  updated_at?: string;
}

export type FavoriteTagForCard = {
  id: string;
  name_favorite: string;
  description_favorite: string;
  created_at?: string;
  updated_at?: string;
}

export default async function getAllFavoriteTag(): Promise<Array<FavoriteTagForCard> | undefined> {
  const res = await callGetRequest(`/favorite-tag`, "get-list-favorite-tag");
  if (res.status === 200) {
    const data: Array<FavoriteTagForResponse> = res.response;
    const listFavoriteTag: Array<FavoriteTagForCard> = [];
    for (const item of data) {
      listFavoriteTag.push({
        id: item.id,
        description_favorite: item.descriptionFavorite,
        name_favorite: item.nameFavorite,
        created_at: formatDate(item.created_at, "dd/mm/yyyy"),
        updated_at: formatDate(item.updated_at, "dd/mm/yyyy")
      })
    }
    return listFavoriteTag;
  }
}