const subtleSecurity = (function Security() {
    const cache = {};
  
    async function generateKey() {
      return window.crypto.subtle.generateKey(
        {
          name: 'AES-GCM',
          length: 256,
        },
        true,
        ['encrypt', 'decrypt']
      );
    }
  
    async function getKey() {
      if (!cache.yourKey) {
        cache.yourKey = await generateKey();
      }
      return cache.yourKey;
    }
  
    (async function initialize() {
      await getKey();
    })();
  
    function generateIv() {
      return window.crypto.getRandomValues(new Uint8Array(12));
    }
  
    async function encrypt(data, key) {
      const encoded = encode(data);
      const iv = generateIv();
      const cipher = await window.crypto.subtle.encrypt(
        {
          name: 'AES-GCM',
          iv,
        },
        key,
        encoded
      );
  
      return {
        cipher,
        iv,
      };
    }
  
    function encode(data) {
      const encoder = new TextEncoder();
      return encoder.encode(data);
    }
  
    function pack(buffer) {
      return window.btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)));
    }
  
    function unpack(packed) {
      const string = window.atob(packed);
      const bufferView = Uint8Array.from(string, (char) => char.charCodeAt(0));
      return bufferView.buffer;
    }
  
    function decode(bytestream) {
      const decoder = new TextDecoder();
      return decoder.decode(bytestream);
    }
  
    return function () {
      if (arguments.length === 1) {
        // Just return the Promise directly
        return cache[arguments[0]] ?? getKey();
      }
      if (arguments.length === 2) {
        cache[arguments[0]] = arguments[1];
      }
  
      return {
        encrypt,
        async decrypt(cipher, key, iv) {
          // Move the decrypt function inside the closure
          const encoded = await window.crypto.subtle.decrypt(
            {
              name: 'AES-GCM',
              iv,
            },
            key,
            cipher
          );
          return decode(encoded);
        },
        pack,
        unpack,
        async setLocalStorage(identifier, data) {
          // Encrypt message
          const key = await subtleSecurity('yourKey');
          const { cipher, iv } = await subtleSecurity().encrypt(data, key);
  
          // Pack and transmit
          localStorage.setItem(
            identifier,
            JSON.stringify({
              payload: subtleSecurity().pack(cipher),
              nonce: subtleSecurity().pack(iv),
            })
          );
        },
        async getLocalStorage(identifier) {
          // Decrypt message
          const key = await subtleSecurity('yourKey');
          const encryptedData = JSON.parse(localStorage.getItem(identifier));
          if (!encryptedData) {
                return null
          }
          const decryptedData = await subtleSecurity().decrypt(
            subtleSecurity().unpack(encryptedData.payload),
            key,
            subtleSecurity().unpack(encryptedData.nonce)
          );
          return await decryptedData;
        },
      };
    };
  })();

  export {subtleSecurity};