import { arrayBufferToBase64 } from "./utils";

export const generateSigningKey = () => {
  return window.crypto.subtle.generateKey(
    {
      name: "ECDSA",
      namedCurve: "P-384",
    },
    true, // extractable
    ["sign", "verify"]
  );
};

export const generateWrappingKey = async password => {
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const keyMaterial = await getKeyMaterial(password);
  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial, // password as a derived key
    { name: "AES-GCM", length: 256 },
    true, // extractable
    ["wrapKey", "unwrapKey"]
  );
};

export const wrapKey = async (wrappingKey, keyToWrap) => {
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  let wrappedKey = await window.crypto.subtle.wrapKey(
    "jwk",
    keyToWrap,
    wrappingKey,
    {
      name: "AES-GCM",
      iv: iv,
    }
  );
  /* Show decrypted jwk for debugging
  const jwk = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    wrappingKey,
    wrappedKey
  );

  // console.log(new TextDecoder("utf-8").decode(jwk));
  */
  return { iv, wrappedKey };
};

export const unwrapSigningKey = (unwrappingKey, keyToUnwrap, iv) => {
  return window.crypto.subtle.unwrapKey(
    "jwk",
    keyToUnwrap,
    unwrappingKey,
    {
      name: "AES-GCM",
      iv: iv,
    },
    {
      name: "ECDSA",
      namedCurve: "P-384",
    },
    true,
    ["sign"]
  );
};

export const exportKeyPair = async (privateKey, publicKey) => {
  privateKey["wrappedKey"] = arrayBufferToBase64(privateKey["wrappedKey"]);
  privateKey["iv"] = arrayBufferToBase64(privateKey["iv"]);
  publicKey = await exportPublicKey(publicKey);

  return { publicKey, privateKey };
};

const exportPublicKey = async key => {
  return JSON.stringify(await crypto.subtle.exportKey("jwk", key));
};

const getKeyMaterial = password => {
  let enc = new TextEncoder();
  return window.crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveBits", "deriveKey"]
  );
};

// f = async () => {
//   const signKey = await generateSigningKey();
//   const wrappingKey = await generateWrappingKey("mypass");

//   const { wrappedKey, iv } = await wrapKey(wrappingKey, signKey.privateKey);

//   const unwrappedPrivateSignKey = await unwrapSigningKey(
//     wrappingKey,
//     wrappedKey,
//     iv
//   );
//   console.log(unwrappedPrivateSignKey);
//   console.log(signKey.privateKey);
// };
// f();
