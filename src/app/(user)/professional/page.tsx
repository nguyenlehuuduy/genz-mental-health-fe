import { getListHotFeature } from "@/service/featureService";
import { getAllSuggestFollowAccount } from "@/service/followService";
import { getListHotContent } from "@/service/hotContentService";
import {
  HotArea,
  NavFeature,
  ProfessionalWrapper,
  RecommendFeature,
  RequestFollowerWrap,
} from "../../../../components";

export default async function ProfessionalPage() {
  const listHotFeatureContent = await getListHotFeature();
  const listHotContent = await getListHotContent();
  const suggestFollow = await getAllSuggestFollowAccount();
  return (
    <div className="w-full flex justify-between gap-2">
      <div className="flex flex-col gap-1 pb-20 w-[68%]">
        <ProfessionalWrapper />
      </div>
      <div className="w-[32%] flex gap-1 right-0">
        <div className="w-full flex flex-col gap-1 overflow-y-auto  h-[calc(100vh-60px)] sticky top-0">
          <NavFeature listHotFeatureContent={listHotFeatureContent ?? []} />
          <RecommendFeature suggestFollow={suggestFollow?.slice(0, 5) ?? []} />
          <RequestFollowerWrap />
          <HotArea listHotContent={listHotContent ?? []} />
        </div>
      </div>
    </div>
  );
}
