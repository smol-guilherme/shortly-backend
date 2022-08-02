import bcrypt from "bcrypt";

export default async function encryptData(req, res, next) {
  const password = res.locals.dbData[2][1];
  const hashPassword = bcrypt.hashSync(password, 10);
  res.locals.dbData.splice(3, 1);
  res.locals.dbData[2].splice(1, 1, hashPassword);
  next();
}

// a
// Array(4) [ (2) […], (2) […], (2) […], (2) […] ]

// a.join().split(",")
// Array(8) [ "name", "João", "email", "joao@driven.com.br", "password", "driven", "confirmPassword", "driven" ]
