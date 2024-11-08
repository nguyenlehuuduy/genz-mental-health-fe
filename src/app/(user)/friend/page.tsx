import {
  getAllRequestFollowersAccount,
  getAllSuggestFollowAccount,
  getListFollower,
  getListFollowing,
} from "@/service/followService";
import { Friends, HotArea, NavFeature } from "../../../../components";
import { getListHotFeature } from "@/service/featureService";
import { getListHotContent } from "@/service/hotContentService";
import { revalidateTag } from "next/cache";

export default async function FriendsPage() {
  const listFollowing = await getListFollowing();
  const listFollower = await getListFollower();
  const listRequestFollow = await getAllRequestFollowersAccount();
  const listSuggestFollow = await getAllSuggestFollowAccount();

  revalidateTag("get-list-followings");
  revalidateTag("get-list-followers");
  revalidateTag("get-request-follow");
  revalidateTag("get-suggest-follow");

  const listHotFeatureContent = await getListHotFeature();
  const listHotContent = await getListHotContent();

  return (
    <div className="w-full flex justify-between gap-2">
      <div className="flex flex-col gap-1 pb-20 w-[68%]">
        <Friends
          listFollowing={listFollowing ?? []}
          listFollower={listFollower ?? []}
          listRequestFollow={listRequestFollow ?? []}
          listSuggestFollow={listSuggestFollow ?? []}
        />
      </div>
      <div className="w-[32%] flex gap-1 right-0">
        <div className="w-full flex flex-col gap-1 overflow-y-auto  h-[calc(100vh-60px)] sticky top-0">
          <NavFeature listHotFeatureContent={listHotFeatureContent ?? []} />
          <HotArea listHotContent={listHotContent ?? []} />
        </div>
      </div>
    </div>
  );
}
