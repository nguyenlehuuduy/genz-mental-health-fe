"use client";

import { Button } from "antd";
import { Edit } from "iconsax-react";
import { ModalCreateSaveContent } from "../../../../../components";
import { useState } from "react";
import { CategorySaveForResponse } from "@/service/categorySaveService";
import ModalDeleteSaveContent from "../../../../../components/ModalDeleteConfirmSaveContent";
import ModalUpdateSaveContent from "../../../../../components/ModalUpdateSaveContent";
import { useRouter } from "next/navigation";
import Link from "next/link";

type PropsComponent = {
  listCategorySaveByAccount: Array<CategorySaveForResponse>;
};

export default function ListSaveContentPageView(props: PropsComponent) {
  const [showModalCreateContent, setShowModalCreateContent] =
    useState<boolean>(false);
  const [showModalConfirmDelete, setShowModalConfirmDelete] =
    useState<boolean>(false);

  const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
  const router = useRouter();
  const [cateSelected, setCateSelected] = useState<CategorySaveForResponse>();
  const [cateSelectedUpdate, setCateSelectedUpdate] =
    useState<CategorySaveForResponse>();
  return (
    <div className="grid grid-cols-3 gap-3">
      <ModalCreateSaveContent
        isUpdate={!!cateSelected}
        categorySave={cateSelected}
        showModal={setShowModalCreateContent}
        visible={showModalCreateContent}
      />

      <ModalDeleteSaveContent
        idCateSave={cateSelected?.id}
        showModal={setShowModalConfirmDelete}
        visible={showModalConfirmDelete}
      />
      {showModalUpdate && (
        <ModalUpdateSaveContent
          categorySave={cateSelectedUpdate}
          showModal={setShowModalUpdate}
          visible={showModalUpdate}
        />
      )}
      <div
        className="w-full text-gray-600 h-[100px] bg-white rounded-md flex flex-col items-center justify-center border-dotted border-2"
        onClick={() => setShowModalCreateContent(true)}
      >
        <p className="text-[23px]">+</p>
        <p className="hover:underline">Tạo danh sách mới</p>
      </div>

      {props.listCategorySaveByAccount.map((item, index) => (
        <div
          key={index}
          className="w-full h-fit text-gray-600  bg-white rounded-md flex flex-col items-start p-3 justify-between border-dotted border-2 "
        >
          <div className="flex gap-1 w-full">
            <Button
              onClick={() => {
                setShowModalUpdate(true);
                setCateSelectedUpdate(item);
              }}
              icon={<Edit size={14} />}
              size="small"
              className="flex items-center justify-center"
            />

            {/* <Button
              onClick={() => {
                setCateSelected(item);
                setShowModalConfirmDelete(true);
              }}
              danger
              icon={<p className="text-red-500 text-center mb-1">x</p>}
              size="small"
              className="flex items-center justify-center"
            /> */}
          </div>
          <Link
            href={`/myself/saves/${item.id}`}
            className="hover:underline font-medium"
          >
            {item.title}
          </Link>
          <p>{item.description}</p>
          <p className="mt-5">Ngày tạo: {item.created_at}</p>
        </div>
      ))}
    </div>
  );
}
