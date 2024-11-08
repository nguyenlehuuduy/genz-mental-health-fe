"use client";

import React, { useState } from "react";
import { Button, Form, FormProps, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { CategorySaveForResponse } from "@/service/categorySaveService";
import { updateSaveCateContent } from "./action";

type PropsComponent = {
  showModal: (flg: boolean) => void;
  visible: boolean;
  categorySave?: CategorySaveForResponse;
};

type FieldType = {
  title?: string;
  description?: string;
};

export default function ModalUpdateSaveContent(props: PropsComponent) {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const onUpdateSaveContent: FormProps<FieldType>["onFinish"] = async (
    values,
  ) => {
    setLoading(true);
    await updateSaveCateContent(
      {
        title: values.title ?? "",
        description: values.description,
      },
      props.categorySave?.id ?? "",
    );
    form.resetFields();
    setLoading(false);
    props.showModal(false);
  };

  return (
    <Modal
      title="Cập nhật thư mục"
      open={props.visible}
      footer={false}
      onCancel={() => {
        form.resetFields();
        props.showModal(false);
      }}
    >
      <Form
        form={form}
        className="mt-10"
        name="basic"
        onFinish={onUpdateSaveContent}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item<FieldType>
          initialValue={props.categorySave?.title ?? ""}
          label="Tên thư mục"
          name="title"
          rules={[{ required: true, message: "vui lòng điền tên thư mục!" }]}
        >
          <TextArea placeholder="cuộc sống, chữa lành, nội tâm,.." autoSize />
        </Form.Item>
        <div style={{ margin: "24px 0" }} />
        <div style={{ margin: "14px 0" }} />

        <Form.Item<FieldType>
          initialValue={props.categorySave?.description}
          label="Mô tả"
          name="description"
        >
          <TextArea
            placeholder="một ngày mới bắt đầu là điều giản đơn để động lực"
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </Form.Item>

        <Button loading={loading} htmlType="submit">
          Cập nhật
        </Button>
      </Form>
    </Modal>
  );
}
