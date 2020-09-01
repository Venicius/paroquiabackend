module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./src/database/database.sqlite",
    },
    migrations: {
      directory: "./src/database/migrations",
    },
    useNullAsDefault: true,
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: "./src/database/test.sqlite",
    },
    migrations: {
      directory: "./src/database/migrations",
    },
    useNullAsDefault: true,
  },
  production: {
    client: "pg",
    connection: {
      host: "ec2-54-91-178-234.compute-1.amazonaws.com",
      user: "moqbbevbskvkfh",
      password:
        "0d41d1af53a681433144837379f693ea4cff6cedc5e52a39195d3ae60e050967",
      database: "d2ht1m9me48g81",
      uri:
        "postgres://moqbbevbskvkfh:0d41d1af53a681433144837379f693ea4cff6cedc5e52a39195d3ae60e050967@ec2-54-91-178-234.compute-1.amazonaws.com:5432/d2ht1m9me48g81",
    },
    migrations: {
      directory: "./src/database/migrations",
    },
    useNullAsDefault: true,
  },
};
