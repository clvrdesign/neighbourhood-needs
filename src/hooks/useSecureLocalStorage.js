import { useState } from "react";
import { subtleSecurity } from "utils/subtleSecurity.js";
function useSecureLocalStorage(key, initialValue) {
    const [currentLocalStorage, setCurrentLocalStorage] = useState(() =>
      getLocalStorage(key, initialValue)
    );


     const EncryptLocalStorage = async (value) => {
       // Check if function
       const valueToStore =
         value instanceof Function ? value(currentLocalStorage) : value;
       // Set to state
       setCurrentLocalStorage(value);
       // Set to local storage
      await subtleSecurity().setLocalStorage(key, valueToStore);
     };


  return [currentLocalStorage, EncryptLocalStorage]
}
async function getLocalStorage(key, initialValue) {
  const itemFromStorage = await subtleSecurity().getLocalStorage(key);
  return itemFromStorage ? itemFromStorage : initialValue;
}
export  {useSecureLocalStorage};

