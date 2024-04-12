const path = require("path");
const outPutPath = path.join(process.cwd(),"resources");
const Connect = require('knex')({
  client: 'sqlite3', // or 'better-sqlite3'
  connection: {
    filename: path.join(outPutPath, 'db/baseInfo.db')
  }
});

export default Connect
