import { getListSoundSendSorrow } from "@/service/soundService";
import dynamic from "next/dynamic";

const SendSorrow = dynamic(() => import("../../../../components/SendSorrow"), {
  ssr: false,
});

export default async function SendSorrowPage() {
  const listSound = await getListSoundSendSorrow();

  return <SendSorrow listSound={listSound} />;
}
