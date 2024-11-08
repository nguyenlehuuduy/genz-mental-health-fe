"use server";

import { RegisterRequest, registerAccount } from "@/service/accountService";
import {
  ERROR_EMAIL_FORMAT,
  ERROR_EMAIL_NULL,
  ERROR_NAME_NULL,
  ERROR_NAME_SHORT,
  ERROR_PASSWORD_LONG,
  ERROR_PASSWORD_NOT_SAME,
  ERROR_PASSWORD_NULL,
  ERROR_PASSWORD_SHORT,
} from "@/util/TextContants";
import { redirect } from "next/navigation";
import { z } from "zod";

interface ValidateRegisterType {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface ActionRegisterState {
  validate?: ValidateRegisterType;
  success?: boolean;
}

const schema = z
  .object({
    fullName: z.string({ invalid_type_error: ERROR_NAME_NULL }),
    email: z
      .string({ invalid_type_error: ERROR_EMAIL_NULL })
      .email(ERROR_EMAIL_FORMAT),
    password: z
      .string({ invalid_type_error: ERROR_PASSWORD_NULL })
      .min(8, ERROR_PASSWORD_SHORT)
      .max(20, ERROR_PASSWORD_LONG),
    confirmPassword: z.string({ invalid_type_error: ERROR_PASSWORD_NULL }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: ERROR_PASSWORD_NOT_SAME,
    path: ["confirmPassword"],
  });

export async function register(_: ActionRegisterState, formData: FormData) {
  const validatedFields = schema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      validate: {
        fullName: validatedFields.error.formErrors.fieldErrors.fullName?.[0],
        email: validatedFields.error.formErrors.fieldErrors.email?.[0],
        password: validatedFields.error.formErrors.fieldErrors.password?.[0],
        confirmPassword:
          validatedFields.error.formErrors.fieldErrors.confirmPassword?.[0],
      },
      success: false,
    };
  }
  const fullName = formData.get("fullName")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  const body: RegisterRequest = {
    fullName: fullName!,
    email: email!,
    password: password!,
  };

  const registerResult = await registerAccount(body);

  if (registerResult && registerResult?.status >= 400) {
    return {
      validate: {
        email: registerResult?.message,
      },
    };
  } else {
    // redirect("/landingpage");
    return {
      success: true,
    };
  }
}
