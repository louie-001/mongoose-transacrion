import { ClientSession } from "mongodb"
import { model, Model } from "mongoose"
import KittenSchema from "../schema/kitten.schema"
import { Category } from "./category.model"

export interface Kitten {
  _id?: string
  name: string
  category?: string
  colors?: []
  createdAt?: number
  updatedAt?: number
}

class KittenModel {
  private readonly MODEL: Model<Kitten>
  constructor() {
    this.MODEL = model("kitten", new KittenSchema())
  }

  find(filter: Kitten): Promise<Array<Kitten>> {
    return this.MODEL.find(filter).exec()
  }

  save(kitten: Kitten, session: ClientSession): Promise<Kitten> {
    const kittenModel = new this.MODEL(kitten)
    return kittenModel.save({ session })
      .then(() => {
        throw new Error("just for transaction test !!!")
      })
  }
}

export default KittenModel
