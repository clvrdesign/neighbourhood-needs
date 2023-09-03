import { useState } from "react";
import { subtleSecurity } from "utils/subtleSecurity.js";


await subtleSecurity.constructor("importKey")();
function useSecureLocalStorage(key, initialValue) {
  const [currentLocalStorage, setCurrentLocalStorage] = useState(() =>
    getLocalStorage(key, initialValue)
  );

    async function getLocalStorage(key, initialValue) {
    const itemFromStorage = await subtleSecurity.constructor("getLocalStorage")(
      key
    );
    return itemFromStorage ? itemFromStorage : initialValue;
  }

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

export { useSecureLocalStorage };
