import { AccountContent, ProfileBanner } from "../../../../../components";
import { getLoginAccount, getProfileAccount } from "@/service/accountService";
import { revalidateTag } from "next/cache";
import { unfollow } from "../../../../../components/RequestFollowers/action";
import { getPostOtherAccount } from "@/service/postService";
import { notFound, redirect } from "next/navigation";
import { getAllImagePublicByAccount } from "@/service/imageService";
import { getAllPermissionPost } from "@/service/permissionPostService";

export default async function ProfilePage({
  params,
}: {
  params: { accountId: string };
}) {
  const userInfo = await getLoginAccount();
  if (userInfo?.id === params.accountId) {
    redirect("/myself");
  }

  revalidateTag("get-account-another-profile");
  const infoAccount = await getProfileAccount(params.accountId);
  const handleUnfollow = async (idFollow: string) => {
    "use server";
    const result = await unfollow(idFollow);
    if (result) {
      revalidateTag("get-account-another-profile");
    }
  };
  const getPostsByAccount = await getPostOtherAccount(params.accountId);
  const listImagePublicOfAccount = await getAllImagePublicByAccount(
    params.accountId,
  );
  const listPermissionPost = await getAllPermissionPost();
  if (!infoAccount || !listImagePublicOfAccount) {
    notFound();
  }

  return (
    <div className="w-full">
      <ProfileBanner
        infoAccount={infoAccount}
        handleUnfollow={handleUnfollow}
      />
      <AccountContent
        listPermissionPost={listPermissionPost ?? []}
        listImagePublicOfAccount={listImagePublicOfAccount}
        profile={infoAccount}
        idAccount={params.accountId}
        listValidPostOfAccount={getPostsByAccount?.data ?? []}
      />
    </div>
  );
}
