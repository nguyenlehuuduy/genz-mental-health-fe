"use client";
import { Button, DatePicker, Input, Pagination, Select } from "antd";
import {
  Add,
  ArrowLeft2,
  CalendarSearch,
  Edit2,
  SearchNormal,
} from "iconsax-react";
import Image from "next/image";
import SlickPromptDiary from "../../../../components/SlickPromptDiary";
import {
  CateDiaryForCard,
  deleteDiary,
  DiaryForCard,
  DiaryForResponse,
  DiaryForUpdate,
  getAllDiary,
  getDetailCateDiary,
  getDetailDiary,
  PromtDiaryForCard,
  updateDiary,
} from "@/service/diaryService";
import {
  ModalCreateDiary,
  ModalCreateTypeDiary,
  ModalDrawerImageDiary,
} from "../../../../components";
import { useEffect, useState } from "react";
import { MoodDiaryForCard } from "@/service/moodDiaryService";
import { PaginationForResponse } from "../../../../type";
import { LIMIT_DEFAULT, PAGE_NO_DEFAULT } from "@/lib/constants";
import { formatDate, objectToQueryParams } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import DiaryItem from "../../../../components/DiaryItem";
import dayjs from "dayjs";
const CustomEditor = dynamic(() => import("../../../../components/Editor"), {
  ssr: false,
});

type PropsComponent = {
  listMoodDiary: MoodDiaryForCard[];
  listPromt: PromtDiaryForCard[];
  listCateDiary: CateDiaryForCard[];
  searchParams: {
    mode?: "start" | "editor";
    diaryId?: string;
    keyword?: string;
    pageNo?: string;
    limit?: string;
    orderBy?: string;
    sortBy?: string;
    cateDiaryId?: string;
    createDateFrom?: string;
    createDateTo?: string;
  };
};

type Conditions = {
  pageNo?: string;
  limit?: string;
  keyword?: string;
  sortBy?: string;
  orderBy?: string;
  mode?: "start" | "editor";
  diaryId?: string;
  cateDiaryId?: string;
  createDateFrom?: string;
  createDateTo?: string;
};

const getDiaryCondition = async (condition: Conditions) => {
  try {
    return await getAllDiary({
      keyword: condition.keyword ?? "",
      limit: Number(condition.limit) ?? LIMIT_DEFAULT + 4,
      pageNo: Number(condition.pageNo) ?? PAGE_NO_DEFAULT,
      orderBy: condition.orderBy,
      sortBy: condition.sortBy,
      cateDiaryId: condition.cateDiaryId,
      createdDateFrom: condition.createDateFrom,
      createdDateTo: condition.createDateTo,
    });
  } catch (error) {
    console.error(error);
  }
};

const getDetailDiaryByCondition = async (idDiary: string) => {
  try {
    return await getDetailDiary(idDiary);
  } catch (error) {
    console.error(error);
  }
};

const updateDiaryByCondition = async (
  body: DiaryForUpdate,
  idDiary: string,
) => {
  try {
    return await updateDiary(body, idDiary);
  } catch (error) {
    console.error(error);
  }
};

const getDetailCateDiaryByCondition = async (cateDiaryId: string) => {
  try {
    return await getDetailCateDiary(cateDiaryId);
  } catch (error) {
    console.error(error);
  }
};

export default function DiaryPageView(props: PropsComponent) {
  const { RangePicker } = DatePicker;
  const [openModalDiaryCreate, setOpenModalDiaryCreate] =
    useState<boolean>(false);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [bodyDiary, setBodyDiary] = useState<string>("");
  const [moodDiary, setMoodDiary] = useState<string>("");
  const [titleDiary, setTitleDiary] = useState<string>("");
  const [detailDiary, setDetailDiary] = useState<DiaryForCard>();
  const [detailCateDiary, setDetailCateDiary] = useState<CateDiaryForCard>();
  const [showModalUpdateCateDiary, setShowModalUpdateCateDiary] =
    useState<boolean>(false);
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState<string>(
    props.searchParams.keyword ?? "",
  );
  const [openRightContainerImage, setOpenRightContainerImage] = useState(false);
  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  const [listDiary, setListDiary] = useState<Array<DiaryForCard>>([]);
  const router = useRouter();
  const [pagination, setPagination] = useState<PaginationForResponse>();
  const [conditions, setConditions] = useState<Conditions>({
    pageNo: props.searchParams.pageNo ?? String(PAGE_NO_DEFAULT),
    limit: props.searchParams.limit ?? String(LIMIT_DEFAULT + 4),
    cateDiaryId: props.searchParams.cateDiaryId,
    keyword: props.searchParams.keyword,
    orderBy: props.searchParams.orderBy,
    sortBy: props.searchParams.sortBy,
    diaryId: props.searchParams.diaryId,
    mode: props.searchParams.mode,
    createDateFrom: props.searchParams.createDateFrom,
    createDateTo: props.searchParams.createDateTo,
  });

  const DiaryPaginationComponent: React.FC<{
    pagination?: PaginationForResponse;
  }> = ({ pagination }) => {
    return (
      <Pagination
        defaultCurrent={
          pagination?.pageNo ? Number(pagination.pageNo) : undefined
        }
        total={
          pagination?.totalRecord ? Number(pagination.totalRecord) : undefined
        }
        pageSize={pagination?.limit ? Number(pagination.limit) : undefined}
        onChange={(pageNo, limit) =>
          onPageChange(String(pageNo), String(limit))
        }
      />
    );
  };

  const onPageChange = (pageNo: string, limit: string) => {
    updatePath({
      ...conditions,
      pageNo: pageNo,
      limit: limit,
    });
  };

  const updatePath = (condition: Conditions) => {
    const query = objectToQueryParams(condition);
    router.push(
      `/diary?${query}&pageNoCateDiary=${searchParams.get("pageNoCateDiary")}`,
    );
  };

  useEffect(() => {
    const cond: Conditions = {
      keyword: props.searchParams.keyword ?? "",
      limit: props.searchParams.limit ?? String(LIMIT_DEFAULT + 4),
      orderBy: props.searchParams.orderBy ?? "",
      sortBy: props.searchParams.sortBy ?? "",
      pageNo: props.searchParams.pageNo ?? String(PAGE_NO_DEFAULT),
      diaryId: props.searchParams.diaryId,
      cateDiaryId: props.searchParams.cateDiaryId,
      mode: props.searchParams.mode,
      createDateFrom: props.searchParams.createDateFrom,
      createDateTo: props.searchParams.createDateTo,
    };
    setConditions(cond);
    getDiaryCondition(cond).then((rs) => {
      if (rs) {
        const { data, pagination } = rs;
        setListDiary(data);
        setPagination({
          ...pagination,
          pageNo: pagination.pageNo ?? String(PAGE_NO_DEFAULT),
          limit: pagination.limit ?? String(LIMIT_DEFAULT + 4),
          totalRecord: pagination.totalRecord,
        });
      }
    });

    if (props.searchParams.diaryId) {
      getDetailDiaryByCondition(props.searchParams.diaryId).then((rs) => {
        if (rs) {
          setDetailDiary(rs);
          setTitleDiary(rs.title);
          setMoodDiary(rs.mood_diary.id);
          setBodyDiary(rs.body);
        }
      });
    }

    if (props.searchParams.cateDiaryId) {
      getDetailCateDiaryByCondition(props.searchParams.cateDiaryId).then(
        (rs) => {
          if (rs) {
            setDetailCateDiary(rs);
          }
        },
      );
    }
  }, [props]);

  const onHandleUpdateDiary = () => {
    if (detailDiary) {
      updateDiaryByCondition(
        {
          body: bodyDiary,
          moodDiaryId: moodDiary,
          title: titleDiary,
        },
        detailDiary.id,
      ).then((rs) => {
        if (rs) {
          alert("cập nhật thành công");
          updateListDiary(detailDiary.id, rs);
        }
      });
    }
  };

  const updateListDiary = (id: string, response: DiaryForResponse) => {
    const updatedDiaries = listDiary.map((diary) => {
      if (diary.id === id) {
        return {
          ...diary,
          body: response.body,
          title: response.title,
          mood_diary: {
            id: response.id,
            mood_diary_name: response.moodDiary.moodDiaryName,
            description_mood: response.moodDiary.descriptionMood,
            icon_mood: response.moodDiary.iconMood,
          },
          updated_at: new Date().toISOString(),
        };
      }
      return diary;
    });
    setListDiary(updatedDiaries);
  };

  const onHandleDeleteDiary = async (idDiary: string) => {
    try {
      await deleteDiary(idDiary);
      if (idDiary === props.searchParams.diaryId) {
        router.replace(`/diary`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSearch = () => {
    updatePath({
      ...conditions,
      keyword: keyword,
      pageNo: undefined,
      limit: undefined,
    });
  };

  return (
    <div className="flex w-full gap-2 relative">
      <div
        className="absolute flex justify-center items-center right-0 top-0 bottom-0 z-50 w-2 h-full bg-[#0F52BA]"
        onClick={() => setOpenRightContainerImage(true)}
      >
        <div className="w-6 h-20 bg-[#0F52BA] flex justify-center items-center absolute rounded-lg right-0">
          <ArrowLeft2 size="16" color="#FFFFFF" />
        </div>
      </div>
      <ModalDrawerImageDiary
        diaryId={props.searchParams.diaryId}
        openRightContainerImage={openRightContainerImage}
        setOpenRightContainerImage={(flg) => setOpenRightContainerImage(flg)}
      />
      {showModalUpdateCateDiary && (
        <ModalCreateTypeDiary
          isModalOpen={showModalUpdateCateDiary}
          onClose={() => setShowModalUpdateCateDiary(false)}
          isEdit
          cateDiary={detailCateDiary}
        />
      )}

      {openModalDiaryCreate && (
        <ModalCreateDiary
          pageNoCateDiary={searchParams.get("pageNoCateDiary") ?? ""}
          cateDiaryId={props.searchParams.cateDiaryId}
          listMoodDiary={props.listMoodDiary}
          isModalOpen={openModalDiaryCreate}
          onClose={() => setOpenModalDiaryCreate(false)}
        />
      )}
      <div
        className={`flex-none ${!openRightContainerImage ? "w-[27%]" : "w-[60px]"} min-h-[calc(100vh-60px)] overflow-y-auto bg-white rounded-md flex flex-col`}
      >
        <div className="flex gap-3 items-center w-full p-2">
          {!openRightContainerImage && (
            <Input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              prefix={<SearchNormal onClick={onSearch} />}
              className="h-[40px]"
              placeholder="Tìm kiếm nhật ký..."
            />
          )}

          <div
            className="w-[40px] h-[40px] rounded-md bg-[#0F52BA] flex-none flex items-center justify-center cursor-pointer"
            onClick={() => setOpenModalDiaryCreate(true)}
          >
            <Add color="white" />
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center pb-10">
          <div className="flex w-full flex-col p-4 text-[#3D3D3D] gap-2">
            {!openRightContainerImage && (
              <div className="flex flex-col">
                {props.searchParams.cateDiaryId ? (
                  <div className="flex gap-4 justify-start items-center px-1">
                    <Edit2
                      className="cursor-pointer flex-none"
                      onClick={() => setShowModalUpdateCateDiary(true)}
                    />
                    <p className="font-bold text-xl py-2">
                      {detailCateDiary?.cate_diary_name}
                    </p>
                  </div>
                ) : (
                  <p className="font-bold text-xl py-2">
                    Tất cả tâm sự của tôi
                  </p>
                )}
                <RangePicker
                  value={[
                    conditions.createDateFrom
                      ? dayjs(
                          formatDate(conditions.createDateFrom, "DD/MM/YYYY"),
                          "DD/MM/YYYY",
                        )
                      : undefined,
                    conditions.createDateTo
                      ? dayjs(
                          formatDate(conditions.createDateTo, "DD/MM/YYYY"),
                          "DD/MM/YYYY",
                        )
                      : undefined,
                  ]}
                  onChange={(e) => {
                    updatePath({
                      createDateFrom: e?.[0]?.toISOString(),
                      createDateTo: e?.[1]?.toISOString(),
                    });
                  }}
                  format={"DD/MM/YYYY"}
                  placeholder={["ngày bắt đầu", "ngày kết thúc"]}
                  className="flex-none"
                  suffixIcon={<CalendarSearch color="#0F52BA" />}
                />
              </div>
            )}

            {!listDiary.length && <p>Bạn chưa có tâm sự nào cả...</p>}
            {!!listDiary.length && !openRightContainerImage && (
              <DiaryPaginationComponent
                pagination={{
                  pageNo: props.searchParams.pageNo ?? String(PAGE_NO_DEFAULT),
                  limit: props.searchParams.limit ?? String(LIMIT_DEFAULT + 4),
                  totalRecord: pagination?.totalRecord,
                }}
              />
            )}
          </div>
          {listDiary.map((item) => (
            <DiaryItem
              listCateDiary={props.listCateDiary}
              smallModeListDiary={openRightContainerImage}
              key={item.id}
              conditions={conditions}
              diaryIdSearchParam={props.searchParams.diaryId || ""}
              item={item}
              onHandleDeleteDiary={onHandleDeleteDiary}
              updatePath={updatePath}
            />
          ))}
        </div>
      </div>
      <div className="w-[70%] min-h-[calc(100vh-60px)] bg-white rounded-md flex flex-col items-center gap-5 pb-10">
        <SlickPromptDiary listPromt={props.listPromt} />

        {props.searchParams.mode === "editor" && !!detailDiary?.id ? (
          <div className="w-full p-1 min-h-[calc(100vh-200px)] relative flex gap-3 flex-col">
            <div className="flex gap-3">
              <Input
                onChange={(e) => setTitleDiary(e.target.value)}
                value={titleDiary}
                className="h-[70px] text-lg rounded-none font-bold text-center"
                placeholder="Tiêu đề nhật ký"
              />
              <Select
                value={moodDiary ? moodDiary : ""}
                suffixIcon={false}
                className="h-[70px] w-[200px] rounded-none"
                menuItemSelectedIcon
                onChange={(value) => {
                  setMoodDiary(value);
                }}
              >
                {props.listMoodDiary.map((item, index) => (
                  <Select.Option value={item.id} key={index}>
                    <div className="flex items-center gap-2">
                      <Image
                        loading="lazy"
                        lazyRoot=""
                        alt="icon diary thumbnail cate icon"
                        width={30}
                        height={30}
                        src={item.icon_mood}
                      />
                      <p>{item.mood_diary_name}</p>
                    </div>
                  </Select.Option>
                ))}
              </Select>
            </div>

            <Button
              className="absolute z-10 top-[-44px] h-[44px] right-0 w-[100px] bg-blue-500 text-white"
              onClick={onHandleUpdateDiary}
            >
              Lưu
            </Button>
            {editorLoaded ? (
              <CustomEditor
                initialData={bodyDiary}
                onChange={(e) => setBodyDiary(e)}
              />
            ) : (
              "Đang chuẩn bị dữ liệu vui lòng đợi..."
            )}
          </div>
        ) : (
          <div className="bg-[#F3FAFF] w-[80%] h-auto border-r-8 border-[#0F52BA] rounded-l-3xl flex flex-col items-center gap-7 py-10 shadow-md">
            <p className="text-2xl text-[#0F52BA] font-bold">Nhật ký của bạn</p>
            <p className="text-[#002A6B] w-[70%] text-center">
              Chào mừng bạn đến với nhật ký hôm nay, nơi chúng ta cùng nhau ghi
              lại những khoảnh khắc đáng nhớ và những suy nghĩ sâu lắng nhất của
              cuộc sống
            </p>
            <Image
              alt="diary banner icon"
              src={"/icon-banner-diary.svg"}
              width={500}
              height={500}
              className=""
            />
            <Button
              className="bg-[#0A68EB] w-[184px] h-[40px] rounded-[32px] text-white"
              onClick={() => setOpenModalDiaryCreate(true)}
            >
              Viết Nhật Ký Ngay
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
