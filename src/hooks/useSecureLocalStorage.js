import { useState } from "react";
import { subtleSecurity } from "utils/subtleSecurity.js";

// simulate user auth and assigned a key
const USER_KEY = "acaRroIrqyP0iL_Kuja3v6Qkb8lE_gT4XxI6f4x86L8";
await subtleSecurity.constructor("importKey")(USER_KEY);
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
    await subtleSecurity.constructor("setLocalStorage")(key, valueToStore);
  };

  return [currentLocalStorage, EncryptLocalStorage];
}
async function getLocalStorage(key, initialValue) {
  const itemFromStorage = await subtleSecurity.constructor("getLocalStorage")(
    key
  );
  return itemFromStorage ? itemFromStorage : initialValue;
}
export { useSecureLocalStorage };
