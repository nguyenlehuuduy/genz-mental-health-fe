"use server";

import { COOKIE_ACCESS_TOKEN_KEY } from "@/lib/constants";
import { setCookie } from "@/lib/cookies";
import {
  LoginRequest,
  getLoginAccount,
  loginAccount,
} from "@/service/accountService";
import {
  ERROR_ACCOUNT_VALID,
  ERROR_EMAIL_FORMAT,
  ERROR_EMAIL_NULL,
  ERROR_PASSWORD_NULL,
} from "@/util/TextContants";
import { redirect } from "next/navigation";
import { z } from "zod";

interface ValidateFromType {
  email?: string;
  password?: string;
}

export interface ActionLoginState {
  validate?: ValidateFromType;
  success?: boolean;
}

const schema = z.object({
  email: z
    .string({ invalid_type_error: ERROR_EMAIL_NULL })
    .min(1, ERROR_EMAIL_NULL)
    .email(ERROR_EMAIL_FORMAT),
  password: z
    .string({ invalid_type_error: ERROR_PASSWORD_NULL })
    .min(8, ERROR_PASSWORD_NULL)
    .max(20, ERROR_PASSWORD_NULL),
});

export async function login(_: ActionLoginState, formData: FormData) {
  const validatedFields = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validatedFields.success) {
    return {
      validate: {
        email: validatedFields.error.formErrors.fieldErrors.email?.[0],
        password: validatedFields.error.formErrors.fieldErrors.password?.[0],
      },
      success: false,
    };
  }
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  const body: LoginRequest = {
    email: email!,
    password: password!,
  };
  const loginResult = await loginAccount(body);

  if (loginResult) {
    setCookie(COOKIE_ACCESS_TOKEN_KEY, loginResult.accessToken);
    const rs = await getLoginAccount();
    // rs && redirect("/home");
    return {
      success: true
    }
  }
  return {
    validate: {
      email: ERROR_ACCOUNT_VALID,
    },
  };
}
