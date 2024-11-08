import { getAllCateDiary, getPromtDiary } from "@/service/diaryService";
import DiaryPageView from "./diary-page-view";
import { getAllMoodDiary } from "@/service/moodDiaryService";
import { LIMIT_DEFAULT_CATE_DIARY, PAGE_NO_DEFAULT } from "@/lib/constants";

type Props = {
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

export default async function DiaryPage(props: Props) {
  const listMoodDiary = await getAllMoodDiary();
  const listPrompt = await getPromtDiary();
  const listCateDiary = await getAllCateDiary({
    pageNo: PAGE_NO_DEFAULT,
    limit: LIMIT_DEFAULT_CATE_DIARY,
  });

  return (
    <DiaryPageView
      searchParams={props.searchParams}
      listMoodDiary={listMoodDiary ?? []}
      listPromt={listPrompt?.data ?? []}
      listCateDiary={listCateDiary?.data ?? []}
    />
  );
}
