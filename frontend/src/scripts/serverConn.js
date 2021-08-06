import API from "../api/api";
import {
  generateWrappingKey,
  generateSigningKey,
  wrapKey,
  exportKeyPair,
} from "./crypto";

export const registration = async data => {
  console.log(data);
  const { password } = data;

  const wrappingKey = await generateWrappingKey(password);
  const signingKey = await generateSigningKey(); // key-pair
  console.log(signingKey);

  // Wrap private key and store wrapped key and iv (for AES-GCM)
  const wrappedPrivateKey = await wrapKey(wrappingKey, signingKey.privateKey);
  console.log("yes");

  // Export key-pair to store in database as string
  const exportedSigningPair = await exportKeyPair(
    wrappedPrivateKey,
    signingKey.publicKey
  );

  console.log("exportedSigningPair");

  data["signingKey"] = exportedSigningPair;
  console.log("Posting", data);

  await API.post("/register", data);
};

export default { registration };
