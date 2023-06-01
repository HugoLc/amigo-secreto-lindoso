import CryptoJS from "crypto-js";

export const encryptPassword = (
  password: string,
  secretKey: string
): string => {
  const encryptedPassword = CryptoJS.AES.encrypt(
    password,
    secretKey
  ).toString();
  return encryptedPassword;
};
