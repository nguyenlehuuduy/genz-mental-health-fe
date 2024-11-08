"use client";

import React, { useState } from "react";
import { Button, Modal } from "antd";
import { deleteSaveContent } from "./action";

type PropsComponent = {
  showModal: (flg: boolean) => void;
  visible: boolean;
  idSaveContent: string;
  setIsSave: (flg: boolean) => void;
};

export default function ModalDeleteContentSave(props: PropsComponent) {
  const [loading, setLoading] = useState<boolean>(false);
  const onDeleteContentSave = async () => {
    setLoading(true);
    await deleteSaveContent(props.idSaveContent);
    setLoading(false);
    props.setIsSave(false);
    props.showModal(false);
  };

  return (
    <Modal
      title="Xác nhận xóa lưu bài viết này"
      open={props.visible}
      footer={false}
      onCancel={() => props.showModal(false)}
    >
      <div className="mt-3">
        <p>Bạn có chắc muốn xóa lưu trữ baì viết này</p>
        <Button
          loading={loading}
          htmlType="button"
          className="mt-6"
          onClick={onDeleteContentSave}
        >
          xác nhận xóa
        </Button>
      </div>
    </Modal>
  );
}
