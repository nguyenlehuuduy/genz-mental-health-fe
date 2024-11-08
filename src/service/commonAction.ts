"use server";

import {
  TargetAccountForCreate,
  createActionTarget,
  getAllActionTargetAccount,
} from "./actionTargetService";

export async function createTarget(targetAccount: TargetAccountForCreate) {
  return await createActionTarget(targetAccount);
}

export async function getAllTarget() {
  return await getAllActionTargetAccount();
}
