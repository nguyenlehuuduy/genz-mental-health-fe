"use client";

import { Button, Form, FormProps, Input, Modal, Select } from "antd";
import { useState } from "react";
import { createDiary } from "./action";
import { MoodDiaryForCard } from "@/service/moodDiaryService";
import Image from "next/image";
import { useRouter } from "next/navigation";

type PropsComponent = {
  isModalOpen: boolean;
  onClose: () => void;
  listMoodDiary: MoodDiaryForCard[];
  cateDiaryId?: string;
  pageNoCateDiary?: string;
};

type FieldType = {
  title: string;
  moodDiaryId: string;
};

export default function ModalCreateDiary(props: PropsComponent) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [form] = Form.useForm();
  const onCreateCategoryDiary: FormProps<FieldType>["onFinish"] = async (
    values,
  ) => {
    setLoading(true);
    const rs = await createDiary({
      cateDiaryId: props.cateDiaryId,
      title: values.title ?? "",
      body: "",
      moodDiaryId: values.moodDiaryId,
    });
    if (rs) {
      form.resetFields();
      setLoading(false);
      props.onClose();
      router.replace(
        `/diary?mode=editor&diaryId=${rs}&cateDiaryId=${props.cateDiaryId}&pageNoCateDiary= ${props.pageNoCateDiary}`,
      );
    }
  };
  return (
    <Modal
      onCancel={() => props.onClose()}
      title="Viết nhật ký"
      open={props.isModalOpen}
      footer={false}
    >
      <Form
        form={form}
        className="mt-5 grid grid-cols-12 items-center gap-y-5"
        name="basic"
        initialValues={{
          title: "",
          moodDiaryId: props.listMoodDiary[0].id,
        }}
        onFinish={onCreateCategoryDiary}
        autoComplete="off"
        layout="inline"
      >
        <Form.Item<FieldType> className="col-span-4" name="moodDiaryId">
          <Select
            suffixIcon={false}
            className="h-[65px] border border-[#0F52BA] rounded-lg justify-self-end"
            menuItemSelectedIcon
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
        </Form.Item>

        <Form.Item<FieldType>
          className="col-span-8"
          name="title"
          rules={[
            { required: true, message: "vui lòng nhập tiêu đề nhật ký!" },
          ]}
        >
          <Input
            className="h-[65px] border-[#0F52BA] rounded-lg"
            placeholder="Tiêu đề nhật ký"
          />
        </Form.Item>

        <div className="col-span-12 flex items-center justify-center">
          <Button
            loading={loading}
            htmlType="submit"
            className="h-[39px] w-[127px] rounded-[32px] bg-[#0F52BA] text-white font-medium"
          >
            Tạo
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
