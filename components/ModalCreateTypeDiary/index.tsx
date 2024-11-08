"use client";

import { Button, Form, FormProps, Input, Modal, Select } from "antd";
import { useState } from "react";
import { createCategoryDiary, updateCategoryDiary } from "./action";
import Image from "next/image";
import { TopicIcons } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { CateDiaryForCard } from "@/service/diaryService";

type PropsComponent = {
  isModalOpen: boolean;
  onClose: () => void;
  isEdit?: boolean;
  cateDiary?: CateDiaryForCard;
};

type FieldType = {
  cateDiaryName?: string;
  thumbnail?: string;
};

export default function ModalCreateTypeDiary(props: PropsComponent) {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const onCreateCategoryDiary: FormProps<FieldType>["onFinish"] = async (
    values,
  ) => {
    setLoading(true);
    if (props.isEdit) {
      await updateCategoryDiary(
        {
          cateDiaryName: values.cateDiaryName ?? "",
          thumbnail: values.thumbnail ?? TopicIcons[0].url,
        },
        props.cateDiary?.id ?? "",
      );
    } else {
      await createCategoryDiary({
        cateDiaryName: values.cateDiaryName ?? "",
        thumbnail: values.thumbnail ?? TopicIcons[0].url,
      });
    }
    form.resetFields();
    setLoading(false);
    if (props.isEdit && props.cateDiary?.id) {
      router.replace(`/diary?cateDiaryId=${props.cateDiary?.id}`);
    } else {
      router.replace(
        `/diary?time=${new Date().getTimezoneOffset().toString()}`,
      );
    }
    props.onClose();
  };
  return (
    <Modal
      onCancel={() => props.onClose()}
      title={
        props.isEdit
          ? "Chỉnh sửa mục lưu trữ nhật kí"
          : "Tạo thư mục lưu trữ nhật kí"
      }
      open={props.isModalOpen}
      footer={false}
    >
      <Form
        form={form}
        className="mt-5 grid grid-cols-12 items-center gap-y-5"
        name="basic"
        initialValues={{
          cateDiaryName: props?.cateDiary?.cate_diary_name ?? "",
          thumbnail: props?.cateDiary?.thumbnail ?? TopicIcons[0].url ?? "",
        }}
        onFinish={onCreateCategoryDiary}
        autoComplete="off"
        layout="inline"
      >
        <Form.Item<FieldType> className="col-span-4" name="thumbnail">
          <Select
            suffixIcon={false}
            className="h-[65px] border border-[#0F52BA] rounded-lg justify-self-end"
            menuItemSelectedIcon
            onChange={() => {}}
          >
            {TopicIcons.map((item, index) => (
              <Select.Option value={item.url} key={index}>
                <div className="flex items-center gap-2">
                  <Image
                    alt="icon diary thumbnail cate icon"
                    width={30}
                    height={30}
                    src={item.url}
                  />
                  <p>{item.label}</p>
                </div>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item<FieldType>
          className="col-span-8"
          name="cateDiaryName"
          rules={[{ required: true, message: "vui lòng điền tên thư mục!" }]}
        >
          <Input
            className="h-[65px] border-[#0F52BA] rounded-lg"
            placeholder="Nơi lưu trữ nhật kí mà bạn muốn tạo..."
          />
        </Form.Item>

        <div className="col-span-12 flex items-center justify-center">
          <Button
            loading={loading}
            htmlType="submit"
            className="h-[39px] w-[127px] rounded-[32px] bg-[#0F52BA] text-white font-medium"
          >
            {props.isEdit ? "Cập nhật" : "Tạo"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
