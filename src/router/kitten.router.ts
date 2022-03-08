import express, { Router } from "express"
import CategoryService from "../service/category.service"
import { constants } from "http2"

class KittenRouter {
  private readonly categoryService: CategoryService
  private readonly router: Router

  constructor() {
    this.categoryService = new CategoryService()
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
  }

  get route(): Router {
    this.init()
    return this.router
  }
}

export default KittenRouter
