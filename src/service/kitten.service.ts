import KittenModel from "../database/model/kitten.model"

class KittenService {
  private readonly kittenModel: KittenModel
  constructor() {
    this.kittenModel = new KittenModel()
  }

  list() {
    return this.kittenModel.find()
  }
}

export default KittenService
