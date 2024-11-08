"use client";

import { Button, Drawer, Input, Spin } from "antd";
import { SearchNormal } from "iconsax-react";
import { Image as ImageAntd } from "antd";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { ActionImageDiaryState, submitFormImagesDiary } from "./action";
import {
  getAllImageDiaryByAccount,
  ImageDiaryForCard,
} from "@/service/diaryService";
import Image from "next/image";
import { useRouter } from "next/navigation";

type PropsComponent = {
  diaryId?: string;
  openRightContainerImage: boolean;
  setOpenRightContainerImage: (flg: boolean) => void;
};

const defaultData = {
  image: "",
};

const initialState: ActionImageDiaryState = {
  validate: defaultData,
  success: false,
};

export default function ModalDrawerImageDiary(props: PropsComponent) {
  const [imagesUpload, setImagesUpload] = useState<string[]>([]);
  const [listImageDiary, setListImageDiary] = useState<
    Array<ImageDiaryForCard>
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [keyword, setKeyWord] = useState<string>("");
  const [data, formAction] = useFormState(submitFormImagesDiary, initialState);
  useEffect(() => {
    if (data.success) {
      setLoading(false);
      setImagesUpload([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const router = useRouter();

  function isValidImage(file: File): boolean {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
    return allowedMimeTypes.includes(file.type);
  }

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const images: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!isValidImage(file)) {
        console.error("Invalid image file:", file.name);
        continue;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      try {
        const dataUrl: string = await new Promise((resolve, reject) => {
          reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target?.result && typeof e.target.result === "string") {
              resolve(e.target.result);
            } else {
              reject(new Error("Failed to read image data"));
            }
          };
          reader.onerror = reject;
        });

        images.length < 4 && images.push(dataUrl);
      } catch (error) {
        console.error("Error reading image:", file.name, error);
      }
    }
    setImagesUpload(images);
  };

  const getImageDiaryByCondition = () => {
    try {
      setLoading(true);
      getAllImageDiaryByAccount({
        keyword: keyword,
      })
        .then((res) => {
          if (res) {
            setListImageDiary(res);
          }
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getImageDiaryByCondition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  return (
    <Drawer
      width={"19%"}
      onClose={() => props.setOpenRightContainerImage(false)}
      open={props.openRightContainerImage}
      mask={false}
    >
      <form action={formAction} onSubmit={() => setLoading(true)}>
        <Input name="diaryId" value={props.diaryId} className="hidden" />
        <div className="flex flex-col gap-3 relative">
          {loading && (
            <div className="absolute w-full h-full z-[100] flex items-center justify-center bg-white opacity-50">
              <Spin size="small" />
              <Spin />
              <Spin size="large" />
            </div>
          )}

          <div className="flex gap-2 items-center">
            <Input
              value={keyword}
              onChange={(e) => setKeyWord(e.target.value)}
              className="h-[40px] rounded-[32px]"
              placeholder="Tìm kiếm hình ảnh..."
            />
            <div
              className="cursor-auto rounded-full hover:bg-blue-100 h-[40px] w-[50px] flex items-center justify-center"
              onClick={getImageDiaryByCondition}
            >
              <SearchNormal />
            </div>
          </div>

          {imagesUpload.length > 0 && (
            <div className="flex flex-wrap gap-3 items-center">
              {imagesUpload.map((image, index) => (
                <div
                  key={index}
                  className="w-[60px] h-[60px] rounded-md relative overflow-hidden"
                >
                  <ImageAntd
                    width={60}
                    height={60}
                    src={image}
                    alt={`preview image ${index + 1}`}
                    key={index}
                  />
                </div>
              ))}
            </div>
          )}

          <div className={`flex gap-4 ${!imagesUpload.length && "hidden"}`}>
            <Button
              loading={loading}
              htmlType="submit"
              type="primary"
              className="h-10 w-1/2 rounded-[32px] text-[15px] font-semibold relative"
            >
              Tải lên
            </Button>
            <Button
              onClick={() => setImagesUpload([])}
              type="default"
              className="h-10 w-1/2 rounded-[32px] text-[15px] font-semibold relative"
            >
              Hủy bỏ
            </Button>
          </div>

          <Button
            type="primary"
            className={`h-10 rounded-[32px] text-[15px] font-semibold relative ${imagesUpload.length && "hidden"}`}
          >
            <label htmlFor="upload_image_diary_multi" className="w-full">
              Chọn hình ảnh lên
            </label>
            <input
              id="upload_image_diary_multi"
              className="hidden"
              name="image"
              type="file"
              onChange={onImageChange}
              multiple
              accept="image/png, image/gif, image/jpeg"
            />
          </Button>
          <p className="text-red-500">{data?.validate?.image}</p>
          <div className="flex flex-col gap-4">
            <h3 className="text-[15px] font-semibold">Hình ảnh của bạn</h3>
            <div className="flex flex-wrap items-start justify-start gap-3">
              {listImageDiary.map((item, index) => (
                <div
                  key={index}
                  className="group w-[29%] relative cursor-pointer"
                  onClick={() =>
                    router.push(`/diary?diaryId=${item.id_diary}&mode=editor`)
                  }
                >
                  <Image
                    className="w-full h-full object-contain"
                    height={100}
                    width={100}
                    src={item.path}
                    alt={`preview image ${index + 1}`}
                    key={index}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </Drawer>
  );
}
