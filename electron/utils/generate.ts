import fs from "node:fs";
import path from "node:path";
import sqlite3 from "sqlite3";
const outPutPath = path.join(process.cwd(),"resources");

export const generateCropInfoDB = () => {
  const db = new sqlite3.Database(path.join(outPutPath,"baseInfo.db"));

  db.serialize(() => {
    db.run("CREATE TABLE lorem (info TEXT)");

    const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    for (let i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
    }
    stmt.finalize();

    db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
      console.log(row.id + ": " + row.info);
    });
  });

  db.close();
}

