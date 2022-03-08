import express from "express"
import Database from "./database"
import * as http from "http"
import Config from "./config"
import KittenRouter from "./router/kitten.router"

const app = express()
app.use("/kittens", new KittenRouter().route)
app.use("", (req, res) => {
  res.send("hello world !")
})

const server = http.createServer(app)

server.on("close", () => {
  Database.close()
})

server.listen(Config.serviceConfig.port, () => {
  Database.connect()
  console.log("Http server listening on port: ", Config.serviceConfig.port)
})
