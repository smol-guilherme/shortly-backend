import bcrypt from "bcrypt";

export function encryptData(req, res, next) {
  const password = res.locals.dbData[2][1];
  const hashPassword = bcrypt.hashSync(password, 10);
  res.locals.dbData.splice(3, 1);
  res.locals.dbData[2].splice(1, 1, hashPassword);
  next();
}
