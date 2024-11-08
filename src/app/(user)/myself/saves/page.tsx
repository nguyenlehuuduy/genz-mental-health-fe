import { getCategorySaveByAccount } from "@/service/categorySaveService";
import ListSaveContentPageView from "./list-save-content-page-view";

export default async function MySavesPost() {
  const listCategorySaveByAccount = await getCategorySaveByAccount();
  return (
    <div className="w-full p-2">
      <ListSaveContentPageView
        listCategorySaveByAccount={listCategorySaveByAccount ?? []}
      />
    </div>
  );
}
