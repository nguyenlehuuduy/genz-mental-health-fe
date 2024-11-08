import { getDetailMyselfAccount } from "@/service/accountService";
import SettingAccountPageView from "./setting-account-page-view";
import { notFound } from "next/navigation";
import getAllFavoriteTag from "@/service/favoriteTagService";

export default async function SettingAccountPage() {
  const profile = await getDetailMyselfAccount();
  const listFavorite = await getAllFavoriteTag();
  if (!profile) {
    notFound();
  }
  return (
    <div className="w-full">
      <SettingAccountPageView
        profile={profile}
        listFavorite={listFavorite ?? []}
      />
    </div>
  );
}
