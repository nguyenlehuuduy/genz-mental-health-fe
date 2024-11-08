"use client";

import { Button, Input, Modal, Spin } from "antd";
import { useFormState } from "react-dom";
import { ActionRoomForCreateState, createRoom } from "./action";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type PropsComponent = {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
};
const defaultData = {
  nameRoom: "",
};
const initialState: ActionRoomForCreateState = {
  validate: defaultData,
  success: false,
};

export default function ModalCreateRoomChatBot(props: PropsComponent) {
  const [loading, setLoading] = useState<boolean>(false);
  const [{ validate, success, idRoom }, formAction] = useFormState(
    createRoom,
    initialState,
  );
  const routes = useRouter();
  useEffect(() => {
    if (success) {
      routes.replace(`/chat-bot?idBotRoom=${idRoom}`);
      props.handleCancel();
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);
  return (
    <Modal
      title="Trò chuyện với Tâm An"
      open={props.isModalOpen}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      footer={false}
    >
      <form action={formAction} onSubmit={() => setLoading(true)}>
        <p className="mt-5 pb-3">Chủ đề của cuộc trò chuyện</p>
        <Input
          disabled={loading}
          placeholder="Hãy tạo mới 1 cuộc trò chuyện với Tâm An nhé"
          name="nameRoom"
        />
        <p className="invalid_err">{validate?.nameRoom}</p>
        <div className="flex justify-center pt-2">
          <Button
            loading={loading}
            className="text-white px-6 align-content: center bg-blue-600 cursor-pointer text-center font-medium mt-6 hover:bg-blue-700 transition-all duration-200"
            htmlType="submit"
          >
            Tạo
          </Button>
        </div>
        {loading && (
          <Spin tip="Đang khởi tạo..." size="small">
            <p className="text-[#0F52BA] text-center">Tớ đang tạo, chờ 1 tí nhé</p>
          </Spin>
        )}
      </form>
    </Modal>
  );
}
