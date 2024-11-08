import {
  addDiaryIntoCateDiary,
  CateDiaryForCard,
  DiaryForCard,
} from "@/service/diaryService";
import { Modal, Select } from "antd";
import DOMPurify from "dompurify";
import { CalendarTick, Save2 } from "iconsax-react";
import Image from "next/image";
import React, { Fragment, useState } from "react";
type Conditions = {
  pageNo?: string;
  limit?: string;
  keyword?: string;
  sortBy?: string;
  orderBy?: string;
  mode?: "start" | "editor";
  diaryId?: string;
};

type PropsComponent = {
  item: DiaryForCard;
  updatePath: (condition: Conditions) => void;
  conditions: Conditions;
  onHandleDeleteDiary: (idDiary: string) => Promise<void>;
  diaryIdSearchParam: string;
  smallModeListDiary?: boolean;
  listCateDiary: CateDiaryForCard[];
};

const addIntoCate = async (idDiary: string, idCateDiary: Array<string>) => {
  try {
    return await addDiaryIntoCateDiary(idDiary, idCateDiary);
  } catch (error) {
    console.error(error);
  }
};

const DiaryItem = ({
  item,
  updatePath,
  conditions,
  onHandleDeleteDiary,
  diaryIdSearchParam,
  smallModeListDiary,
  listCateDiary,
}: PropsComponent) => {
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalSaveOpen, setIsModalSaveOpen] = useState(false);
  const [selectedCateDiary, setSelectedCateDiary] = useState<Array<string>>(
    item.cate_diary.map((item) => item.id) ?? [],
  );
  const showModal = () => {
    setIsModalDeleteOpen(true);
  };

  const handleOkDeleteModal = () => {
    onHandleDeleteDiary(item.id);
  };

  const handleCancelDeleteModal = () => {
    setIsModalDeleteOpen(false);
  };

  const showModalSave = () => {
    setIsModalSaveOpen(true);
  };

  const handleOkSaveModal = async () => {
    if (selectedCateDiary) {
      const result = await addIntoCate(item.id, selectedCateDiary);

      if (result) {
        setIsModalSaveOpen(false);
      }
    }
  };

  const handleCancelSaveModal = () => {
    setIsModalSaveOpen(false);
  };
  return (
    <>
      {
        <Modal
          maskClosable={false}
          title="Bạn có chắc muốn xóa nhật ký này không ?"
          open={isModalDeleteOpen}
          onOk={handleOkDeleteModal}
          okType="danger"
          okText="Có"
          cancelText="Không"
          onCancel={handleCancelDeleteModal}
        ></Modal>
      }
      {
        <Modal
          maskClosable={false}
          open={isModalSaveOpen}
          onOk={handleOkSaveModal}
          title="Lưu tâm sự vào kho nhật ký"
          okType="primary"
          okText="Lưu"
          cancelText="Hủy bỏ"
          onCancel={handleCancelSaveModal}
        >
          <Select
            size="large"
            mode="multiple"
            value={selectedCateDiary}
            suffixIcon={false}
            className="min-h-20 w-full rounded-none"
            menuItemSelectedIcon
            onChange={(value) => setSelectedCateDiary(value)}
          >
            {listCateDiary.map((item, index) => (
              <Select.Option value={item.id} key={index}>
                <div className="flex items-center gap-2">
                  <Image
                    loading="lazy"
                    lazyRoot=""
                    alt="icon diary thumbnail cate icon"
                    width={30}
                    height={30}
                    src={item.thumbnail}
                  />
                  <p>{item.cate_diary_name}</p>
                </div>
              </Select.Option>
            ))}
          </Select>
        </Modal>
      }
      <div
        onClick={() =>
          updatePath({
            ...conditions,
            diaryId: item.id,
            mode: "editor",
          })
        }
        key={item.id}
        className={`flex flex-col p-2 text-[#3D3D3D] border rounded-md w-[95%] cursor-pointer ${diaryIdSearchParam == item.id && "bg-blue-50"}`}
      >
        <div className="flex items-center justify-between">
          {!smallModeListDiary && (
            <p className="font-medium text-lg">{item.title}</p>
          )}
          <Image
            alt="icon-mood-diary"
            src={item.mood_diary.icon_mood}
            width={!smallModeListDiary ? 20 : 50}
            height={!smallModeListDiary ? 20 : 50}
          />
        </div>
        {!smallModeListDiary && (
          <Fragment>
            <div
              className={
                DOMPurify.sanitize(item.body)?.length > 100
                  ? "custom-text-dom custom-truncate truncate-mobile"
                  : "custom-text-dom"
              }
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(item.body, {
                  FORBID_TAGS: ["img", "h1", "h2", "h3", "h4"],
                  KEEP_CONTENT: true,
                }),
              }}
            />
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 p-2 rounded-md border w-fit mt-3">
                <CalendarTick />
                <p>{item.created_at}</p>
              </div>
              <div className="flex gap-3">
                <div
                  className="w-[35px] h-[35px] border rounded-md flex items-center justify-center"
                  onClick={() => showModal()}
                >
                  <Image
                    alt=""
                    src={"/icons-system/GreySolidIcon/trash.svg"}
                    width={18}
                    height={18}
                  />
                </div>
                <div
                  className="w-[35px] h-[35px] border rounded-md flex items-center justify-center"
                  onClick={showModalSave}
                >
                  <Save2 color="#0F52BA" />
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </>
  );
};

export default DiaryItem;
