import { getCurrentBrowserFingerPrint } from "@clickwithclark/broprint.js/lib/UMD/index.js";
export async function generateGuestFingerprint() {

  const currentFingerprint = await getCurrentBrowserFingerPrint();

  let userGFp = await JSON.parse(localStorage.getItem("NNGFP"));

  if (!userGFp) {
    userGFp = currentFingerprint;
    return localStorage.setItem("NNGFP", JSON.stringify(userGFp));
  }

  //check if user changed values manually and override the changes

  if (!(userGFp === currentFingerprint)) {
    return localStorage.setItem("NNGFP", JSON.stringify(currentFingerprint));
  }
}
