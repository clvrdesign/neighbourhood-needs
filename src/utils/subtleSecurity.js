/**
 * Provides very lite security for local storage
 * not intended for important data only to obfuscate
 * data in local storage.
 *
 * @function subtleSecurity
 * @param  {type} function Security IIFE that create subtleSecurity object
 * @return {Object} subtleSecurity object
 */

const security = (function () {
  let cipher;
  let iv;
  const DEFAULT_KEY = "acaRroIrqyP0iL_Kuja3v6Qkb8lE_gT4XxI6f4x86L8";

  async function importKey(key = DEFAULT_KEY) {
    cache.yourKey = await window.crypto.subtle.importKey(
      "jwk",
      {
        kty: "oct",
        k: key,
        alg: "A256GCM",
        ext: true,
      },
      {
        name: "AES-GCM",
      },
      true,
      ["encrypt", "decrypt"]
    );

    return cache.yourKey;
  }
  async function exportKey() {
    const keyToExport = await getKey();
    const unserializedKey = await window.crypto.subtle.exportKey(
      "jwk",
      keyToExport
    );
    const { k } = unserializedKey;
    return k;
  }

  async function generateKey() {
    return window.crypto.subtle.generateKey(
      {
        name: "AES-GCM",
        length: 256,
      },
      true,
      ["encrypt", "decrypt"]
    );
  }

  async function getKey() {
    if (!cache.yourKey) {
      cache.yourKey = await generateKey();
    }
    return cache.yourKey;
  }
  async function rotateKey() {
    cache.yourKey = await generateKey();
    const newKey = await exportKey();
    return newKey;
  }

  async function initialize() {
    await getKey();
    return this;
  }

  function generateIv() {
    return window.crypto.getRandomValues(new Uint8Array(12));
  }

  function encode(data) {
    const encoder = new TextEncoder();
    return encoder.encode(data);
  }

  function decode(bytestream) {
    const decoder = new TextDecoder();
    return decoder.decode(bytestream);
  }

  function pack(buffer) {
    return window.btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)));
  }

  function unpack(packed) {
    const string = window.atob(packed);
    const bufferView = Uint8Array.from(string, (char) => char.charCodeAt(0));
    return bufferView.buffer;
  }

  async function encrypt(data) {
    try {
      const key = cache.yourKey;
      const encoded = encode(data);
      iv = generateIv();
      cipher = await window.crypto.subtle.encrypt(
        {
          name: "AES-GCM",
          iv,
        },
        key,
        encoded
      );
    } catch (error) {
      console.error("Error in encryption module");
    }

    return this;
  }

  async function decrypt(cipher, key, iv) {
    const encoded = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv,
      },
      key,
      cipher
    );

    return decode(encoded);
  }

  async function setLocalStorage(identifier, data) {
    // Encrypt message
    await encrypt(JSON.stringify(data));

    // Pack and transmit
    await localStorage.setItem(
      identifier,
      JSON.stringify({
        0: pack(cipher),
        1: pack(iv),
      })
    );
  }
  async function getLocalStorage(identifier) {
    // Decrypt message
    const key = cache.yourKey;
    const encryptedData = JSON.parse(localStorage.getItem(identifier));
    if (!encryptedData) {
      return null;
    }
    try {
      const decryptedData = await decrypt(
        unpack(encryptedData[0]),
        key,
        unpack(encryptedData[1])
      );
      return JSON.parse(decryptedData);
    } catch (error) {
      console.error(
        "Decryption Error, most likely key not generated\nor key mismatched\nor storage identifier not submitted"
      );
    }
  }
  const cache = {
    encrypt,
    decrypt,
    setLocalStorage,
    getLocalStorage,
    exportKey,
    importKey,
    rotateKey,
  };

  return function () {
    if (arguments.length === 1) {
      return cache[arguments[0]] ?? getKey();
    }
    if (arguments.length === 2) {
      cache[arguments[0]] = arguments[1];
    }
  };
})();

const subtleSecurity = new security();

export { subtleSecurity };
