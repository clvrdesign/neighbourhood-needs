import { v4 as generateID } from "uuid";
import {subtleSecurity} from 'utils/subtleSecurity'
export async function generateGuestId() {
  


  let userGId = await subtleSecurity().getLocalStorage("NNGID");
  
  if (!userGId) {
    userGId = await generateID();

    return subtleSecurity().setLocalStorage("NNGID",userGId)
  }

 
}
