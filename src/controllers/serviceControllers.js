import connection from "../database/postgresdb.js";
import { nanoid } from "nanoid";
import tableSelect from "../handlers/tableHandler.js";

export async function shortenUrl(req, res) {
  const shortenUrl = nanoid(12);
  const table = tableSelect(res.locals.reqPath);
  try {
    const queryString=`
      INSERT INTO ${table}
      (url, "shortUrl", "userId")
      SELECT
      $1, $2, $3
      WHERE
      NOT EXISTS (SELECT * FROM ${table} WHERE url=$1 AND "userId"=$3)
      RETURNING "shortUrl";
    `
    const queryData = res.locals.dbData.join().split(",").filter((i, id)=> id%2!==0);
    queryData.push(shortenUrl, res.locals.uid)
    const { rows: response } = await connection.query(queryString, queryData);
    if(response.length === 0) {
      res.status(409).send();
      return;
    }
    res.status(201).send(response[0]);
    return;
  } catch (err) {
    console.log(err);
    res.status(409).send();
    return;
  }
}

export async function getShortUrl(req, res) {
  try {
    const table = tableSelect(res.locals.reqPath);
    const queryData = res.locals.dbData.join().split(",").filter((i, id)=> id%2!==0);
    const queryString = `
      SELECT id, "shortUrl", "url"
      FROM ${table}
      WHERE id=$1
    `
    const { rows: response } = await connection.query(queryString, queryData);
    if(response.length === 0) {
      res.status(404).send();
      return;
    }
    res.status(200).send(response[0]);
    return;
  } catch (err) {
    res.status(409).send();
    return;
  }
}