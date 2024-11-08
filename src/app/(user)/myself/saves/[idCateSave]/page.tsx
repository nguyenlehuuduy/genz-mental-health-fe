import { getCategoryDetailSaveByAccount } from "@/service/categorySaveService";
import ListContentSavePageView from "./list-content-save-page-view";
import { getAllSaveContentByCate } from "@/service/saveContentService";
import { notFound } from "next/navigation";

type Props = {
  params: {
    idCateSave: string;
  };
};
export default async function ListContentSavePage(props: Props) {
  const listContentSaveByCate = await getAllSaveContentByCate(
    props.params.idCateSave,
  );
  const detailContentSave = await getCategoryDetailSaveByAccount(
    props.params.idCateSave,
  );

  if (!detailContentSave) {
    notFound();
  }
  return (
    <div className="w-full">
      <ListContentSavePageView
        listContentSaveByCate={listContentSaveByCate ?? []}
        detailContentSave={detailContentSave}
      />
    </div>
  );
}
