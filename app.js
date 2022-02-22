const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const ERROR_STATUS = {
  404: "404",
  500: "500",
};

const playersRouter = require("./routes/players");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false })); // apenas dados simples
app.use(bodyParser.json()); // json de entrada no body
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Header",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).send({});
  }
  next();
});

app.use("/", playersRouter);

app.use((req, res, next) => {
  const error = new Error("Não encontrado");
  error.status = ERROR_STATUS[404];
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || ERROR_STATUS[500]);
  return res.send({
    error: {
      message: error.message,
    },
  });
});
module.exports = app;
