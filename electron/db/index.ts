// // // @ts-ignore
// // import { Knex } from "knex";
// // import path from "node:path";
// // const outPutPath = path.join(process.cwd(),"resources");
// //
// // const connect = Knex({
// //   client: 'sqlite3',
// //   filename: ':memory:',
// //   // connection: () => ({
// //   //   filename: path.join(outPutPath, 'db/baseInfo.db')
// //   // })
// // });
// //
// // export default connect;
// import axios   from "axios";
// import aaa from "./a.ts";
// const sqlite = require("sqlite3")
// console.log(aaa())

// console.log(knex)
// // import sqlite3 from "sqlite3/verbose";
// //
// // const sqlite3 = require('sqlite3').verbose();
// // const db = new sqlite3.Database(':memory:');
//
// // db.serialize(() => {
// //   db.run("CREATE TABLE lorem (info TEXT)");
// //
// //   const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
// //   for (let i = 0; i < 10; i++) {
// //     stmt.run("Ipsum " + i);
// //   }
// //   stmt.finalize();
// //
// //   db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
// //     console.log(row.id + ": " + row.info);
// //   });
// // });
// //
// // db.close();
const path = require("path");
const outPutPath = path.join(process.cwd(),"resources");
const Connect = require('knex')({
  client: 'sqlite3', // or 'better-sqlite3'
  connection: {
    filename: path.join(outPutPath, 'db/baseInfo.db')
  }
});

export default Connect
