import API from "../api/api";
import crypto from "./crypto";

export const registration = async data => {
  const { password } = data;

  const wrappingKey = await crypto.generateWrappingKey(password);
  const signingKey = await crypto.generateSigningKey(); // key-pair

  // Wrap private key and store wrapped key and iv (for AES-GCM)
  const wrappedPrivateKey = await crypto.wrapKey(
    wrappingKey.key,
    signingKey.privateKey
  );

  // Export key-pair to store in database as string
  const exportedSigningPair = await crypto.exportSigningKeys(
    wrappedPrivateKey,
    signingKey.publicKey
  );

  data["signingKey"] = exportedSigningPair;
  data["wrappingKeySalt"] = wrappingKey.salt;

  await API.post("/register", data);
};

export const login = async data => {
  let password = data.password;
  let response = await API.post("/login", data, { withCredentials: true });
  const { publicName, id, keys } = response.data;

  let wrappingKey = await crypto.getWrappingKey(password, keys.wrappingKeySalt);
  let signingKeys = await crypto.importSigningKeys(
    wrappingKey,
    keys.signingKeys
  );

  return { publicName, id, wrappingKey, signingKeys };
};

export const createChat = async toEmail => {
  let response = await API.post(
    "/chats",
    { toEmail: toEmail },
    { withCredentials: true }
  );
  return response.data;
};

export default { registration, login, createChat };
