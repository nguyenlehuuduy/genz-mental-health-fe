"use server"

import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/lib/constants";
import { uploadImagesDiary } from "@/service/diaryService"
import { z } from "zod";
import { revalidateTag } from "next/cache";
interface ValidateFromType {
  image?: string;
}

export type ActionImageDiaryState = {
  validate?: ValidateFromType;
  success?: boolean;
};

const schema = z.object({
  image: z
    .any()
    .refine((file) => {
      if (file.size === 0 || file.name === undefined) return false;
      else return true;
    }, "Chia sẻ cho chúng tôi tấm hình của bạn nhé !")

    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "File không hợp lệ",
    )
    .refine((file) => file.size <= MAX_FILE_SIZE, `Ảnh có dung lượng quá lớn`),
});

export async function submitFormImagesDiary(_: ActionImageDiaryState, formData: FormData) {

  const data = Object.fromEntries(formData);
  const validatedFields = schema.safeParse({
    image: data.image,
    diaryId: data.diaryId
  });
  if (!validatedFields.success) {
    return {
      validate: {
        image: validatedFields.error.formErrors.fieldErrors.image?.[0],
      },
      success: false,
    };
  }
  const diaryId = formData.getAll("diaryId").toString()
  const image = formData.getAll("image") as File[];
  const result = await uploadImagesDiary({ idDiary: diaryId, image: image })
  if (result) {
    revalidateTag("get-list-image-diary");
    return {
      success: true,
    };
  }
  return {
    success: false,
  };
}
