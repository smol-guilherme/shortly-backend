import connection from "../database/postgresdb.js";
import { passwordMatch } from "../handlers/authHandler.js";
import tableSelect from "../handlers/tableHandler.js";
import tokenHandler from "../handlers/tokenHandler.js";

export async function registerUser(req, res) {
  const table = tableSelect(res.locals.reqPath);
  try {
    const queryData = res.locals.dbData.join().split(",").filter((i, id)=> id%2!==0);
    const queryString = `
    INSERT INTO ${table}
    (name, email, password) 
    VALUES
    ($1, $2, $3);
    `;
    const { rowCount } = await connection.query(queryString, queryData);
    if(rowCount!==0) {
      res.status(201).send("OK");
    }
    return;
  } catch (err) {
    if(err.code==='23505') {
      res.status(409).send();
      return;
    }
    res.status(400).send();
    return;
  }
}

export async function userLogin(req, res) {
  const table = tableSelect(res.locals.reqPath);
  try {
    const queryData = res.locals.dbData.join().split(",").filter((i, id)=> id%2!==0);
    const queryString=`
    SELECT email, password
    FROM ${table}
    WHERE email=$1
    `;
    const { rows: response } = await connection.query(queryString, [...queryData.splice(0,1)]);
    if(passwordMatch(queryData[0], response[0].password)) {
      const token = tokenHandler(response[0])
      res.status(200).send(token);
      return;
    } else {
      res.status(401).send();
      return;
    }
  } catch (err) {
    res.status(401).send();
    return;
  }
}