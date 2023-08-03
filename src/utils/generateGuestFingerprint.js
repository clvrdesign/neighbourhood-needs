import { getCurrentBrowserFingerPrint } from "@clickwithclark/broprint.js/lib/UMD/index.js";
import { subtleSecurity } from "utils/subtleSecurity";

// simulate user auth and assigned a key
const USER_KEY = "acaRroIrqyP0iL_Kuja3v6Qkb8lE_gT4XxI6f4x86L8";
export async function generateGuestFingerprint() {
  //generate a key for new user

  //skip keygen for test faze, use USER_KEY
  await subtleSecurity.constructor("importKey")(USER_KEY);

  const currentFingerprint = await getCurrentBrowserFingerPrint();

  let userGFp = await subtleSecurity.constructor("getLocalStorage")("NNGFP");

  if (!userGFp) {
    userGFp = currentFingerprint;
    return subtleSecurity.constructor("setLocalStorage")("NNGFP", userGFp);
  }

  //check if user changed values manually and override the changes

  if (!(userGFp === currentFingerprint)) {
    return subtleSecurity
      .constructor("setLocalStorage")("NNGFP", currentFingerprint);
  }
}
