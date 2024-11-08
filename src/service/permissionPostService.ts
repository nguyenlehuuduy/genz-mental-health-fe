import { callGetRequest } from "./apiService";

export interface PermissionPostForResponse {
  id: string;
  code: string;
  description: string;
}

export async function getAllPermissionPost() {
  const res = await callGetRequest(
    `/permission-post`,
    "get-valid-permission-post-cache",
  );
  if (res.status === 200) {
    const data: Array<PermissionPostForResponse> = res.response;
    return data;
  }
}
