"use client";

import React, { useState } from "react";
import { Button, Form, FormProps, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { createSaveCateContent } from "./action";
import { CategorySaveForResponse } from "@/service/categorySaveService";

type PropsComponent = {
  showModal: (flg: boolean) => void;
  visible: boolean;
  isUpdate?: boolean;
  categorySave?: CategorySaveForResponse;
};

type FieldType = {
  title?: string;
  description?: string;
};

export default function ModalCreateSaveContent(props: PropsComponent) {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const onCreateSaveContent: FormProps<FieldType>["onFinish"] = async (
    values,
  ) => {
    setLoading(true);
    await createSaveCateContent({
      title: values.title ?? "",
      description: values.description,
    });
    form.resetFields();
    setLoading(false);
    props.showModal(false);
  };

  return (
    <Modal
      title="Tạo thư mục lưu mới"
      open={props.visible}
      footer={false}
      onCancel={() => props.showModal(false)}
    >
      <Form
        form={form}
        className="mt-10"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onCreateSaveContent}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item<FieldType>
          label="Tên thư mục"
          name="title"
          rules={[{ required: true, message: "vui lòng điền tên thư mục!" }]}
        >
          <TextArea placeholder="cuộc sống, chữa lành, nội tâm,.." autoSize />
        </Form.Item>
        <div style={{ margin: "24px 0" }} />
        <div style={{ margin: "14px 0" }} />

        <Form.Item<FieldType> label="Mô tả" name="description">
          <TextArea
            placeholder="một ngày mới bắt đầu là điều giản đơn để động lực"
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </Form.Item>

        <Button loading={loading} htmlType="submit">
          Tạo
        </Button>
      </Form>
    </Modal>
  );
}
