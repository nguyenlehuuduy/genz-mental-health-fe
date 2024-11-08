"use server";

import { ReportRequest, reportPost } from "@/service/postService";

export async function callReportPost(request: ReportRequest) {
  const res = await reportPost(request);
  return res;
}
