import { getDetailPostShare } from "@/service/postService";
import DetailPostSharePageView from "./detail-post-share";
import { notFound } from "next/navigation";

type Props = {
  params: {
    idShare: string;
  };
};

const getDetailNewFeedById = async (idPost: string) => {
  try {
    return await getDetailPostShare(idPost);
  } catch (error) {
    console.error(error);
  }
};

export default async function DetailNewFeedsPage(props: Props) {
  const detailPost = await getDetailNewFeedById(props.params.idShare);

  if (!detailPost) {
    notFound();
  }
  return (
    <div className="w-full">
      <DetailPostSharePageView detailPost={detailPost} />
    </div>
  );
}
