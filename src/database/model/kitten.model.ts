import { ClientSession } from "mongodb"
import { model, Model } from "mongoose"
import KittenSchema from "../schema/kitten.schema"

export interface Kitten {
  _id?: string
  name?: string
  category?: string
  colors?: []
  createdAt?: number
  updatedAt?: number
}

const MODEL: Model<Kitten> = model("kitten", new KittenSchema())

class KittenModel {
  find(filter: Kitten = {}): Promise<Array<Kitten>> {
    return MODEL.find(filter).populate("category").exec()
  }

  save(kitten: Kitten, session: ClientSession): Promise<Kitten> {
    const kittenModel = new MODEL(kitten)
    return kittenModel.save({ session }).then(() => {
      throw new Error("just for transaction test !!!")
    })
  }
}

export default KittenModel
