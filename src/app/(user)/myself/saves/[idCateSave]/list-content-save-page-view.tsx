"use client";

import Link from "next/link";
import { AvatarAccount } from "../../../../../../components";
import { Button } from "antd";
import { BackSquare, Edit, NoteRemove } from "iconsax-react";
import { ContentSaveForCard } from "@/service/saveContentService";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ModalDeleteContentSave from "../../../../../../components/ModalDeleteContentSave";
import { CategorySaveForResponse } from "@/service/categorySaveService";

type PropsComponent = {
  listContentSaveByCate: Array<ContentSaveForCard>;
  detailContentSave: CategorySaveForResponse;
};

export default function ListContentSavePageView(props: PropsComponent) {
  const router = useRouter();
  const renderNameAuthor = (item: ContentSaveForCard) => {
    if (!!item?.blog?.id) {
      return {
        name: item.blog.account.full_name,
        avata: item.blog.account.avata,
        fullName: item.blog.account.full_name,
      };
    }
    if (!!item?.post?.id) {
      return {
        name: item.post.account.full_name,
        avata: item.post.account.avata,
        fullName: item.post.account.full_name,
      };
    }
    if (!!item?.post_share?.id) {
      return {
        name: item.post_share.account.full_name,
        avata: item.post_share.account.avata,
        fullName: item.post_share.account.full_name,
      };
    }
  };

  const renderContent = (item: ContentSaveForCard) => {
    if (!!item?.blog?.id) {
      return {
        content: item.blog.title,
      };
    }
    if (!!item?.post?.id) {
      return {
        content: item.post.content_text,
      };
    }
    if (!!item?.post_share?.id) {
      return {
        content: item.post_share.content,
      };
    }
  };

  const renderImageContent = (item: ContentSaveForCard) => {
    if (!!item?.blog?.id) {
      return {
        image: item.blog.image,
      };
    }
    if (!!item?.post?.id) {
      return {
        image: item.post.images,
      };
    }
    if (!!item?.post_share?.id) {
      return {
        image: "",
      };
    }
  };

  const handleDetailContentSave = (item: ContentSaveForCard) => {
    if (!!item?.blog?.id) {
      router.push("/");
    }
    if (!!item?.post?.id) {
      router.push(`/new-feeds/${item?.post?.id}`);
    }
    if (!!item?.post_share?.id) {
      router.push(`/share/${item?.post_share?.id}`);
    }
  };

  const [showModalDeleteSaveContent, setShowModalDeleteSaveContent] =
    useState<boolean>(false);

  const [contentSelected, setContentSelected] = useState<string>();

  const handleRemoveContent = (item: ContentSaveForCard) => {
    setContentSelected(item.blog?.id || item.post?.id || item.post_share?.id);
    setShowModalDeleteSaveContent(true);
  };
  return (
    <div className="flex flex-col gap-3 ">
      <div className="bg-white rounded-md p-2 flex gap-3 items-center">
        <Button
          type="dashed"
          icon={<BackSquare />}
          className="flex items-center"
          onClick={() => router.back()}
        >
          Quay lại
        </Button>
        <p>
          / {props.detailContentSave.title} ({props.detailContentSave.count} bài
          viết)
        </p>
      </div>

      {showModalDeleteSaveContent && (
        <ModalDeleteContentSave
          idSaveContent={contentSelected ?? ""}
          setIsSave={() => {}}
          showModal={setShowModalDeleteSaveContent}
          visible={showModalDeleteSaveContent}
        />
      )}
      {props.listContentSaveByCate.map((item, index) => {
        return (
          <div
            className="rounded-md bg-white p-2 flex gap-3 items-center relative"
            key={index}
          >
            {renderImageContent(item)?.image && (
              <div className="w-[150px] h-[150px] bg-slate-400 rounded-md overflow-hidden relative">
                <Image
                  src={renderImageContent(item)?.image ?? ""}
                  alt="image content save"
                  width={500}
                  className="absolute w-full h-full object-contain"
                  height={500}
                />
              </div>
            )}

            <div className="py-5 w-[70%] flex flex-col gap-4 ">
              <div className="flex items-center gap-3">
                <div className="relative w-[40px] h-[40px]">
                  <AvatarAccount
                    name={renderNameAuthor(item)?.fullName ?? "D"}
                    filePath={renderNameAuthor(item)?.avata}
                  />
                </div>
                <Link href={""} className="hover:underline font-medium">
                  {renderNameAuthor(item)?.fullName}
                </Link>
              </div>
              <div className="line-clamp-3">{renderContent(item)?.content}</div>
              <Button
                type="default"
                onClick={() => handleDetailContentSave(item)}
              >
                Xem chi tiết
              </Button>

              <div className="absolute top-2 right-2">
                <Button
                  type="dashed"
                  icon={<NoteRemove color="#FF8A65" />}
                  onClick={() => handleRemoveContent(item)}
                />
                {/* <Button type="dashed" icon={<Edit />} /> */}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
