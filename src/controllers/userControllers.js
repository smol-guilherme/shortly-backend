import connection from "../database/postgresdb.js";
import { passwordMatch } from "../handlers/authHandler.js";
import tableSelect from "../handlers/tableHandler.js";
import { tokenHandler } from "../handlers/tokenHandler.js";

export async function registerUser(req, res) {
  const table = tableSelect(res.locals.reqPath);
  try {
    const queryData = res.locals.dbData
      .join()
      .split(",")
      .filter((i, id) => id % 2 !== 0);
    const queryString = `
    INSERT INTO ${table}
    (name, email, password) 
    VALUES
    ($1, $2, $3);
    `;
    const { rowCount } = await connection.query(queryString, queryData);
    if (rowCount !== 0) {
      res.status(201).send("OK");
    }
    return;
  } catch (err) {
    if (err.code === "23505") {
      res.status(409).send();
      return;
    }
    res.status(400).send();
    return;
  }
}

async function dbAccess(res, table, queryData) {
  try {
    const queryString = `
    SELECT id, email, password
    FROM ${table}
    WHERE email=$1;
    `;
    const { rows: response } = await connection.query(queryString, queryData.splice(1, 1));
    return response;
  } catch (err) {
    res.status(401).send();
    return;
  }
}

export async function userLogin(req, res) {
  const table = tableSelect(res.locals.reqPath);
  const queryData = res.locals.dbData
    .join()
    .split(",")
    .filter((i, id) => id % 2 !== 0);
  const response = await dbAccess(res, table, queryData);
  if (passwordMatch(queryData[1], response[0].password)) {
    const token = tokenHandler(response[0]);
    res.status(200).send(token);
    return;
  } else {
    res.status(401).send();
    return;
  }
}

export async function getUser(req, res, next) {
  try {
    const queryData = res.locals.userToken
    const table = 'users';
    const response = await dbAccess(res, table, queryData);
    if (response.length === 0) {
      res.status(404).send();
      return;
    }
    res.locals.uid = response[0].id;
    next();
  } catch (err) {
    res.status(401).send();
    return;
  }
}

export async function getUserData(req, res) {
  try {
    const queryData = [res.locals.uid];
    const table = tableSelect(res.locals.reqPath);
    const queryString=`
    SELECT users.id, name, 
    SUM("visitCount") "visitCount",
    ARRAY
    (
      SELECT json_build_object(
        'id', id, 
        'shortUrl', "shortUrl", 
        'url', url, 
        'visitCount', "visitCount"
      ) FROM urls WHERE "userId"=$1
    ) AS "shortenedUrls"
    FROM ${table} JOIN urls ON users.id=urls."userId" 
    WHERE "userId"=$1
    GROUP BY users.id, name;
    `
    const { rows: response } = await connection.query(queryString, queryData);
    if (response.length === 0) {
      res.status(404).send();
      return;
    }
    res.status(200).send(response[0]);
    return;
  } catch (err) {
    res.status(401).send();
    return;
  }
}

export async function getRankings(req, res) {
  try {
    const table = tableSelect(res.locals.reqPath);
    const queryString=`
    SELECT users.id, name, 
    COUNT("url") "linksCount",
    COALESCE(SUM("visitCount"), 0) "visitCount"
    FROM ${table} LEFT JOIN urls ON users.id=urls."userId" 
    GROUP BY users.id, name
    ORDER BY "visitCount" ASC
    LIMIT 10 
    ;`;
    const { rows: response } = await connection.query(queryString);
    if (response.length === 0) {
      res.status(404).send();
      return;
    }
    res.status(200).send(response);
    return;
  } catch (err) {
    res.status(401).send();
    return;
  }
}