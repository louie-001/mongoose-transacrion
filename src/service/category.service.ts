import CategoryModel, { Category } from "../database/model/category.model"
import KittenModel, { Kitten } from "../database/model/kitten.model"
import mongoose from "mongoose"

class CategoryService {
  private readonly categoryModel: CategoryModel
  private readonly kittenModel: KittenModel

  constructor() {
    this.categoryModel = new CategoryModel()
    this.kittenModel = new KittenModel()
  }

  save(category: Category, kitten: Kitten) {
    return mongoose.connection
      .transaction(async session => {
        await this.categoryModel.save(category, session)
        await this.kittenModel.save(kitten, session)
      })
      .catch(error => {
        console.log(error)
        return Promise.reject(error.message)
      })
  }
}

export default CategoryService
