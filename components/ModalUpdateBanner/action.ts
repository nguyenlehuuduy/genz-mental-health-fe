"use server";

import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/lib/constants";
import { uploadBannerAccount } from "@/service/imageService";
import { revalidateTag } from "next/cache";
import { z } from "zod";

interface ValidateFromType {
  image?: string;
}

export type ActionUploadBannerState = {
  validate?: ValidateFromType;
  success?: boolean;
  banner?: string;
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

export async function uploadBanner(
  _: ActionUploadBannerState,
  formData: FormData,
) {
  const data = Object.fromEntries(formData);
  const validatedFields = schema.safeParse({
    image: data.image,
  });
  if (!validatedFields.success) {
    return {
      validate: {
        image: validatedFields.error.formErrors.fieldErrors.image?.[0],
      },
      success: false,
    };
  }
  const image = formData.get("image") as File;
  const rs = await uploadBannerAccount(image);

  revalidateTag("get-detail-myself-profile");
  return {
    success: !!rs,
    banner: rs?.file_name,
  };
}
