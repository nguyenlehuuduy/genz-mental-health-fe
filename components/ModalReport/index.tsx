"use client";

import { Button, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { callReportPost } from "./action";

type PropsComponent = {
  postId?: string;
  postShareId?: string;
  showModal: () => void;
  openReportFail: () => void;
  openReportSuccess: () => void;
};

const ModalReport = (props: PropsComponent) => {
  const [contentReport, setContentReport] = useState<string>("");

  const handleReportPost = async () => {
    const res = await callReportPost({
      reason: contentReport,
      postId: props.postId && props.postId,
      postShareId: props.postShareId && props.postShareId,
    });

    if (res) {
      props.openReportSuccess();
      props.showModal();
    } else {
      props.openReportFail();
    }
  };

  return (
    <Modal
      title="Báo cáo bài đăng"
      open={true}
      style={{ backgroundColor: "transparent" }}
      width={720}
      onCancel={props.showModal}
      footer={
        <Button
          onClick={() => {
            handleReportPost();
          }}
        >
          Gửi báo cáo
        </Button>
      }
      className="title-modal h-screen overflow-y-auto bg-white rounded-md"
    >
      <div className="mt-3 flex flex-col gap-4">
        <TextArea
          value={contentReport}
          onChange={(e) => setContentReport(e.target.value)}
          rows={6}
          style={{
            border: "none",
          }}
          name="contentText"
          size="large"
          placeholder="Vì sao bạn lại báo cáo bài viết này"
        />
      </div>
    </Modal>
  );
};

export default ModalReport;
