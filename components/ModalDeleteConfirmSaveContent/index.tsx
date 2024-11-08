"use client";

import React, { useState } from "react";
import { Button, Modal } from "antd";
import { deleteCategorySave } from "./action";

type PropsComponent = {
  showModal: (flg: boolean) => void;
  visible: boolean;
  idCateSave?: string;
};

export default function ModalDeleteSaveContent(props: PropsComponent) {
  const [loading, setLoading] = useState<boolean>(false);
  const onDeleteSaveContent = async () => {
    setLoading(true);
    props.idCateSave && (await deleteCategorySave(props.idCateSave));
    setLoading(false);
    props.showModal(false);
  };

  return (
    <Modal
      title="Xác nhận xóa thư mục này"
      open={props.visible}
      footer={false}
      onCancel={() => props.showModal(false)}
    >
      <div className="mt-3">
        <p>
          Tất cả các baì viết đã lưu trong thư mục này sẽ chuyển trang thư mục
          Không có tiêu đề
        </p>
        <Button
          loading={loading}
          htmlType="button"
          className="mt-6"
          onClick={onDeleteSaveContent}
        >
          xác nhận xóa
        </Button>
      </div>
    </Modal>
  );
}
