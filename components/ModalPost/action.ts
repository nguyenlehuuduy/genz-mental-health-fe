"use server";

import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/lib/constants";
import { uploadImage } from "@/service/imageService";
import {
  PostForRequest,
  uploadPost,
} from "@/service/postService";
import { revalidateTag } from "next/cache";
import { z } from "zod";

interface ValidateFromType {
  contentText?: string;
  image?: string;
  permissionPost?: string;
}

export type ActionPostState = {
  validate?: ValidateFromType;
  success?: boolean;
};

const schema = z.object({
  contentText: z
    .string({ invalid_type_error: "Bạn muốn nói điều gì?" })
    .min(1, "Bạn muốn nói điều gì?"),
  permissionPost: z
    .string({ invalid_type_error: "Có lỗi về quyền baì viết" })
    .min(1, "Có lỗi về quyền baì viết"),
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

export async function post(_: ActionPostState, formData: FormData) {
  const data = Object.fromEntries(formData);
  const validatedFields = schema.safeParse({
    contentText: data.contentText,
    image: data.image,
    permissionPost: data.permission
  });
  if (!validatedFields.success) {
    return {
      validate: {
        contentText:
          validatedFields.error.formErrors.fieldErrors.contentText?.[0],
        image: validatedFields.error.formErrors.fieldErrors.image?.[0],
        permissionPost: validatedFields.error.formErrors.fieldErrors.permissionPost?.[0],
      },
      success: false,
    };
  }
  const image = formData.getAll("image") as File[];
  const listImageFileNameUpload: Array<string> = [];
  for (const item of image) {
    const rs = await uploadImage({ image: item, permissionPostId: formData.get("permission")?.toString() ?? "" });
    rs?.file_name && listImageFileNameUpload.push(rs.file_name);
  }
  const payload: PostForRequest = {
    contentText: formData.get("contentText")?.toString() ?? "",
    imagePaths: listImageFileNameUpload,
    permissionPostId: formData.get("permission")?.toString() ?? "",
  };

  const result = await uploadPost(payload);
  revalidateTag("get-valid-post-cache");
  return {
    success: result,
  };
}
