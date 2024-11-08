import { callGetRequest } from "./apiService";

export async function getListSoundSendSorrow() {
  try {
    const res = await callGetRequest(
      "/sound-system?typeSoundId=genzmth@786e342ade",
    );
    return res.response;
  } catch (error) {
    console.log(error);
  }
}
