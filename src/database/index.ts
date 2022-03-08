import mongoose, { ConnectOptions, Connection } from "mongoose"
import Config from "../config"

class Database {
  private static connection: Connection
  private constructor() {}

  private static doConnect() {
    const { host, port, collection } = Config.dbConfig
    const uri = `${host}:${port}/${collection}`

    const options: ConnectOptions = {
      retryWrites: false
    }
    mongoose.connect(uri, options)

    this.connection = mongoose.connection

    this.connection.on("connecting", () => {
      console.info("data base connecting ...")
    })

    this.connection.on("connected", () => {
      console.info("database connected !")
    })

    this.connection.on("close", () => {
      console.info("database connection closed !")
    })

    this.connection.on("error", error => {
      console.error("database connection error: ", error)
    })
  }

  static connect(): Connection {
    if (!this.connection) {
      this.doConnect()
    }
    return this.connection
  }

  static close(): void {
    if (this.connection) {
      this.connection.close()
    }
  }
}

export default Database
