import { getDetailPost } from "@/service/postService";
import DetailNewFeedPageView from "./detail-new-feeds-page-view";
import { notFound } from "next/navigation";

type Props = {
  params: {
    idNewFeed: string;
  };
};

const getDetailNewFeedById = async (idPost: string) => {
  try {
    return await getDetailPost(idPost);
  } catch (error) {
    console.error(error);
  }
};

export default async function DetailNewFeedsPage(props: Props) {
  const detailPost = await getDetailNewFeedById(props.params.idNewFeed);

  if (!detailPost) {
    notFound();
  }

  return (
    <div className="w-full">
      <DetailNewFeedPageView detailPost={detailPost} />
    </div>
  );
}
