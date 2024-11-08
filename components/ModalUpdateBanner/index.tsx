"use client";
import React, { useEffect, useState } from "react";
import ReactDOM, { useFormState } from "react-dom";
import { Button, Modal } from "antd";
import Image from "next/image";
import { ActionUploadBannerState, uploadBanner } from "./action";
import { useDispatch } from "react-redux";
import { updateBanner } from "../../redux/actions/auth";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const defaultData = {
  image: "",
};

const initialState: ActionUploadBannerState = {
  validate: defaultData,
  success: false,
};

const ModalUpdateBanner: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
  const [urlBanner, setUrlBanner] = useState<string>("");
  const [data, formAction] = useFormState(uploadBanner, initialState);
  const [loading, setLoading] = useState<boolean>(false);

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    if (!isValidImage(files[0])) {
      console.error("Invalid image file:", files[0].name);
    }
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
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
      setUrlBanner(dataUrl);
    } catch (error) {
      console.error("Error reading image:", files[0].name, error);
    }
  };

  function isValidImage(file: File): boolean {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
    return allowedMimeTypes.includes(file.type);
  }
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(false);
    if (data.success) {
      dispatch(updateBanner(data.banner));
      closeModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const modalContent = (
    <Modal
      open={isOpen}
      onCancel={closeModal}
      width={500}
      footer={null}
      closable={false}
      centered
      getContainer={false}
    >
      <form
        action={formAction}
        className="flex flex-col"
        onSubmit={() => setLoading(true)}
      >
        <div className="flex flex-col">
          <div className="text-base font-semibold">Cập nhật ảnh bìa</div>
          <div className="flex w-full items-center justify-center mt-3 cursor-pointer">
            <div className="relative overflow-hidden border-2 border-dashed w-[90%] h-[200px] rounded-md flex items-center justify-center">
              <p className="text-2xl font-bold">+</p>
              <Image
                alt="ảnh bìa"
                src={urlBanner}
                width={100}
                height={100}
                className="absolute w-full object-contain"
              />
              <input
                id="upload_image_multi"
                className="absolute w-full h-full opacity-0"
                name="image"
                type="file"
                onChange={onImageChange}
                accept="image/png, image/gif, image/jpeg"
              />
            </div>
            <span>{data.validate?.image}</span>
          </div>
          <div className="mt-3 flex gap-3">
            <Button
              className="bg-blue-500 text-white"
              htmlType="submit"
              loading={loading}
            >
              Lưu thay đổi
            </Button>
            <Button onClick={closeModal}>Hủy bỏ</Button>
          </div>
        </div>
      </form>
    </Modal>
  );

  return typeof document !== "undefined"
    ? ReactDOM.createPortal(modalContent, document.body)
    : null;
};
export default ModalUpdateBanner;
