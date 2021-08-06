import API from "../api/api";
import crypto from "./crypto";

export const registration = async data => {
  console.log(data);
  const { password } = data;

  const wrappingKey = await crypto.generateWrappingKey(password);
  const signingKey = await crypto.generateSigningKey(); // key-pair

  console.log("wrappingKey", wrappingKey);
  console.log("signingKey", signingKey);

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
  console.log("Posting", data);

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

export default { registration, login };
