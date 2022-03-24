import bcrypt from "bcrypt";

export const validatePassword = async (
  currPassword: any,
  hashPassword: any
) => {
  const isValid: any = bcrypt.compareSync(currPassword, hashPassword);
  return isValid;
};
