import { captureDateDetails } from "./captureDateDetails.js";
import { fetchIpAddress } from "./fetchIpAddress.js";
export async function collectUserData() {
  //collect ip address

  //collect date

  return {
    userID: await JSON.parse(localStorage.getItem("NNGID")),
    dateRegistered: await captureDateDetails().basic,
    ipAddressRegistered: await fetchIpAddress(),
    fingerprintRegistered: await await JSON.parse(
      localStorage.getItem("NNGFP")
    ),
    isShadowBanned: false, //should be a database lookup here
    isLoggedIN: await !!JSON.parse(localStorage.getItem("isLoggedIN")),
  };
}
