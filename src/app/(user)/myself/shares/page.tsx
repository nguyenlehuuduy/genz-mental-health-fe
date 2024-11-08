import { getAllPermissionPost } from "@/service/permissionPostService";
import { PostByAccount } from "../../../../../components";
import { getSharePostMySelf } from "@/service/postService";

export default async function MySharePost() {
  const listPostShare = await getSharePostMySelf();
  const listPermissionPost = await getAllPermissionPost();

  return (
    <PostByAccount
      listPermissionPost={listPermissionPost ?? []}
      listValidPost={listPostShare?.data ?? []}
    />
  );
}
