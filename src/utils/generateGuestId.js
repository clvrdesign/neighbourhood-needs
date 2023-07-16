import { v4 as generateID } from "uuid";
export async function generateGuestId() {
  

  let userGId = await JSON.parse(localStorage.getItem("NNGID"));

  if (!userGId) {
    userGId = await generateID();
    return localStorage.setItem("NNGID", JSON.stringify(userGId));
  }

 
}
