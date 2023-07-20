import { getCurrentBrowserFingerPrint } from "@clickwithclark/broprint.js/lib/UMD/index.js";
import {subtleSecurity} from 'utils/subtleSecurity'
export async function generateGuestFingerprint() {

  const currentFingerprint = await getCurrentBrowserFingerPrint();

  // let userGFp = await JSON.parse(localStorage.getItem("NNGFP"));
  let userGFp = await subtleSecurity().getLocalStorage("NNGFP");

  
  if (!userGFp) {
    userGFp = currentFingerprint;
    return subtleSecurity().setLocalStorage("NNGFP",userGFp);
  }
  
  //check if user changed values manually and override the changes

  if (!(userGFp === currentFingerprint)) {
    return subtleSecurity().setLocalStorage("NNGFP",currentFingerprint);
  }
}
