import { model, Model } from "mongoose"
import CategorySchema from "../schema/category.schema"
import { ClientSession } from "mongodb"

const MODEL: Model<Category> = model("category", new CategorySchema())
class CategoryModel {
  find(filter: Category): Promise<Array<Category>> {
    return MODEL.find(filter).exec()
  }

  save(category: Category, session: ClientSession): Promise<Category> {
    const categoryModel = new MODEL(category)
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
