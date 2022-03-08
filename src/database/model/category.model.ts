import { model, Model } from "mongoose"
import CategorySchema from "../schema/category.schema"
import { ClientSession } from "mongodb"

class CategoryModel {
  private readonly MODEL: Model<Category>

  constructor() {
    this.MODEL = model("category", new CategorySchema())
  }

  find(filter: Category): Promise<Array<Category>> {
    return this.MODEL.find(filter).exec()
  }

  save(category: Category, session: ClientSession): Promise<Category> {
    const categoryModel = new this.MODEL(category)
    return categoryModel.save({ session })
  }
}

export interface Category {
  _id?: string
  name: string
  createdAt?: number
  updatedAt?: number
}

export default CategoryModel
