"use server";

import { formatDate, objectToQueryParams } from "@/lib/utils";
import { PaginationForResponse } from "../../type";
import {
  callDeleteRequest,
  callGetRequest,
  callPatchRequest,
  callPostRequest,
  callPutRequest,
  submitMultiForm,
} from "./apiService";
import { revalidateTag } from "next/cache";
import { ImageForResponse } from "./imageService";

export interface DiaryForResponse {
  id: string;
  title: string;
  body: string;
  cateDiary: Array<{
    id: string;
    cateDiaryName: string;
  }>;
  moodDiary: {
    id: string;
    moodDiaryName: string;
    descriptionMood: string;
    iconMood: string;
  };
  created_at: string;
  updated_at: string;
}

export interface DiaryForCard {
  id: string;
  title: string;
  body: string;
  cate_diary: Array<{
    id: string;
    cate_diary_name: string;
  }>;
  mood_diary: {
    id: string;
    mood_diary_name: string;
    description_mood: string;
    icon_mood: string;
  };
  created_at: string;
  updated_at: string;
}

export type DiaryForQuery = {
  limit?: number;
  pageNo?: number;
  sortBy?: string;
  orderBy?: string;
  keyword?: string;
  createdDateFrom?: string;
  createdDateTo?: string;
  diaryId?: string;
  moodDiaryId?: string;
  cateDiaryId?: string;
};

export const getAllDiary = async (query: DiaryForQuery) => {
  try {
    const res = await callGetRequest(
      `/diary?${objectToQueryParams(query)}`,
      undefined,
      "no-store",
    );
    if (res.status === 200) {
      const data: {
        data: DiaryForResponse[];
        pagination: PaginationForResponse;
      } = res.response;
      const listDiary: DiaryForCard[] = [];

      for (const item of data.data) {
        listDiary.push({
          id: item.id,
          title: item.title,
          body: item.body,
          mood_diary: {
            icon_mood: item.moodDiary.iconMood,
            id: item.moodDiary.id,
            mood_diary_name: item.moodDiary.moodDiaryName,
            description_mood: item.moodDiary.descriptionMood,
          },
          cate_diary: item.cateDiary.map((item) => ({
            cate_diary_name: item.cateDiaryName,
            id: item.id,
          })),
          created_at: formatDate(item.created_at, "DD/MM/YYYY HH:mm"),
          updated_at: formatDate(item.updated_at, "DD/MM/YYYY HH:mm"),
        });
      }

      return {
        data: listDiary,
        pagination: data.pagination,
      };
    }
  } catch (error) {
    console.error(error);
  }
};

export const getDetailDiary = async (
  idDiary: string,
): Promise<DiaryForCard | undefined> => {
  try {
    const res = await callGetRequest(
      `/diary/${idDiary}`,
      undefined,
      "no-store",
    );
    if (res.status === 200) {
      const data: DiaryForResponse = res.response;
      return {
        created_at: formatDate(data.created_at, "DD/MM/YYYY HH:mm"),
        updated_at: formatDate(data.updated_at, "DD/MM/YYYY HH:mm"),
        id: data.id,
        title: data.title,
        body: data.body,
        mood_diary: {
          icon_mood: data.moodDiary.iconMood,
          id: data.moodDiary.id,
          mood_diary_name: data.moodDiary.moodDiaryName,
          description_mood: data.moodDiary.descriptionMood,
        },
        cate_diary: data.cateDiary.map((item) => ({
          cate_diary_name: item.cateDiaryName,
          id: item.id,
        })),
      };
    }
  } catch (error) {
    console.error(error);
  }
};

interface CateDiaryForResponse {
  id: string;
  cateDiaryName: string;
  accounts: {
    id: string;
    fullName: string;
    avata: null;
  };
  countDiary: number;
  totalAllDiary?: number;
  thumbnail: string;
  created_at: string;
  updated_at: string;
}

export interface CateDiaryForCard {
  id: string;
  cate_diary_name: string;
  accounts: {
    id: string;
    full_name: string;
    avata: null;
  };
  count_diary: number;
  total_all_diary?: number;
  thumbnail: string;
  created_at: string;
  updated_at: string;
}

export type DiaryCateForQuery = {
  limit?: number;
  pageNo?: number;
  sortBy?: string;
  orderBy?: string;
  keyword?: string;
  createdDateFrom?: string;
  createdDateTo?: string;
};

export const getAllCateDiary = async (query: DiaryCateForQuery) => {
  try {
    const res = await callGetRequest(
      `/category-diary?${objectToQueryParams(query)}`,
      "get-list-category-diary",
    );
    if (res.status === 200) {
      const data: {
        data: CateDiaryForResponse[];
        pagination: PaginationForResponse;
      } = res.response;
      const listCateDiary: CateDiaryForCard[] = [];

      for (const item of data.data) {
        listCateDiary.push({
          id: item.id,
          cate_diary_name: item.cateDiaryName,
          accounts: {
            id: item.accounts.id,
            full_name: item.accounts.fullName,
            avata:
              item.accounts.avata &&
              process.env.NEXT_PUBLIC_API_BASE_URL + item.accounts.avata,
          },
          count_diary: item.countDiary,
          total_all_diary: item.totalAllDiary,
          thumbnail: item.thumbnail,
          created_at: formatDate(item.created_at, "DD/MM/YYYY HH:mm"),
          updated_at: formatDate(item.updated_at, "DD/MM/YYYY HH:mm"),
        });
      }

      return {
        data: listCateDiary,
        pagination: data.pagination,
      };
    }
  } catch (error) {
    console.error(error);
  }
};

export interface CategoryDiaryForCreate {
  cateDiaryName: string;
  thumbnail: string;
}

export async function postCategoryDiary(body: CategoryDiaryForCreate) {
  try {
    const res = await callPostRequest("/category-diary", body);
    if (res.status === 201) {
      return true;
    }
  } catch (error) {
    console.error(error);
  }
}

export interface DiaryForCreateAndUpdate {
  title: string;
  body?: string;
  moodDiaryId?: string;
  cateDiaryId?: string;
}

export async function postDiary(
  body: DiaryForCreateAndUpdate,
): Promise<string | undefined> {
  try {
    const res = await callPostRequest("/diary", body);
    if (res.status === 201) {
      return res.response.id ?? "";
    }
  } catch (error) {
    console.error(error);
  }
}

export interface DiaryForUpdate {
  title: string;
  body: string;
  moodDiaryId: string;
}

export async function updateDiary(body: DiaryForUpdate, idDiary: string) {
  try {
    const res = await callPatchRequest(`/diary/${idDiary}`, body);
    if (res.status === 200) {
      return res.response;
    }
  } catch (error) {
    console.error(error);
  }
}

export interface PromtDiaryForResponse {
  id: string;
  contentPrompt: string;
  schedulePromptFrom: string;
  schedulePromptTo: string;
  created_at: string;
  updated_at: string;
}

export interface PromtDiaryForCard {
  id: string;
  content_prompt: string;
  schedule_prompt_from: string;
  schedule_prompt_to: string;
  created_at: string;
  updated_at: string;
}

export async function getPromtDiary() {
  try {
    const res = await callGetRequest(`/prompt-diary`);

    if (res.status === 200) {
      const data: {
        data: PromtDiaryForResponse[];
        pagination: PaginationForResponse;
      } = res.response;
      const listPromt: PromtDiaryForCard[] = [];
      for (const item of data.data) {
        listPromt.push({
          id: item.id,
          content_prompt: item.contentPrompt,
          schedule_prompt_from: item.schedulePromptFrom,
          schedule_prompt_to: item.schedulePromptTo,
          created_at: formatDate(item.created_at, "DD/MM/YYYY HH:mm"),
          updated_at: formatDate(item.updated_at, "DD/MM/YYYY HH:mm"),
        });
      }

      return {
        data: listPromt,
        pagination: data.pagination,
      };
    }
  } catch (error) {
    console.error(error);
  }
}

export async function deleteDiary(idDiary: string) {
  try {
    const res = await callDeleteRequest(`/diary/${idDiary}`);
    if (res.status === 200) {
      return true;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function addDiaryIntoCateDiary(
  idDiary: string,
  idCateDiary: Array<string>,
) {
  try {
    const res = await callPutRequest(`/diary/update-cate-diary/${idDiary}`, {
      cateDiaryId: idCateDiary,
    });
    if (res.status === 200) {
      revalidateTag("get-list-category-diary");
      return true;
    }
  } catch (error) {
    console.error(error);
  }
}

export interface ImageDiaryForUpload {
  image: Array<File>;
  idDiary?: string;
}

export async function uploadImagesDiary(body: ImageDiaryForUpload) {
  try {
    for (const item of body.image) {
      const formData = new FormData();
      formData.append("image", item);
      await submitMultiForm(
        `/file/upload-image-diary/${body.idDiary || "all"}`,
        formData,
      );
    }
    return true;
  } catch (error) {
    console.error(error);
  }
}
interface ImageDiaryForResponse {
  id: string;
  path: string;
  idDiary: string;
  accountId: string;
}

export type ImageDiaryForCard = {
  id: string;
  path: string;
  id_diary: string;
  account_id: string;
};

interface QueryForImageDiary {
  keyword: string;
}

export async function getAllImageDiaryByAccount(
  query: QueryForImageDiary,
): Promise<Array<ImageDiaryForCard> | undefined> {
  try {
    const res = await callGetRequest(
      `/diary/my-image?${objectToQueryParams(query)}`,
      "get-list-image-diary",
    );
    if (res.status === 200) {
      const data: Array<ImageDiaryForResponse> = res.response;
      const result: Array<ImageDiaryForCard> = [];
      for (const item of data) {
        result.push({
          account_id: item.accountId,
          id: item.id,
          id_diary: item.idDiary,
          path: process.env.NEXT_PUBLIC_API_BASE_URL + item.path,
        });
      }
      return result;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getDetailCateDiary(
  cateId: string,
): Promise<CateDiaryForCard | undefined> {
  try {
    const res = await callGetRequest(
      `/category-diary/${cateId}`,
      undefined,
      "no-store",
    );
    if (res.status === 200) {
      const item: CateDiaryForResponse = res.response;
      return {
        id: item.id,
        cate_diary_name: item.cateDiaryName,
        accounts: {
          id: item.accounts.id,
          full_name: item.accounts.fullName,
          avata:
            item.accounts.avata &&
            process.env.NEXT_PUBLIC_API_BASE_URL + item.accounts.avata,
        },
        count_diary: item.countDiary,
        thumbnail: item.thumbnail,
        created_at: formatDate(item.created_at, "DD/MM/YYYY HH:mm"),
        updated_at: formatDate(item.updated_at, "DD/MM/YYYY HH:mm"),
      };
    }
  } catch (error) {
    console.error(error);
  }
}

export interface CateDiaryForUpdate {
  cateDiaryName: string;
  thumbnail: string;
}

export async function updateCateDiary(
  body: CateDiaryForUpdate,
  idCateDiary: string,
) {
  try {
    const res = await callPatchRequest(`/category-diary/${idCateDiary}`, body);
    if (res.status === 200) {
      return res.response;
    }
  } catch (error) {
    console.error(error);
  }
}
