import CategoryModel, { Category } from "../database/model/category.model"
import KittenModel, { Kitten } from "../database/model/kitten.model"
import mongoose from "mongoose"
import { ClientSession } from "mongodb"

class CategoryService {
  private readonly categoryModel: CategoryModel
  private readonly kittenModel: KittenModel

  constructor() {
    this.categoryModel = new CategoryModel()
    this.kittenModel = new KittenModel()
  }

  save(category: Category, kitten: Kitten) {
    let kittenData: Kitten
    return mongoose.connection
      .transaction(session => {
        return this.doSave(session, category, kitten).then(result => {
          kittenData = result
        })
      })
      .then(() => {
        return kittenData
      })
      .catch(error => {
        console.log(error)
        return Promise.reject(error.message)
      })
  }

  doSave(session: ClientSession, category: Category, kitten: Kitten) {
    return this.categoryModel.save(category, session).then(res => {
      kitten.category = res._id
      return this.kittenModel.save(kitten, session)
    })
  }
}

export default CategoryService
