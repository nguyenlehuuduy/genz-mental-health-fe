"use client";

import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Radio, RadioChangeEvent, Space } from "antd";
import {
  CategorySaveForResponse,
  getCategorySaveByAccount,
} from "@/service/categorySaveService";
import { createACateSave, saveContent } from "./action";

type PropsComponent = {
  showModal: (flg: boolean) => void;
  setIsSave: (flg: boolean) => void;
  visible: boolean;
  idContent: string;
  typeContent: "post" | "postShare" | "blog";
};

export default function ModalSaveContent(props: PropsComponent) {
  const [loading, setLoading] = useState<boolean>(false);
  const [cateSelected, setCateSelected] = useState<string>();
  const [additionalCateSave, setAdditionalCateSave] = useState<string>("");
  const [listCateSave, setListCateSave] =
    useState<Array<CategorySaveForResponse>>();

  useEffect(() => {
    getCategorySaveByAccount().then((rs) => {
      if (rs) {
        setListCateSave(rs);
      }
    });
  }, []);

  const onChange = (e: RadioChangeEvent) => {
    setCateSelected(e.target.value);
  };

  const handleTypeContent = async (idCateSave: string) => {
    if (props.typeContent === "post") {
      return await saveContent({
        categorySaveId: idCateSave,
        postId: props.idContent ?? "",
      });
    } else if (props.typeContent === "blog") {
      return await saveContent({
        categorySaveId: idCateSave,
        blogId: props.idContent ?? "",
      });
    } else if (props.typeContent === "postShare") {
      return await saveContent({
        categorySaveId: idCateSave,
        postShareId: props.idContent ?? "",
      });
    }
    return false;
  };
  const handleSaveContent = async () => {
    setLoading(true);
    if (cateSelected === "add_more_genz_mth") {
      await createACateSave({
        title: additionalCateSave,
      }).then(async (rs) => {
        if (rs) {
          await handleTypeContent(rs.id);
        }
      });
    } else {
      await handleTypeContent(cateSelected ?? "");
    }
    props.setIsSave(true);
    setLoading(false);
    props.showModal(false);
  };

  return (
    <Modal
      title="Lưu bài viết vào..."
      open={props.visible}
      footer={false}
      onCancel={() => props.showModal(false)}
    >
      <div className="my-3">
        <Radio.Group onChange={onChange} value={cateSelected}>
          <Space direction="vertical">
            {listCateSave?.map((item, index) => (
              <Radio key={index} value={item.id}>
                {item.title}
              </Radio>
            ))}

            <Radio value={"add_more_genz_mth"}>
              Tạo thư mục khác
              {cateSelected === "add_more_genz_mth" ? (
                <Input
                  style={{ width: 200, marginLeft: 10 }}
                  value={additionalCateSave}
                  onChange={(e) => setAdditionalCateSave(e.target.value)}
                />
              ) : null}
            </Radio>
          </Space>
        </Radio.Group>
      </div>
      <Button onClick={handleSaveContent} loading={loading}>
        Lưu
      </Button>
    </Modal>
  );
}
