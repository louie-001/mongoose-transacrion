import { Schema } from "mongoose"

class CategorySchema extends Schema {
  constructor() {
    super()
    return new Schema(
      {
        name: String
      },
      { timestamps: true }
    )
  }
}

export default CategorySchema
