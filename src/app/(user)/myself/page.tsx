import { getAllPermissionPost } from "@/service/permissionPostService";
import { getPostMyProfile } from "@/service/postService";
import { PostByAccount } from "../../../../components";

export default async function MyPostPage() {
  const listValidPostOfAccount = await getPostMyProfile();
  const listPermissionPost = await getAllPermissionPost();

  return (
    <PostByAccount
      listPermissionPost={listPermissionPost ?? []}
      listValidPost={listValidPostOfAccount?.data ?? []}
    />
  );
}
