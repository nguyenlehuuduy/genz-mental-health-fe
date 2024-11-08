import { getDetailBlogBySlug, blogWatcher } from "@/service/blogService";
import Image from "next/image";
import { notFound } from "next/navigation";
import ParsingHTMLCKeitor from "../../../../../components/ParseHTML";
import { Breadcrumb } from "antd";
import {
  AvatarAccount,
  CommentForBlog,
  SlickBlog,
} from "../../../../../components";
import Link from "next/link";
import { COOKIE_ACCOUNT_GUEST } from "@/lib/constants";
import { convertParserString } from "@/lib/utils";
import { GuestAccountType } from "@/lib/type";
import { cookies } from "next/headers";

type PropsComponent = {
  params: {
    slug: string;
  };
};

export default async function BlogDetailPage(props: PropsComponent) {
  const detailBlog = await getDetailBlogBySlug(props.params.slug);
  const cookieStore = cookies();
  const guestAccountInfo = convertParserString(
    cookieStore.get(COOKIE_ACCOUNT_GUEST)?.value ?? "[]",
  ) as GuestAccountType;
  if (!detailBlog) {
    notFound();
  }
  const { blog, related_blog } = detailBlog;
  await blogWatcher(blog.id);
  return (
    <div className="max-w-[1140px] px-20 pb-[100px] pt-3 bg-white flex flex-col">
 <Breadcrumb
  className="p-3 border rounded-lg w-fit mb-3 text-[16px]"
  separator=">"
  items={[
    {
      title: (
        <a href="/" className="font-bold" style={{ color: "#0F52BA" }}>
          Trang chủ
        </a>
      ),
    },
    {
      title: (
        <a href="/blog" className="font-bold" style={{ color: "#0F52BA" }}>
          Blog
        </a>
      ),
    },
    {
      title: (
        <span style={{ color: "#0F52BA" }}>{blog.title}</span>
      ),
    },
  ]}
/>

      <div className="flex flex-col mx-auto gap-5">
        <div className="flex items-center justify-between">
          <div className="flex">
            <div className="relative w-[44px] h-[44px] rounded-full flex justify-center items-center">
              <AvatarAccount
                name={blog.account.full_Name}
                filePath={blog.account.avata}
                height={44}
                width={44}
              />
            </div>
            <div className="flex flex-col ml-2">
              <p className="text-[16px] font-medium  text-[#0F52BA] ">
                {blog.account.full_Name}
              </p>
              <p className="font-thin text-[13px]"> {blog.created_at}</p>
            </div>
          </div>

          <span className="underline">Lượt xem: {blog.views}</span>
        </div>

        <p className="font-bold text-3xl">{blog.title}</p>

        <div className="flex gap-3">
          {blog.cate_blog.map((item) => (
            <div key={item.id} className="flex gap-3 items-center">
              <Image
                alt="image cate blog"
                src={item.thumbnail_cate_blog}
                height={60}
                width={60}
                className="rounded-md"
              />
              <span className="font-medium">{item.title}</span>
            </div>
          ))}
        </div>

        <p className="font-medium text-xl items-center">
          {blog.cate_blog.map((item) => item.title).join(", ")}
        </p>
      </div>

      <div className="w-full">
        <ParsingHTMLCKeitor bodyHTML={blog.body} />
      </div>

      <div className="p-5 mt-10 border-y-2 flex flex-col items-center justify-center gap-3">
        <p className="text-center font-medium text-[25px]">
          Tham gia nhóm của chúng tôi để trở thành một phần <br /> trong câu
          chuyện của chúng tôi
        </p>
        <Link
  className="bg-[#0F52BA] text-white px-3 py-2 border rounded-md"
  href="https://www.facebook.com/profile.php?id=61557738314939"
>
  <b>Tham gia ngay</b>
</Link>
      </div>

      {/* <p className="font-medium text-2xl my-5">
        Đánh giá sự ấn tượng của bạn về bài blog này
      </p>
      <div className="flex gap-5">
        <div className="flex items-center justify-evenly w-[130px] h-[58px] border border-[#666666] cursor-pointer">
          <Image
            alt="icon_like"
            src={"/like_icon.svg"}
            width={40}
            height={40}
          />
          <p className="font-medium text-xl">1000</p>
        </div>
        <div className="flex items-center justify-evenly w-[130px] h-[58px] border border-[#666666] cursor-pointer">
          <Image
            alt="icon_like"
            src={"/dislike_icon.svg"}
            width={40}
            height={40}
          />
          <p className="font-medium text-xl">10</p>
        </div>
      </div> */}

      <CommentForBlog
        blogId={blog.id}
        accountGuestInfo={guestAccountInfo}
        commentList={blog.comments ?? []}
      />
      <p className="font-medium text-2xl my-5">Bạn đọc gì tiếp theo</p>
      <SlickBlog relatedBlog={related_blog ?? []} />
    </div>
  );
}
