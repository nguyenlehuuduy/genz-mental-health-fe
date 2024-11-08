import { callGetRequest, submitMultiForm } from "./apiService";

export interface ImageForResponse {
  fieldname: string;
  originalname: string;
  size: string;
  filename: string;
  mimetype: string;
}

export type ImageForCard = {
  field_name: string;
  original_name: string;
  size: string;
  file_name: string;
  mime_type: string;
};

export type ImageForPost = {
  image: any;
  permissionPostId: string;
};

export async function uploadImage(
  image: ImageForPost,
): Promise<ImageForCard | undefined> {
  const formData = new FormData();
  formData.append("image", image.image);
  formData.append("permissionPostId", image.permissionPostId);
  const result = await submitMultiForm("/file/upload-posts", formData);
  const data: ImageForResponse = result.response;
  if (result.status === 201) {
    return {
      field_name: data.fieldname,
      file_name: data.filename,
      mime_type: data.mimetype,
      original_name: data.originalname,
      size: data.size,
    };
  }
}

interface ImageGalleryForResponse {
  id: string;
  path: string;
  accountId: string;
  postId: string;
}

export type ImageGalleryForCard = {
  id: string;
  path: string;
  account_id: string;
  post_id: string;
};

export async function getAllImagePublicByAccount(
  idAccount: string,
): Promise<Array<ImageGalleryForCard> | undefined> {
  try {
    const res = await callGetRequest(
      `/images/posts/${idAccount}`,
      "get-valid-image-public-account",
    );
    if (res.status === 200) {
      const data: Array<ImageGalleryForResponse> = res.response;
      const result: Array<ImageGalleryForCard> = [];
      for (const item of data) {
        result.push({
          account_id: item.accountId,
          id: item.id,
          path: `${process.env.NEXT_PUBLIC_API_BASE_URL}${item.path}`,
          post_id: item.postId,
        });
      }
      return result;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getAllImagePublicByMyself(): Promise<
  Array<ImageGalleryForCard> | undefined
> {
  try {
    const res = await callGetRequest(
      `/images/posts/myself`,
      "get-valid-image-myself-account",
    );
    if (res.status === 200) {
      const data: Array<ImageGalleryForResponse> = res.response;
      const result: Array<ImageGalleryForCard> = [];
      for (const item of data) {
        result.push({
          account_id: item.accountId,
          id: item.id,
          path: `${process.env.NEXT_PUBLIC_API_BASE_URL}${item.path}`,
          post_id: item.postId,
        });
      }
      return result;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function uploadAvataAccount(
  image: any,
): Promise<ImageForCard | undefined> {
  try {
    const formData = new FormData();
    formData.append("image", image);
    const result = await submitMultiForm("/file/upload-avata", formData);
    const data: ImageForResponse = result.response;
    if (result.status === 201) {
      return {
        field_name: data.fieldname,
        file_name: data.filename,
        mime_type: data.mimetype,
        original_name: data.originalname,
        size: data.size,
      };
    }
  } catch (error) {
    console.error(error);
  }
}

export async function uploadBannerAccount(
  image: any,
): Promise<ImageForCard | undefined> {
  try {
    const formData = new FormData();
    formData.append("image", image);
    const result = await submitMultiForm("/file/upload-banner", formData);
    const data: ImageForResponse = result.response;
    if (result.status === 201) {
      return {
        field_name: data.fieldname,
        file_name: data.filename,
        mime_type: data.mimetype,
        original_name: data.originalname,
        size: data.size,
      };
    }
  } catch (error) {
    console.error(error);
  }
}
