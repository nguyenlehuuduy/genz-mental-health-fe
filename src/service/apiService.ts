import { COOKIE_ACCESS_TOKEN_KEY } from "@/lib/constants";
import { cookies } from "next/headers";

const API_PATH = process.env.API_PRIVATE_URL;
const revalidateSeconds = Number(process.env.FETCH_CACHE_SECONDS);

export interface ApiResponse {
  status: number;
  headers: Headers;
  response: any;
}

export interface ApiErrorData {
  message: string;
}

export async function callGetRequest(
  url: string,
  tag?: string,
  cache?: RequestCache,
) {
  const cookieStore = cookies();
  const sessionKey = cookieStore.get(COOKIE_ACCESS_TOKEN_KEY);
  const res = await fetch(`${API_PATH}${url}`, {
    method: "GET",
    headers: { Authorization: sessionKey ? `Bearer ${sessionKey?.value}` : "" },
    next:
      cache !== "no-store"
        ? { revalidate: revalidateSeconds, tags: ["all", tag ?? ""] }
        : undefined,
    cache: cache,
  });
  const jo = await res.json();

  return { status: res.status, headers: res.headers, response: jo };
}

export async function submitMultiForm(url: string, formData: FormData) {
  const cookieStore = cookies();
  const sessionKey = cookieStore.get(COOKIE_ACCESS_TOKEN_KEY);
  const res = await fetch(`${API_PATH}${url}`, {
    method: "POST",
    headers: { Authorization: sessionKey ? `Bearer ${sessionKey?.value}` : "" },
    body: formData,
  });
  const jo = await res.json();
  return { status: res.status, headers: res.headers, response: jo };
}

export async function callPostRequest(url: string, body: any) {
  const cookieStore = cookies();
  const sessionKey = cookieStore.get(COOKIE_ACCESS_TOKEN_KEY);
  const res = await fetch(`${API_PATH}${url}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: sessionKey ? `Bearer ${sessionKey?.value}` : ""
    },
    body: JSON.stringify(body),
  });
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    const jo = await res.json();
    return { status: res.status, headers: res.headers, response: jo };
  } else {
    return { status: res.status, headers: res.headers, response: null };
  }
}

export async function callPutRequest<Response, Request>(
  url: string,
  body: Request,
): Promise<{
  status: number;
  headers: Headers;
  response: Response;
}> {
  const cookieStore = cookies();
  const sessionKey = cookieStore.get(COOKIE_ACCESS_TOKEN_KEY);
  const res = await fetch(`${API_PATH}${url}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: sessionKey ? `Bearer ${sessionKey?.value}` : ""
    },
    body: JSON.stringify(body),
  });
  const jo = await res.json();
  return { status: res.status, headers: res.headers, response: jo };
}

export async function callDeleteRequest(url: string) {
  const cookieStore = cookies();
  const sessionKey = cookieStore.get(COOKIE_ACCESS_TOKEN_KEY);

  const res = await fetch(`${API_PATH}${url}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${sessionKey?.value}`,
    },
  });

  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    const jo = await res.json();
    return { status: res.status, headers: res.headers, response: jo };
  } else {
    return { status: res.status, headers: res.headers, response: null };
  }
}

export async function callPatchRequest(url: string, data: any) {
  const cookieStore = cookies();
  const sessionKey = cookieStore.get(COOKIE_ACCESS_TOKEN_KEY);

  const res = await fetch(`${API_PATH}${url}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionKey ? `Bearer ${sessionKey?.value}` : ""
    },
    body: JSON.stringify(data),
  });

  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    const jo = await res.json();
    return { status: res.status, headers: res.headers, response: jo };
  } else {
    return { status: res.status, headers: res.headers, response: null };
  }
}
