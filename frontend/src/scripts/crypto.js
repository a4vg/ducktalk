import { arrayBufferToBase64, base64ToArrayBuffer } from "./utils";

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
  return {
    key: await window.crypto.subtle.deriveKey(
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
    ),
    salt: arrayBufferToBase64(salt),
  };
};

export const getWrappingKey = async (password, salt) => {
  const keyMaterial = await getKeyMaterial(password);
  salt = new Uint8Array(base64ToArrayBuffer(salt));
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

export const exportSigningKeys = async (privateKey, publicKey) => {
  privateKey["wrappedKey"] = arrayBufferToBase64(privateKey["wrappedKey"]);
  privateKey["iv"] = arrayBufferToBase64(privateKey["iv"]);
  publicKey = await exportPublicSigningKey(publicKey);

  return { publicKey, privateKey };
};

export const importSigningKeys = async (unwrappingKey, signingKeys) => {
  let { key, iv } = signingKeys.privateKey;
  let privateKey = base64ToArrayBuffer(key);
  iv = new Uint8Array(base64ToArrayBuffer(iv));
  privateKey = await unwrapSigningKey(unwrappingKey, privateKey, iv);
  let publicKey = await importPublicSigningKey(signingKeys.publicKey);

  return { publicKey, privateKey };
};

const exportPublicSigningKey = async key => {
  return JSON.stringify(await crypto.subtle.exportKey("jwk", key));
};

const importPublicSigningKey = async key => {
  return crypto.subtle.importKey(
    "jwk",
    JSON.parse(key),
    {
      name: "ECDSA",
      namedCurve: "P-384",
    },
    true, // extractable
    ["verify"]
  );
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

export default {
  generateSigningKey,
  generateWrappingKey,
  getWrappingKey,
  wrapKey,
  unwrapSigningKey,
  exportSigningKeys,
  importSigningKeys,
};
