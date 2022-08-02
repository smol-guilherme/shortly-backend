import connection from "../database/postgresdb.js";
import tableSelect from "../handlers/tableHandler.js";

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
  }
}