import express, { Router } from "express"
import CategoryService from "../service/category.service"
import KittenService from "../service/kitten.service"

class KittenRouter {
  private readonly categoryService: CategoryService
  private readonly kittenService: KittenService
  private readonly router: Router

  constructor() {
    this.categoryService = new CategoryService()
    this.kittenService = new KittenService()
    this.router = express.Router()
  }

  init() {
    this.router.use(express.json())

    this.router.post("", (req, res) => {
      const { category, kitten } = req.body
      this.categoryService
        .save(category, kitten)
        .then(result => {
          res.send(result)
        })
        .catch(error => {
          res.status(500).send(error)
        })
    })

    this.router.get("", (req, res) => {
      this.kittenService.list().then(kittens => {
        res.send(kittens)
      })
    })
  }

  get route(): Router {
    this.init()
    return this.router
  }
}

export default KittenRouter
