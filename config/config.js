require("dotenv").config();
module.exports = {
  development: {
    username: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
    host: process.env.DBHOST,
    dialect: process.env.DBDIALECT,
    logging: false,
    define: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql"
  }
}
