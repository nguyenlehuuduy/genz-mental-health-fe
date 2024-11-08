"use server";

import { formatDate } from "@/lib/utils";
import {
  callDeleteRequest,
  callGetRequest,
  callPatchRequest,
  callPostRequest,
} from "./apiService";

export interface CategorySaveForCreate {
  title: string;
  description?: string;
}

export type CategorySaveForResponse = {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  count?: string;
};

export async function createCategorySave(cate: CategorySaveForCreate) {
  try {
    const result = await callPostRequest("/category-save", cate);
    if (result.status === 201) {
      const data: CategorySaveForResponse = result.response;
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getCategorySaveByAccount(): Promise<
  Array<CategorySaveForResponse> | undefined
> {
  try {
    const result = await callGetRequest(
      "/category-save",
      "get-list-category-save",
    );
    if (result.status === 200) {
      const data: Array<CategorySaveForResponse> = result.response;
      return data.map((item) => ({
        ...item,
        created_at: formatDate(item.created_at, "DD/MM/YYYY"),
      }));
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getCategoryDetailSaveByAccount(
  id: string,
): Promise<CategorySaveForResponse | undefined> {
  try {
    const result = await callGetRequest(`/category-save/${id}`, "", "no-store");
    if (result.status === 200) {
      const data: CategorySaveForResponse = result.response;
      return {
        ...data,
        created_at: formatDate(data.created_at, "DD/MM/YYYY"),
      };
    }
  } catch (error) {
    console.error(error);
  }
}

export async function deleteCategorySaveByAccount(
  idCategory: string,
): Promise<boolean | undefined> {
  try {
    const result = await callDeleteRequest(`/category-save/${idCategory}`);
    if (result.status === 200) {
      return true;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function updateCategorySaveByAccount(
  cate: CategorySaveForCreate,
  idCategory: string,
): Promise<boolean | undefined> {
  try {
    const result = await callPatchRequest(`/category-save/${idCategory}`, cate);
    if (result.status === 200) {
      return true;
    }
  } catch (error) {
    console.error(error);
  }
}
