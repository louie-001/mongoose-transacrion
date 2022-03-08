import { Schema, Types } from "mongoose"

class KittenSchema extends Schema {
  constructor() {
    super()
    return new Schema(
      {
        name: String,
        age: Number,
        colors: {
          type: [{ name: String }],
          default: []
        },
        category: {
          type: Types.ObjectId,
          ref: "category"
        }
      },
      { timestamps: true }
    )
  }
}

export default KittenSchema
