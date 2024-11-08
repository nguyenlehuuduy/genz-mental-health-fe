"use client";
import { Add } from "iconsax-react";
import ModalCreateTypeDiary from "../ModalCreateTypeDiary";
import { useEffect, useState } from "react";
import { CateDiaryForCard, getAllCateDiary } from "@/service/diaryService";
import Image from "next/image";
import { PaginationForResponse } from "../../type";
import { Pagination } from "antd";
import { objectToQueryParams } from "@/lib/utils";
import { LIMIT_DEFAULT, PAGE_NO_DEFAULT } from "@/lib/constants";
import { useRouter, useSearchParams } from "next/navigation";

type PropsComponent = {};

type Conditions = {
  pageNoCateDiary?: string;
  limitCateDiary?: string;
  keywordCateDiary?: string;
  sortByCateDiary?: string;
  orderByCateDiary?: string;
  cateDiaryId?: string;
};

const getDiaryCateByCondition = async (condition: Conditions) => {
  try {
    return await getAllCateDiary({
      keyword: condition.keywordCateDiary,
      limit: Number(condition.limitCateDiary) ?? LIMIT_DEFAULT + 2,
      pageNo: Number(condition.pageNoCateDiary) ?? PAGE_NO_DEFAULT,
      orderBy: condition.orderByCateDiary,
      sortBy: condition.sortByCateDiary,
    });
  } catch (error) {
    console.error(error);
  }
};

export default function DiaryRepository(props: PropsComponent) {
  const [listCateDiary, setListCateDiary] = useState<Array<CateDiaryForCard>>();
  const [paginationCate, setPaginationCate] = useState<PaginationForResponse>();
  const [conditions, setConditions] = useState<Conditions>({
    pageNoCateDiary: String(PAGE_NO_DEFAULT),
    limitCateDiary: String(LIMIT_DEFAULT + 2),
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const cond: Conditions = {
      keywordCateDiary: searchParams.get("keywordCateDiary") ?? "",
      limitCateDiary:
        searchParams.get("limitCateDiary") ?? String(LIMIT_DEFAULT + 2),
      orderByCateDiary: searchParams.get("orderByCateDiary") ?? "",
      sortByCateDiary: searchParams.get("sortByCateDiary") ?? "",
      cateDiaryId: searchParams.get("cateDiaryId") ?? "",
      pageNoCateDiary:
        searchParams.get("pageNoCateDiary") ?? String(PAGE_NO_DEFAULT),
    };
    setConditions(cond);
    getDiaryCateByCondition(cond).then((rs) => {
      if (rs) {
        const { data, pagination } = rs;
        setListCateDiary(data);
        setPaginationCate({
          ...paginationCate,
          pageNo: pagination.pageNo ?? String(PAGE_NO_DEFAULT),
          limit: pagination.limit ?? String(LIMIT_DEFAULT + 2),
          totalRecord: pagination.totalRecord,
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

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
      pageNoCateDiary: pageNo,
      limitCateDiary: limit,
    });
  };

  const updatePath = (condition: Conditions) => {
    const query = objectToQueryParams(condition);
    router.push(`/diary?${query}`);
  };

  const [openModalTypeDiary, setOpenModalDiary] = useState<boolean>(false);
  return (
    <div className="p-3 w-full">
      {openModalTypeDiary && (
        <ModalCreateTypeDiary
          onClose={() => {
            setOpenModalDiary(false);
          }}
          isModalOpen={openModalTypeDiary}
        />
      )}

      <div
        className="flex justify-between items-center font-bold"
        id="diary-container"
      >
        <p>Kho nhật ký</p>
        <div className="p-2 bg-[#0F52BA] rounded-md cursor-pointer w-[40px] h-[40px]">
          <Add color="white" onClick={() => setOpenModalDiary(true)} />
        </div>
      </div>
      <DiaryPaginationComponent
        pagination={{
          limit: searchParams.get("limitCateDiary") ?? paginationCate?.limit,
          pageNo: searchParams.get("pageNoCateDiary") ?? paginationCate?.pageNo,
          totalRecord: paginationCate?.totalRecord,
        }}
      />
      <div className="flex flex-col gap-3 mt-3">
        <div
          className={`flex justify-between items-center p-3 rounded-md border-2 cursor-pointer ${!conditions.cateDiaryId && "bg-blue-50"}`}
          onClick={() =>
            updatePath({
              ...conditions,
              cateDiaryId: undefined,
            })
          }
        >
          <Image
            alt="icon thumbnail diary"
            src={"/big_logo.png"}
            width={60}
            height={60}
          />
          <p className="w-[70%] font-medium ml-3">Tất cả nhật ký của bạn</p>
          <p className="w-[40px] h-[40px] flex items-center justify-center rounded-full border-2">
            {listCateDiary?.[0]?.total_all_diary ?? 0}
          </p>
        </div>
        {listCateDiary?.map((item) => (
          <div
            key={item.id}
            className={`flex justify-between items-center p-3 rounded-md border-2 cursor-pointer ${conditions.cateDiaryId === item.id && "bg-blue-50"}`}
            onClick={() =>
              updatePath({
                ...conditions,
                cateDiaryId: item.id,
              })
            }
          >
            <Image
              alt="icon thumbnail diary"
              src={item?.thumbnail ?? "/big_logo.png"}
              width={60}
              height={60}
            />
            <p className="w-[70%] font-medium ml-3">{item.cate_diary_name}</p>

            <p className="w-[40px] h-[40px] flex items-center justify-center rounded-full border-2">
              {item.count_diary}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
