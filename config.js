module.exports = {
  url_postgresql:
    process.env.URL_POSTGRESQL ||
    "postgresql://postgres:Pepe0101m@localhost:5432/account",
  port: process.env.PORT || 8000,
};
