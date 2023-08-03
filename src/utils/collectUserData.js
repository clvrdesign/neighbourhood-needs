import { captureDateDetails } from "./captureDateDetails.js";
import { fetchIpAddress } from "./fetchIpAddress.js";
import { subtleSecurity } from "utils/subtleSecurity.js";
export async function collectUserData() {
  // simulate user auth and assigned a key
  const USER_KEY = "acaRroIrqyP0iL_Kuja3v6Qkb8lE_gT4XxI6f4x86L8";
  await subtleSecurity.constructor("importKey")(USER_KEY);
  subtleSecurity.constructor("getLocalStorage")("NNGID");
  return {
    userID: await subtleSecurity.constructor("getLocalStorage")("NNGID"),
    dateRegistered: await captureDateDetails().basic,
    ipAddressRegistered: await fetchIpAddress(),
    fingerprintRegistered: await subtleSecurity.constructor("getLocalStorage")(
      "NNGFP"
    ),
    isShadowBanned: false, //should be a database lookup here
    isLoggedIN: await !!JSON.parse(localStorage.getItem("isLoggedIN")),
  };
}
